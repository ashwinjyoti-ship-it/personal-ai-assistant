// Browser recipes: user-authored browser automations, written by the LLM from
// a plain-language request, stored per user, and executed deterministically by
// Playwright on Render (src/render/browserRecipe.ts via the BROWSER_RECIPE
// binding — this file must stay playwright-free for the Workers bundle).
//
// A recipe is a JSON list of steps in a deliberately small DSL. Constraining
// the vocabulary (instead of letting the model emit arbitrary code) is what
// makes self-authoring safe and debuggable: every failure names its step, and
// the model can revise the step list conversationally.

export type RecipeStep =
  | { action: 'goto'; url: string }
  | { action: 'click'; selector: string; optional?: boolean }
  | { action: 'fill'; selector: string; value: string }
  | { action: 'press'; key: string; selector?: string }
  | { action: 'wait'; ms?: number; selector?: string }
  | { action: 'extract_text'; selector: string; label?: string }
  | { action: 'extract_list'; selector: string; label?: string; limit?: number };

export const MAX_RECIPE_STEPS = 30;

const ACTIONS = new Set(['goto', 'click', 'fill', 'press', 'wait', 'extract_text', 'extract_list']);

/**
 * Validate an untrusted steps payload (LLM-authored). Returns the typed steps
 * or a human-readable error the model can act on.
 */
export function validateRecipeSteps(raw: unknown): { steps: RecipeStep[] } | { error: string } {
  if (!Array.isArray(raw)) return { error: 'steps must be a JSON array of step objects' };
  if (raw.length === 0) return { error: 'steps is empty' };
  if (raw.length > MAX_RECIPE_STEPS) return { error: `too many steps (${raw.length}; max ${MAX_RECIPE_STEPS})` };

  const steps: RecipeStep[] = [];
  for (let i = 0; i < raw.length; i++) {
    const s = raw[i] as Record<string, unknown>;
    const at = `step ${i + 1}`;
    if (!s || typeof s !== 'object' || typeof s.action !== 'string' || !ACTIONS.has(s.action)) {
      return { error: `${at}: unknown action "${String((s as any)?.action)}" (allowed: ${[...ACTIONS].join(', ')})` };
    }
    switch (s.action) {
      case 'goto': {
        try {
          const u = new URL(String(s.url || ''));
          if (!/^https?:$/.test(u.protocol)) throw new Error('not http(s)');
        } catch {
          return { error: `${at}: goto needs a full http(s) url` };
        }
        break;
      }
      case 'click':
      case 'extract_text':
      case 'extract_list':
        if (typeof s.selector !== 'string' || !s.selector.trim()) {
          return { error: `${at}: ${s.action} needs a non-empty selector` };
        }
        break;
      case 'fill':
        if (typeof s.selector !== 'string' || !s.selector.trim()) return { error: `${at}: fill needs a selector` };
        if (typeof s.value !== 'string') return { error: `${at}: fill needs a string value` };
        break;
      case 'press':
        if (typeof s.key !== 'string' || !s.key.trim()) return { error: `${at}: press needs a key (e.g. "Enter")` };
        break;
      case 'wait':
        if (s.ms !== undefined && (typeof s.ms !== 'number' || s.ms < 0 || s.ms > 15000)) {
          return { error: `${at}: wait ms must be 0-15000` };
        }
        if (s.ms === undefined && (typeof s.selector !== 'string' || !s.selector.trim())) {
          return { error: `${at}: wait needs ms or a selector to wait for` };
        }
        break;
    }
    steps.push(s as unknown as RecipeStep);
  }
  if (steps[0].action !== 'goto') return { error: 'the first step must be a goto (a recipe starts from a blank page)' };
  if (!steps.some((s) => s.action === 'extract_text' || s.action === 'extract_list')) {
    return { error: 'add at least one extract_text/extract_list step — a recipe with no extraction returns nothing' };
  }
  return { steps };
}

// Same on-demand-creation rule as page_watches: production D1 gets no
// migrations from the deploy pipeline. Migration 0059 mirrors this for local dev.
export const BROWSER_RECIPES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS browser_recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  steps_json TEXT NOT NULL,
  site_name TEXT,
  last_run_at DATETIME,
  last_status TEXT,
  last_error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, name)
)`;

export async function ensureBrowserRecipesTable(db: D1Database): Promise<void> {
  await db.prepare(BROWSER_RECIPES_TABLE_SQL).run();
}
