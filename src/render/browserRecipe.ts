// Render-only: execute a validated browser recipe (services/browserRecipes.ts
// DSL) with Playwright. Same import rule as the other src/render modules.
//
// Design mirrors what made the Outlook flow debuggable: every failure names
// the step it died on and carries the page URL, visible text, and a debug
// screenshot — so the LLM (or the user) can revise the recipe's steps
// conversationally instead of guessing.

import type { Page } from 'playwright';
import type { RecipeStep } from '../services/browserRecipes';
import { debugScreenshotKey, openScriptedPage, saveDebugScreenshot } from './playwrightCore';

const STEP_TIMEOUT_MS = 10000;
const TOTAL_BUDGET_MS = 120000;
const MAX_LIST_ITEMS = 50;
const MAX_OUTPUT_CHARS = 4000;

export interface RecipeRunInput {
  steps: RecipeStep[];
  /** Vault credentials substituted into fill values via {username}/{password}. */
  secrets?: { username: string; password: string };
  /** User id — only used to key the debug screenshot on failure. */
  userId?: number;
}

export interface RecipeRunResult {
  status: 'completed' | 'failed';
  /** label → extracted text (extract_text) or items (extract_list). */
  outputs?: Record<string, string | string[]>;
  /** Human-readable trace of executed steps, for failure diagnosis. */
  trace?: string[];
  error?: string;
}

function substitute(value: string, secrets?: { username: string; password: string }): string {
  if (!secrets) return value;
  return value.replace(/\{username\}/g, secrets.username).replace(/\{password\}/g, secrets.password);
}

// Trace lines must never echo a substituted credential.
function describeStep(step: RecipeStep): string {
  switch (step.action) {
    case 'goto': return `goto ${step.url}`;
    case 'click': return `click ${step.selector}${step.optional ? ' (optional)' : ''}`;
    case 'fill': return `fill ${step.selector}`;
    case 'press': return `press ${step.key}${step.selector ? ` on ${step.selector}` : ''}`;
    case 'wait': return step.ms !== undefined ? `wait ${step.ms}ms` : `wait for ${step.selector}`;
    case 'extract_text': return `extract_text ${step.selector}`;
    case 'extract_list': return `extract_list ${step.selector}`;
  }
}

async function runStep(
  page: Page,
  step: RecipeStep,
  outputs: Record<string, string | string[]>,
  secrets?: { username: string; password: string },
): Promise<void> {
  switch (step.action) {
    case 'goto':
      await page.goto(step.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      return;
    case 'click': {
      const target = page.locator(step.selector).first();
      if (step.optional) {
        await target.click({ timeout: 3000 }).catch(() => {});
      } else {
        await target.click({ timeout: STEP_TIMEOUT_MS });
      }
      return;
    }
    case 'fill':
      await page.locator(step.selector).first().fill(substitute(step.value, secrets), { timeout: STEP_TIMEOUT_MS });
      return;
    case 'press':
      if (step.selector) await page.locator(step.selector).first().press(step.key, { timeout: STEP_TIMEOUT_MS });
      else await page.keyboard.press(step.key);
      return;
    case 'wait':
      if (step.ms !== undefined) await page.waitForTimeout(step.ms);
      else await page.locator(step.selector!).first().waitFor({ state: 'visible', timeout: STEP_TIMEOUT_MS });
      return;
    case 'extract_text': {
      const text = (await page.locator(step.selector).first().innerText({ timeout: STEP_TIMEOUT_MS }))
        .replace(/\s+/g, ' ').trim().slice(0, MAX_OUTPUT_CHARS);
      outputs[step.label || step.selector] = text;
      return;
    }
    case 'extract_list': {
      const items = page.locator(step.selector);
      const count = Math.min(await items.count(), Math.min(step.limit ?? MAX_LIST_ITEMS, MAX_LIST_ITEMS));
      const collected: string[] = [];
      for (let i = 0; i < count; i++) {
        const text = (await items.nth(i).innerText({ timeout: 3000 }).catch(() => ''))
          .replace(/\s+/g, ' ').trim();
        if (text) collected.push(text.slice(0, 500));
      }
      outputs[step.label || step.selector] = collected;
      return;
    }
  }
}

export async function runBrowserRecipe(input: RecipeRunInput): Promise<RecipeRunResult> {
  let scripted;
  try {
    scripted = await openScriptedPage();
  } catch (err) {
    return { status: 'failed', error: `Browser launch failed: ${err instanceof Error ? err.message : String(err)}` };
  }
  const { page } = scripted;
  const outputs: Record<string, string | string[]> = {};
  const trace: string[] = [];
  const deadline = Date.now() + TOTAL_BUDGET_MS;

  try {
    for (let i = 0; i < input.steps.length; i++) {
      const step = input.steps[i];
      if (Date.now() > deadline) {
        throw new Error(`recipe exceeded its ${TOTAL_BUDGET_MS / 1000}s budget before step ${i + 1}`);
      }
      trace.push(`${i + 1}. ${describeStep(step)}`);
      try {
        await runStep(page, step, outputs, input.secrets);
      } catch (err) {
        const detail = err instanceof Error ? err.message.split('\n')[0] : String(err);
        const visible = (await page.locator('body').innerText().catch(() => ''))
          .replace(/\s+/g, ' ').trim().slice(0, 300);
        let where = ` | URL: ${page.url()} | visible: "${visible}"`;
        if (input.userId !== undefined) {
          const key = debugScreenshotKey('recipe', input.userId);
          if (await saveDebugScreenshot(page, key)) {
            where += ' | screenshot: GET /api/system/debug/browser-screenshot?provider=recipe';
          }
        }
        return {
          status: 'failed',
          trace,
          outputs,
          error: `Failed at step ${i + 1} (${describeStep(step)}): ${detail}${where}`,
        };
      }
    }
    return { status: 'completed', outputs, trace };
  } finally {
    await scripted.close().catch(() => {});
  }
}
