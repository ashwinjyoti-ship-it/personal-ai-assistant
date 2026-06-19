# Ruby AI — Warm Clay Design System

> **Codename:** Warm Clay · **Language:** Claymorphism + Soft Bento  
> **Mood:** Calm, zen, elegant — like sculpted pottery on a linen surface  
> **Target:** 390 × 844 pt (iPhone 14 Pro logical resolution)

---

## 1. Design Philosophy

The Warm Clay theme merges **claymorphism** (soft, extruded 3D surfaces with inset highlights) and **Soft Bento** (rounded card grids with generous whitespace). Every surface looks like fired terracotta or moulded clay sitting on a linen backdrop. The palette is entirely warm-neutral — no pure whites, no pure blacks, no blues. The visual hierarchy is created through shadow depth rather than stark color contrasts.

Key principles:
- **Tactile depth** — surfaces feel raised or pressed via multi-layer box-shadows; no flat design or hard borders.
- **Warm neutrals only** — the entire palette lives in the brown/tan/terracotta family.
- **Generous breathing room** — large paddings, spacious gaps, centered content.
- **Rounded everything** — full-round pills, large radius cards, squircle icons.
- **Subtle animation** — slow, organic pulses rather than snappy micro-interactions.

---

## 2. Color Palette

### 2.1 Backgrounds & Surfaces

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `linen-bg` | `#F3EBE2` | 243, 235, 226 | **Page background** — the base linen canvas. Used on body, gradient fades, pressed icon well bg |
| `clay-surface` | `#E4D8CB` | 228, 216, 203 | **Primary clay surface** — cards, input pills, tab bar, search bar, icon well bg, header buttons |
| `clay-deeper` | `#D8C9B9` | 216, 201, 185 | **User message bubble** bg, attach button bg — slightly darker clay |
| `clay-divider` | `#d2c4b4` | 210, 196, 180 | **Hairline divider** inside card groups (chat log rows) |

### 2.2 Accent & Brand

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `terracotta` | `#C97A52` | 201, 122, 82 | **Primary accent** — send button, "New" pill, bot avatar, active tab icon, notification dot, section headers, list row badge text, numbered list markers, pulse ring border, icon tint on pressed wells |
| `green-online` | `#5E8A5A` | 94, 138, 90 | **Online status dot** (conversation header only) |

### 2.3 Text Colors

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `text-primary` | `#2A2521` | 42, 37, 33 | **Primary text** — headings, body copy on light surfaces, header titles, row titles |
| `text-body-warm` | `#4A3D30` | 74, 61, 48 | **Body text inside conversation bubbles** — user message text, assistant list-item text, follow-up question text |
| `text-secondary` | `#8C8175` | 140, 129, 117 | **Secondary/muted text** — date labels, subtitles, placeholders, timestamps, chevrons (functional), "Ruby is listening", typing dots |
| `text-chevron` | `#b0a597` | 176, 165, 151 | **Tertiary** — chevron-right arrows in list rows |
| `white` | `#FFFFFF` | 255, 255, 255 | **On-accent text** — text/icons on terracotta surfaces, send button icon |

### 2.4 Shadow Colors (used in box-shadow only)

| Color | Usage |
|---|---|
| `rgba(74, 58, 44, 0.40)` | Primary outer drop shadow (`.clay`) |
| `rgba(74, 58, 44, 0.34)` | Lighter outer drop shadow (`.clay-sm`) |
| `rgba(74, 58, 44, 0.42)` | User message outer drop shadow (`.clay-user`) |
| `rgba(20, 15, 10, 0.55)` | Dark anchor drop shadow (`.clay-anchor`) — darkest, for bottom bars |
| `rgba(201, 122, 82, 0.55)` | Terracotta outer glow (`.clay-accent`) |
| `rgba(255, 255, 255, 0.65)` | Top-edge inset highlight (`.clay`) |
| `rgba(255, 255, 255, 0.60)` | Top-edge inset highlight (`.clay-sm`) |
| `rgba(255, 255, 255, 0.55)` | Bottom inset light (`.clay-press`) |
| `rgba(255, 255, 255, 0.45)` | Top-edge inset highlight (`.clay-accent`, `.clay-user`) |
| `rgba(255, 255, 255, 0.10)` | Top-edge inset highlight (`.clay-anchor`) — very faint |
| `rgba(120, 98, 74, 0.18)` | Bottom inner shadow (`.clay`) |
| `rgba(120, 98, 74, 0.16)` | Bottom inner shadow (`.clay-sm`) |
| `rgba(120, 98, 74, 0.22)` | Bottom inner shadow (`.clay-user`) |
| `rgba(120, 98, 74, 0.30)` | Top inset shadow (`.clay-press`) |
| `rgba(150, 80, 48, 0.40)` | Bottom inner shadow (`.clay-accent`) — terracotta tinted |
| `rgba(0, 0, 0, 0.35)` | Bottom inner shadow (`.clay-anchor`) — deepest |

### 2.5 Gradient

| Context | Value |
|---|---|
| Bottom fade (input area) | `background: linear-gradient(to top, #F3EBE2, #F3EBE2, transparent)` — via Tailwind `bg-gradient-to-t from-[#F3EBE2] via-[#F3EBE2] to-transparent` |
| Sticky header blur | `bg-[#F3EBE2]/95` + `backdrop-blur` (8px) — conversation screen only |

### 2.6 Border / Divider

| Context | Value |
|---|---|
| Hairline divider (chat log) | `1px solid #d2c4b4` (via `h-px bg-[#d2c4b4]` div) |
| Settings hairline | `border-top: 1px solid rgba(120, 98, 74, 0.16)` (`.hair` class) |
| Assistant response left border | `2px solid #E4D8CB` (border-l-2 border-[#E4D8CB]) |

---

## 3. Typography

### 3.1 Font Stack

```
Primary:  'Geist', 'Inter', system-ui, sans-serif
Monospace: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
```

`-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` applied globally.

### 3.2 Type Scale

| Role | Size | Weight | Line-Height | Letter-Spacing | Color | Usage |
|---|---|---|---|---|---|---|
| **Page title (large)** | 34px | 600 (semibold) | 1.12 | — | `#2A2521` | Home greeting "Good morning, Ashwin" |
| **Screen title** | 26px | 600 (semibold) | inherit | — | `#2A2521` | "Chat Log", "Settings" |
| **Body / row title** | 15px | 600 (semibold) | inherit | — | `#2A2521` | Conversation row title, settings row label, assistant sub-heading, message text |
| **Body text** | 15px | 400 (normal) | 1.625 (relaxed) | — | `#2A2521` or `#4A3D30` | User message text, assistant body paragraphs |
| **Base** | 16px (1rem) | 400 | 1.5 | — | — | Icon size reference (`text-base` = Font Awesome icons) |
| **Secondary body** | 14px | 400 | 1.625 (relaxed) | — | `#4A3D30` | Assistant list-item text, follow-up prompt |
| **Small / subtitle** | 14px (0.875rem) | 400 | 1.25 | — | `#8C8175` | Settings subtitle, "New" button text, search input text |
| **Row preview** | 13px | 400 | inherit | — | `#8C8175` | Chat log row preview text |
| **Section header** | 11px | 600 (semibold) | inherit | 0.18em | `#8C8175` | "TODAY", "YESTERDAY", "OLDER" — uppercase |
| **Settings section header** | 12px (0.75rem) | 600 (semibold) | 1.0 | 0.14em | `#C97A52` | "INTEGRATIONS", "AUTOMATIONS", "SYSTEM" — uppercase |
| **Timestamp (row)** | 11px | 400 | inherit | — | `#8C8175` | "9:41 AM", "8:12 AM", "Oct 24" |
| **Badge** | 11px | 500 (medium) | inherit | — | `#C97A52` | "8 messages", "2 messages" |
| **Tab label** | 11px | 400 / 500 | inherit | — | `#8C8175` / `#C97A52` | Tab bar labels |
| **Timestamp divider** | 11px | 400 | inherit | 0.025em (tracking-wide) | `#8C8175` | "Today · 10:18 AM" centered in conversation |
| **Caption (xs)** | 12px (0.75rem) | 400 | 1.0 | — | `#8C8175` | "iOS, India-accessible" subtitle in conversation |
| **Date label** | 14px (0.875rem) | 400 | 1.25 | 0.025em (tracking-wide) | `#8C8175` | "Friday, June 19" on home screen |
| **Numbered marker** | 14px (0.875rem) | 600 (semibold) | — | — | `#C97A52` | "1.", "2." in assistant response |
| **Online status** | 12px (0.75rem) | 400 | 1.0 | — | `#8C8175` | "Online" next to green dot |

---

## 4. Spacing System

The design follows a **4px base unit** system (Tailwind defaults). Key recurring spacings:

### 4.1 Page-Level

| Token | Value | Usage |
|---|---|---|
| `page-px` | 24px (`px-6`) | Horizontal page padding (home, chat log, settings) |
| `page-px-conv` | 20px (`px-5`) | Horizontal page padding (conversation screen) |
| `header-pt` | 28px (`pt-7`) | Top padding for header |
| `header-pb` | 8px (`pb-2`) | Bottom padding for header |
| `main-pt` | 20px (`pt-5`) | Top padding for main content area |
| `bottom-pb` | 40px (`pb-10`) | Bottom padding for floating input (home) |
| `bottom-pb-conv` | 32px (`pb-8`) | Bottom padding for floating input (conversation) |
| `tab-bar-pb` | 28px (`pb-7`) | Bottom padding for tab bar |
| `scroll-bottom` | 144px (`pb-36`) | Bottom padding on scrollable content to clear floating elements |

### 4.2 Component Internal

| Token | Value | Usage |
|---|---|---|
| `card-padding` | 10px (`p-2.5`) | Internal padding of clay card groups |
| `row-px` | 12px (`px-3`) | Horizontal padding inside list rows |
| `row-py` | 14px (`py-3.5`) | Vertical padding inside list rows |
| `settings-row-px` | 16px (`px-4`) | Horizontal padding inside settings rows |
| `settings-row-py` | 16px (`py-4`) | Vertical padding inside settings rows |
| `input-pill-pl` | 24px (`pl-6`) | Left padding in input pill (home) |
| `input-pill-pr` | 10px (`pr-2.5`) | Right padding in input pill |
| `input-pill-py` | 10px (`py-2.5`) | Vertical padding in input pill |
| `msg-bubble-px` | 20px (`px-5`) | Horizontal padding in user message bubble |
| `msg-bubble-py` | 16px (`py-4`) | Vertical padding in user message bubble |
| `assistant-pl` | 16px (`pl-4`) | Left padding for assistant content (next to border) |

### 4.3 Gaps

| Token | Value | Usage |
|---|---|---|
| `gap-icon-text` | 16px (`gap-4`) | Between icon well and text in list rows |
| `gap-header-items` | 16px (`gap-4`) | Between back button and title in headers |
| `gap-header-actions` | 12px (`gap-3`) | Between header action buttons (home) |
| `gap-input-items` | 12px (`gap-3`) | Between elements inside input pill |
| `gap-section` | 28px (`gap-7`) | Between settings sections / conversation messages (`space-y-7`) |
| `gap-bullet-text` | 10px (`gap-2.5`) | Between bullet dot and text in assistant list |
| `gap-typing-dots` | 6px (`gap-1.5`) | Between typing indicator dots |
| `section-top` | 32px (`mt-8`) | Top margin before section header in chat log |
| `section-label-mb` | 12px (`mb-3`) | Bottom margin after section header label |

---

## 5. Border Radius

| Component | Radius | CSS |
|---|---|---|
| **Icon button (circular)** | 9999px | `rounded-full` |
| **Input pill** | 9999px | `rounded-full` |
| **Tab bar** | 9999px | `rounded-full` |
| **Send button** | 9999px | `rounded-full` |
| **Typing indicator pill** | 9999px | `rounded-full` |
| **Card group (chat log)** | 24px | `rounded-[24px]` |
| **Settings card group** | 26px | `rounded-[26px]` |
| **User message bubble** | 22px (default), 8px top-right | `rounded-[22px] rounded-tr-[8px]` |
| **Inner list row** | 18px | `rounded-[18px]` |
| **Bot avatar (home hero)** | 36px (squircle) | `rounded-[36px]` |
| **Bot avatar (conversation header)** | 14px (squircle) | `rounded-[14px]` |
| **Bot avatar (inline)** | 12px (squircle) | `rounded-[12px]` |
| **Notification dot** | 9999px | `rounded-full` |
| **Bullet dot** | 9999px | `rounded-full` |

---

## 6. Claymorphism Recipe

The core visual effect is achieved through **multi-layer box-shadows**. Each surface has three shadow layers:

### 6.1 Shadow Classes

#### `.clay` — Standard Raised Surface
The primary card/input container shadow. Used on card groups, input pills, tab bar.

```css
box-shadow:
  0 18px 36px -14px rgba(74, 58, 44, 0.40),       /* Layer 1: Outer drop shadow — warm brown, large spread */
  inset 0 2px 3px rgba(255, 255, 255, 0.65),       /* Layer 2: Top-edge inset highlight — white, simulates top light catch */
  inset 0 -6px 12px rgba(120, 98, 74, 0.18);       /* Layer 3: Bottom inner shadow — recessed depth at base */
```

#### `.clay-sm` — Small Raised Surface
Lighter version for header icon buttons, typing indicator pill, assistant inline icon badges.

```css
box-shadow:
  0 10px 22px -10px rgba(74, 58, 44, 0.34),        /* Layer 1: Smaller, tighter outer shadow */
  inset 0 2px 2px rgba(255, 255, 255, 0.60),        /* Layer 2: Subtle top highlight */
  inset 0 -4px 8px rgba(120, 98, 74, 0.16);         /* Layer 3: Shallower inner bottom shadow */
```

#### `.clay-accent` — Terracotta Accent Surface
For terracotta-colored elements: send button, bot avatar, "New" button, active tab icon.

```css
box-shadow:
  0 12px 22px -8px rgba(201, 122, 82, 0.55),       /* Layer 1: Terracotta-tinted outer glow */
  inset 0 2px 3px rgba(255, 255, 255, 0.45),        /* Layer 2: Top highlight (slightly muted on colored surface) */
  inset 0 -5px 10px rgba(150, 80, 48, 0.40);        /* Layer 3: Deep terracotta inner shadow at bottom */
```

#### `.clay-press` — Pressed/Inset Well
For icon wells inside list rows (circular inset icons), search bar. The surface appears *pushed in*.

```css
box-shadow:
  inset 0 4px 9px rgba(120, 98, 74, 0.30),          /* Layer 1: Top inset shadow — creates "pressed down" feel */
  inset 0 -2px 3px rgba(255, 255, 255, 0.55);       /* Layer 2: Bottom highlight — light catching the lip */
```
**Note:** No outer drop shadow — inset only. This is the inverse of `.clay`.

#### `.clay-user` — User Message Bubble
Specific shadow for the user's chat message bubble.

```css
box-shadow:
  0 14px 28px -12px rgba(74, 58, 44, 0.42),         /* Layer 1: Moderate outer drop shadow */
  inset 0 2px 3px rgba(255, 255, 255, 0.45),         /* Layer 2: Top highlight */
  inset 0 -5px 10px rgba(120, 98, 74, 0.22);         /* Layer 3: Inner bottom shadow */
```

#### `.clay-anchor` — Heavy Anchor Surface
For maximum depth anchoring (e.g., bottom-pinned bars). Not actively used in the final screens but defined.

```css
box-shadow:
  0 22px 44px -16px rgba(20, 15, 10, 0.55),         /* Layer 1: Very dark, heavy outer shadow */
  inset 0 2px 3px rgba(255, 255, 255, 0.10),         /* Layer 2: Very faint top highlight */
  inset 0 -8px 16px rgba(0, 0, 0, 0.35);             /* Layer 3: Deep black inner shadow */
```

### 6.2 Shadow Depth Hierarchy (lightest → heaviest)

1. `.clay-press` — inset only (pressed wells)
2. `.clay-sm` — light raise (icon buttons, small elements)
3. `.clay-accent` — medium raise + color glow (accent buttons)
4. `.clay-user` — medium raise (user bubbles)
5. `.clay` — standard raise (cards, input pills, tab bar)
6. `.clay-anchor` — heavy raise (anchored bars)

---

## 7. Component Library

### 7.1 Clay Card (Raised Surface Group)

A container that holds multiple list rows.

| Property | Value |
|---|---|
| Background | `#E4D8CB` |
| Shadow | `.clay` |
| Border Radius | 24px (chat log), 26px (settings) |
| Padding | 10px (`p-2.5`) for chat log; 0 with `overflow-hidden` for settings |
| Internal divider | `h-px bg-[#d2c4b4]` with `mx-3` (chat log); `border-top: 1px solid rgba(120,98,74,.16)` with `mx-4` (settings) |

### 7.2 Pressed Icon Well (Circular Inset)

Small circular icon container that appears pushed into the surface.

| Property | Chat Log Variant | Settings Variant |
|---|---|---|
| Size | 48×48px (`w-12 h-12`) | 44×44px (`w-11 h-11`) |
| Shape | `rounded-full` | `rounded-full` |
| Background | `#F3EBE2` (linen) | `#F3EBE2` (linen) |
| Shadow | `.clay-press` | `.clay-press` |
| Icon color | `#C97A52` (terracotta) | `#C97A52` (terracotta) |
| Icon size | `text-base` (16px) | `text-base` (16px) |

### 7.3 Floating Input Pill (Bottom-Anchored)

The message input bar fixed at the bottom of the screen.

| Property | Home Variant | Conversation Variant |
|---|---|---|
| Position | Fixed bottom, centered | Fixed bottom, centered |
| Container width | 390px | 390px |
| Outer padding | `px-6 pb-10 pt-4` | `px-5 pb-8 pt-5` |
| Background fade | `bg-gradient-to-t from-[#F3EBE2] via-[#F3EBE2] to-transparent` | Same |
| Pill background | `#E4D8CB` | `#E4D8CB` |
| Pill shadow | `.clay` | `.clay` |
| Pill radius | `rounded-full` | `rounded-full` |
| Pill padding | `pl-6 pr-2.5 py-2.5` | `pl-3 pr-2.5 py-2.5` |
| Left element | Comment-dots icon (`#8C8175`) | Attach button (clay-sm, 40×40, `#D8C9B9` bg) |
| Input text | 15px, `#2A2521`, placeholder `#8C8175` | Same |
| Placeholder | "Message Ruby…" | "Message Ruby…" |
| Send button | 48×48 rounded-full, `#C97A52`, `.clay-accent`, paper-plane icon white | Same |
| Gap | 12px (`gap-3`) | 12px (`gap-3`) |

### 7.4 Header Icon Button

Circular raised button used in headers.

| Property | Standard (Home/Chat Log) | Conversation Variant |
|---|---|---|
| Size | 48×48px (`w-12 h-12`) | 44×44px (`w-11 h-11`) |
| Shape | `rounded-full` | `rounded-full` |
| Background | `#E4D8CB` | `#E4D8CB` |
| Shadow | `.clay-sm` | `.clay-sm` |
| Icon color | `#2A2521` (default) | `#2A2521` |
| Icon size | `text-base` (16px) | `text-base` (16px) |
| Active state | `translate-y: 1px` | `translate-y: 1px` |
| Transition | 150ms ease-in-out | 150ms ease-in-out |

### 7.5 Tab Bar

Shared bottom navigation (visible on Chat Log screen).

| Property | Value |
|---|---|
| Position | Fixed bottom, centered |
| Container padding | `px-6 pb-7 pt-3` |
| Bar background | `#E4D8CB` |
| Bar shadow | `.clay` |
| Bar radius | `rounded-full` |
| Bar padding | `py-3` |
| Layout | `flex items-center justify-around` |
| Tab width | 64px (`w-16`) |
| **Inactive tab** | Icon: `text-lg` (18px), color `#8C8175`; Label: 11px, color `#8C8175` |
| **Active tab (Skills)** | Elevated icon: `.clay-accent`, 48×48 rounded-full, `#C97A52` bg, bolt icon white, `margin-top: -28px` (floats above bar); Label: 11px, `#C97A52`, font-weight 500 |
| Tab items | Home (fa-house), Skills (fa-bolt, elevated), Settings (fa-gear) |
| Tab gap | 4px (`gap-1`) between icon and label |

### 7.6 List Row (Icon + Label + Chevron)

Used inside Clay Card groups on Chat Log and Settings screens.

#### Chat Log Row

| Property | Value |
|---|---|
| Layout | `flex items-center gap-4` |
| Padding | `px-3 py-3.5` (12px horizontal, 14px vertical) |
| Border radius | 18px `rounded-[18px]` |
| Active state | `bg-[#F3EBE2]/50` (50% opacity linen) |
| Left icon | Pressed Icon Well (48×48, `.clay-press`) |
| Title | 15px, semibold, `#2A2521`, truncated |
| Timestamp | 11px, `#8C8175`, right-aligned, `shrink-0` |
| Preview | 13px, `#8C8175`, truncated, block |
| Badge | 11px, medium weight, `#C97A52`, inline-block, `mt-1` |
| Chevron | `fa-chevron-right`, 12px (`text-xs`), `#b0a597` |

#### Settings Row

| Property | Value |
|---|---|
| Layout | `flex items-center gap-4` |
| Padding | `px-4 py-4` (16px all) |
| Active state | `translate-y: 1px` |
| Left icon | Pressed Icon Well (44×44, `.clay-press`) |
| Label | 15px, semibold, `#2A2521`, `flex-1 text-left` |
| Chevron | `fa-chevron-right`, 12px (`text-xs`), `#8C8175` |
| External link indicator | `fa-arrow-up-right-from-square`, 10px, `#8C8175`, inline next to label |

### 7.7 Section Header (Uppercase Label)

| Variant | Size | Weight | Tracking | Color | Padding | Transform |
|---|---|---|---|---|---|---|
| Chat Log | 11px | 600 (semibold) | 0.18em | `#8C8175` | `px-1 mt-8 mb-3` | uppercase |
| Settings | 12px (xs) | 600 (semibold) | 0.14em | `#C97A52` | `px-1 pb-2` | uppercase |

### 7.8 User Message Card (Conversation)

| Property | Value |
|---|---|
| Alignment | `flex justify-end` |
| Max width | 85% of container (`max-w-[85%]`) |
| Background | `#D8C9B9` |
| Shadow | `.clay-user` |
| Border radius | 22px all corners, **8px top-right** (`rounded-[22px] rounded-tr-[8px]`) |
| Padding | `px-5 py-4` (20px horizontal, 16px vertical) |
| Text | 15px, `line-height: 1.625`, `#4A3D30` |

### 7.9 Assistant Response Block (Conversation)

| Property | Value |
|---|---|
| Layout | `flex gap-3` (avatar + content side by side) |
| **Avatar** | 36×36px (`w-9 h-9`), `rounded-[12px]`, `#C97A52` bg, `.clay-accent`, robot icon white `text-sm`, `mt-0.5` |
| **Content area** | `flex-1`, `border-l-2 border-[#E4D8CB]`, `pl-4` |
| Body text | 15px, `line-height: 1.625`, `#2A2521` |
| Sub-heading row | `flex items-center gap-2.5`: 32×32 icon badge (`.clay-sm`, `#E4D8CB` bg, `#C97A52` icon) + 15px semibold `#2A2521` |
| Subtitle | 12px, `#8C8175`, `mt-1.5` |
| Numbered item title | `flex items-baseline gap-2`: number in 14px semibold `#C97A52` + title in 15px semibold `#2A2521` |
| Bullet list | `space-y-2`, each: `flex gap-2.5`, bullet dot (6×6px, `#C97A52`, `mt-2`) + text 14px `line-height: 1.625` `#4A3D30` |
| Section spacing | `mt-4` between numbered items, `mt-5` between major blocks |

### 7.10 Button Styles

#### Back Arrow Button
| Property | Value |
|---|---|
| Size | 48×48 (settings) or 44×44 (conversation) |
| Shape | `rounded-full` |
| Background | `#E4D8CB` |
| Shadow | `.clay-sm` |
| Icon | `fa-arrow-left`, `text-base`, `#2A2521` |
| Active | `translate-y: 1px` |

#### Send Button
| Property | Value |
|---|---|
| Size | 48×48px |
| Shape | `rounded-full` |
| Background | `#C97A52` |
| Shadow | `.clay-accent` |
| Icon | `fa-paper-plane`, `text-base`, white |
| Active | `translate-y: 1px` |

#### "New" Pill Button (Chat Log)
| Property | Value |
|---|---|
| Shape | `rounded-full` |
| Background | `#C97A52` |
| Shadow | `.clay-accent` |
| Padding | `pl-4 pr-5 py-3` |
| Icon | `fa-plus`, `text-xs`, white |
| Text | 14px (sm), semibold, white |
| Active | `translate-y: 1px` |

#### Attach Button (Conversation)
| Property | Value |
|---|---|
| Size | 40×40px (`w-10 h-10`) |
| Shape | `rounded-full` |
| Background | `#D8C9B9` |
| Shadow | `.clay-sm` |
| Icon | `fa-paperclip`, `text-sm` (14px), `#8C8175` |
| Active | `translate-y: 1px` |

#### More Button (Conversation Header)
| Property | Value |
|---|---|
| Size | 44×44px |
| Shape | `rounded-full` |
| Background | `#E4D8CB` |
| Shadow | `.clay-sm` |
| Icon | `fa-ellipsis-vertical`, `text-base`, `#2A2521` |

### 7.11 Typing Indicator

| Property | Value |
|---|---|
| Layout | `flex gap-3 items-center` |
| Avatar | Same as assistant avatar (36×36, `.clay-accent`, squircle 12px) |
| Pill | `.clay-sm`, `rounded-full`, `#E4D8CB` bg, `px-4 py-3` |
| Dots | 3× `w-2 h-2` (8px) circles, `#8C8175`, `rounded-full` |
| Dot gap | 6px (`gap-1.5`) |
| Animation | `pulseDot` — see §8 |
| Dot delays | 0s, 0.3s, 0.6s |

### 7.12 Bot Avatar Variants

| Context | Size | Radius | Background | Shadow | Icon | Icon Size |
|---|---|---|---|---|---|---|
| Home hero | 112×112 (`w-28 h-28`) | 36px | `#C97A52` | `.clay-accent` | fa-robot | `text-4xl` (36px) |
| Conversation header | 40×40 (`w-10 h-10`) | 14px | `#C97A52` | `.clay-accent` | fa-robot | `text-base` (16px) |
| Inline (assistant msg) | 36×36 (`w-9 h-9`) | 12px | `#C97A52` | `.clay-accent` | fa-robot | `text-sm` (14px) |

### 7.13 Notification Badge Dot

| Property | Value |
|---|---|
| Size | 8×8px (`w-2 h-2`) |
| Shape | `rounded-full` |
| Color | `#C97A52` |
| Position | `absolute top-2.5 right-3` (inside bell button) |

---

## 8. Animation & Motion Specs

### 8.1 Pulse Dot (Listening / Typing)

```css
@keyframes pulseDot {
  0%, 100% { opacity: 0.35; transform: scale(0.8); }   /* Home variant */
  50%      { opacity: 1;    transform: scale(1); }
}
/* Conversation variant uses slightly different values: */
@keyframes pulseDot {
  0%, 100% { opacity: 0.4;  transform: scale(0.85); }
  50%      { opacity: 1;    transform: scale(1); }
}
```

| Property | Home ("listening") | Conversation (typing dots) |
|---|---|---|
| Duration | 1.6s | 1.8s |
| Easing | ease-in-out | ease-in-out |
| Iteration | infinite | infinite |
| Dot size | 10px (`w-2.5 h-2.5`) | 8px (`w-2 h-2`) |
| Dot color | `#C97A52` | `#8C8175` |
| Stagger delays | N/A (single dot) | 0s, 0.3s, 0.6s |

### 8.2 Pulse Ring (Heartbeat)

```css
@keyframes pulseRing {
  0%        { transform: scale(0.7); opacity: 0.55; }
  80%, 100% { transform: scale(2.1); opacity: 0; }
}
```

| Property | Value |
|---|---|
| Duration | 2.4s |
| Easing | `cubic-bezier(0.2, 0.6, 0.4, 1)` |
| Iteration | infinite |
| Ring size | 112×112 (`w-28 h-28`) — same as bot avatar |
| Ring shape | `rounded-[36px]` squircle |
| Ring style | `border: 2px solid #C97A52` |
| Count | 2 rings, staggered |
| Delay | Ring 1: 0s, Ring 2: 1.2s |
| Position | `absolute`, centered on bot avatar |

### 8.3 Button Press

| Property | Value |
|---|---|
| Active state | `transform: translateY(1px)` |
| Transition | `transition` (150ms, `cubic-bezier(0.4, 0, 0.2, 1)`) |

---

## 9. Iconography

### 9.1 Icon Set

**Font Awesome 6.5.1** — loaded via CDN (`fa-solid`, `fa-regular`, `fa-brands`).

### 9.2 Icon Sizing

| Context | Class | Approx Size |
|---|---|---|
| Standard (buttons, rows) | `text-base` | 16px |
| Tab bar icons | `text-lg` | 18px |
| Bot hero | `text-4xl` | 36px |
| Small inline | `text-sm` | 14px |
| Tiny | `text-xs` | 12px |
| External link indicator | `text-[10px]` | 10px |

### 9.3 Icon Color Treatment

- **On linen/clay surface:** `#2A2521` (primary) or `#8C8175` (muted)
- **Inside pressed wells:** `#C97A52` (terracotta accent)
- **On terracotta surface:** `#FFFFFF` (white)
- **Chevrons:** `#b0a597` (chat log) or `#8C8175` (settings)

### 9.4 Icons Used

| Icon | Class | Context |
|---|---|---|
| Menu | `fa-solid fa-bars` | Home/chat log header |
| Bell | `fa-regular fa-bell` | Home header, assistant sub-heading icon |
| Gear | `fa-solid fa-gear` | Home header, settings tab |
| Robot | `fa-solid fa-robot` | Bot avatars everywhere |
| Paper plane | `fa-solid fa-paper-plane` | Send button |
| Comment dots | `fa-regular fa-comment-dots` | Input pill prefix (home) |
| Comment dots (solid) | `fa-solid fa-comment-dots` | Settings > Preferences icon |
| Plus | `fa-solid fa-plus` | "New" button |
| Search | `fa-solid fa-magnifying-glass` | Search bar |
| Arrow left | `fa-solid fa-arrow-left` | Back button |
| Chevron right | `fa-solid fa-chevron-right` | List row drill-in |
| Ellipsis vertical | `fa-solid fa-ellipsis-vertical` | More button |
| Paperclip | `fa-solid fa-paperclip` | Attach button |
| House | `fa-solid fa-house` | Tab bar Home |
| Bolt | `fa-solid fa-bolt` | Tab bar Skills, settings Skills row |
| Calendar | `fa-regular fa-calendar` | Chat row icon |
| Clock | `fa-solid fa-clock` | Chat row icon |
| File lines | `fa-regular fa-file-lines` | Chat row icon |
| Pen nib | `fa-solid fa-pen-nib` | Chat row icon |
| WhatsApp | `fa-brands fa-whatsapp` | Chat row icon |
| Mug hot | `fa-solid fa-mug-hot` | Chat row icon |
| Video | `fa-solid fa-video` | Chat row icon |
| Telegram | `fa-brands fa-telegram` | Settings row icon |
| Calendar check | `fa-regular fa-calendar-check` | Settings row icon |
| Heart pulse | `fa-solid fa-heart-pulse` | Settings row icon |
| Triangle exclamation | `fa-solid fa-triangle-exclamation` | Settings row icon |
| Arrow up right from square | `fa-solid fa-arrow-up-right-from-square` | External link indicator |

---

## 10. Accessibility Notes

### 10.1 Contrast Ratios (Approximate)

| Pair | Foreground | Background | Ratio | Pass |
|---|---|---|---|---|
| Primary text on linen | `#2A2521` on `#F3EBE2` | — | ~9.5:1 | ✅ AAA |
| Primary text on clay | `#2A2521` on `#E4D8CB` | — | ~7.8:1 | ✅ AAA |
| Secondary text on linen | `#8C8175` on `#F3EBE2` | — | ~3.2:1 | ⚠️ AA Large |
| Secondary text on clay | `#8C8175` on `#E4D8CB` | — | ~2.7:1 | ⚠️ Decorative only |
| White on terracotta | `#FFFFFF` on `#C97A52` | — | ~3.5:1 | ✅ AA Large |
| Body warm on user bubble | `#4A3D30` on `#D8C9B9` | — | ~4.8:1 | ✅ AA |
| Accent on linen | `#C97A52` on `#F3EBE2` | — | ~3.2:1 | ⚠️ AA Large |

### 10.2 Touch Targets

| Component | Size | Meets 44pt minimum? |
|---|---|---|
| Header icon buttons | 48×48 or 44×44 | ✅ |
| Send button | 48×48 | ✅ |
| Tab bar items | 64px wide | ✅ |
| List rows | Full width × ~56px+ | ✅ |
| Attach button | 40×40 | ⚠️ Slightly under (recommend 44) |

### 10.3 Other Notes

- All text uses `antialiased` font smoothing.
- Active/pressed states use `translateY(1px)` for tactile feedback.
- Input fields have `focus:outline-none` — consider adding a custom focus ring for keyboard accessibility.
- Placeholder text color (`#8C8175`) has low contrast — appropriate for placeholder per WCAG guidance.
