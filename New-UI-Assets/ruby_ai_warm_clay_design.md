# Ruby AI — Warm Clay Screen Implementation Guide

> **Reference:** Use alongside `ruby_ai_warm_clay_design_system.md` for design tokens, shadow recipes, and component specs.  
> **Device frame:** 390 × 844 pt · `bg-[#F3EBE2]` · `text-[#2A2521]` · `antialiased`  
> **Font:** `'Geist', 'Inter', system-ui, sans-serif`

---

## Table of Contents

1. [Home Screen](#1-home-screen)
2. [Chat Log Screen](#2-chat-log-screen)
3. [Settings Screen](#3-settings-screen)
4. [Conversation Screen](#4-conversation-screen)
5. [Shared: Bottom Tab Bar](#5-shared-bottom-tab-bar)
6. [Navigation Flow](#6-navigation-flow)

---

## 1. Home Screen

**File:** `warm-home.html`  
**Purpose:** Landing/greeting screen with bot status and quick message input.

### 1.1 Layout Structure (top → bottom)

```
┌─────────────────────────────────────┐
│  Header (px-6 pt-7 pb-2)           │
│  ┌────┐                  ┌────┬────┐│
│  │Menu│                  │Bell│Gear││
│  └────┘                  └────┴────┘│
├─────────────────────────────────────┤
│  Main (px-6, centered)              │
│                                     │
│  Date label (mt-10)                 │
│  "Friday, June 19"                  │
│                                     │
│  Greeting heading (mt-2)            │
│  "Good morning,\nAshwin"            │
│                                     │
│  (spacer mt-24)                     │
│                                     │
│  ┌─ Pulse Rings ─────────┐         │
│  │   ┌──────────────┐    │         │
│  │   │  Bot Avatar   │    │         │
│  │   │  (112×112)    │    │         │
│  │   └──────────────┘    │         │
│  └───────────────────────┘         │
│                                     │
│  Listening indicator (mt-8)         │
│  [dot] "Ruby is listening…"         │
│                                     │
├─────────────────────────────────────┤
│  Fixed Bottom Input (px-6 pb-10 pt-4)│
│  ┌──────────────────────────────┐   │
│  │ 💬  [Message Ruby…]    [Send]│   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 1.2 Component Hierarchy

```
body
├── header (px-6 pt-7 pb-2)
│   └── div.flex.items-center.justify-between
│       ├── button.clay-sm (Menu — fa-bars, 48×48, #E4D8CB)
│       └── div.flex.gap-3
│           ├── button.clay-sm (Bell — fa-bell outline, 48×48, #E4D8CB)
│           │   └── span.absolute (notification dot 8×8, #C97A52, top-2.5 right-3)
│           └── button.clay-sm (Gear — fa-gear, 48×48, #E4D8CB)
├── main (px-6, flex flex-col items-center text-center)
│   ├── div (mt-10)
│   │   ├── p (date: "Friday, June 19" — 14px/sm, #8C8175, tracking-wide)
│   │   └── h1 (greeting — 34px, semibold, leading-[1.12], #2A2521, mt-2)
│   └── div (mt-24, flex flex-col items-center)
│       ├── div.relative (pulse container)
│       │   ├── span.ring (pulse ring 1 — 112×112, rounded-[36px], border-2 #C97A52)
│       │   ├── span.ring.d2 (pulse ring 2 — same, animation-delay: 1.2s)
│       │   └── div.clay-accent (bot avatar — 112×112, rounded-[36px], #C97A52, fa-robot text-4xl white)
│       └── div (mt-8, flex items-center gap-2.5)
│           ├── span.dot (10×10px, #C97A52, pulseDot 1.6s)
│           └── p ("Ruby is listening…" — 16px/base, #8C8175)
└── div.fixed.bottom-0 (input container — gradient fade bg)
    └── form.clay (input pill — rounded-full, #E4D8CB, pl-6 pr-2.5 py-2.5, gap-3)
        ├── i.fa-comment-dots (outline, #8C8175)
        ├── input (placeholder "Message Ruby…" — 15px, #2A2521, placeholder #8C8175)
        └── button.clay-accent (send — 48×48, rounded-full, #C97A52, fa-paper-plane white)
```

### 1.3 Content / Copy

| Element | Text |
|---|---|
| Date label | "Friday, June 19" |
| Greeting | "Good morning,\nAshwin" |
| Listening label | "Ruby is listening…" |
| Input placeholder | "Message Ruby…" |

### 1.4 Screen-Specific Notes

- **No tab bar** on home screen — navigation through header buttons only.
- **No back button** — this is the root screen.
- Bot avatar has **two animated pulse rings** expanding outward from behind it (squircle shape matching avatar).
- The listening dot uses the **terracotta** color (`#C97A52`), different from the muted typing dots on the conversation screen.
- Fixed bottom input uses a **gradient fade** from linen to transparent so content scrolls underneath seamlessly.
- The large heading uses a custom line-height of `1.12` — tighter than default.

---

## 2. Chat Log Screen

**File:** `warm-chatlog.html`  
**Purpose:** Chronological list of past conversations grouped by time period.

### 2.1 Layout Structure (top → bottom)

```
┌─────────────────────────────────────┐
│  Header (px-6 pt-7 pb-2)           │
│  ┌────┐                             │
│  │Menu│  "Chat Log"        [+ New]  │
│  └────┘                             │
├─────────────────────────────────────┤
│  Main (px-6 pt-5 pb-36)            │
│                                     │
│  [🔍 Search conversations…] (press) │
│                                     │
│  ── TODAY ──                        │
│  ┌──────────────────────────────┐   │
│  │ (🗓) Weekly Planning    9:41 │   │
│  │      Preview text…     8 msg │   │
│  │ ─────────────────────────── │   │
│  │ (🕐) Remind me to…    8:12  │   │
│  │      Preview text…     2 msg │   │
│  └──────────────────────────────┘   │
│                                     │
│  ── YESTERDAY ──                    │
│  ┌──────────────────────────────┐   │
│  │ (📄) Meeting Notes    4:20PM │   │
│  │ ─────────────────────────── │   │
│  │ (✒️) Brief for an AI…   1d   │   │
│  └──────────────────────────────┘   │
│                                     │
│  ── OLDER ──                        │
│  ┌──────────────────────────────┐   │
│  │ (💬) iOS apps beside…   7h   │   │
│  │ ─────────────────────────── │   │
│  │ (☕) Recipe Ideas    Oct 24   │   │
│  │ ─────────────────────────── │   │
│  │ (🎥) Watch video later  2d   │   │
│  └──────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  Tab Bar (fixed bottom)            │
│  [Home]  [⚡Skills]  [Settings]    │
└─────────────────────────────────────┘
```

### 2.2 Component Hierarchy

```
body
├── header (px-6 pt-7 pb-2)
│   └── div.flex.items-center.justify-between
│       ├── div.flex.items-center.gap-4
│       │   ├── button.clay-sm (Menu — fa-bars, 48×48, #E4D8CB)
│       │   └── h1 ("Chat Log" — 26px, semibold, #2A2521)
│       └── button.clay-accent ("+ New" pill — rounded-full, #C97A52, pl-4 pr-5 py-3)
│           ├── i.fa-plus (xs, white)
│           └── text ("New" — sm/14px, semibold, white)
├── main (px-6 pt-5 pb-36)
│   ├── form.clay-press (search bar — rounded-full, #E4D8CB, px-5 py-3.5, gap-3)
│   │   ├── i.fa-magnifying-glass (#8C8175, text-sm)
│   │   └── input (placeholder "Search conversations…" — sm/14px, #2A2521, placeholder #8C8175)
│   ├── [Section: TODAY]
│   │   ├── h2 (section header — "TODAY", 11px, semibold, tracking-[0.18em], #8C8175, mt-8 mb-3 px-1)
│   │   └── section.clay (card — rounded-[24px], #E4D8CB, p-2.5)
│   │       ├── button (row: Weekly Planning — see List Row spec)
│   │       ├── div (divider — mx-3 h-px bg-[#d2c4b4])
│   │       └── button (row: Remind me to check mail)
│   ├── [Section: YESTERDAY]
│   │   ├── h2 (section header — "YESTERDAY")
│   │   └── section.clay (card — 2 rows with divider)
│   └── [Section: OLDER]
│       ├── h2 (section header — "OLDER")
│       └── section.clay (card — 3 rows with 2 dividers)
└── nav.fixed.bottom-0 (Tab Bar — see §5)
```

### 2.3 Content / Copy

**Search placeholder:** "Search conversations…"

**TODAY rows:**

| Icon | Title | Time | Preview | Badge |
|---|---|---|---|---|
| `fa-regular fa-calendar` | Weekly Planning | 9:41 AM | Here's a breakdown of your tasks for this week… | 8 messages |
| `fa-solid fa-clock` | Remind me to check mail | 8:12 AM | Remind me in 2 mins to check mail. | 2 messages |

**YESTERDAY rows:**

| Icon | Title | Time | Preview | Badge |
|---|---|---|---|---|
| `fa-regular fa-file-lines` | Meeting Notes | 4:20 PM | Summarized the sync with the design team… | 5 messages |
| `fa-solid fa-pen-nib` | Brief for an AI agent | 1d ago | Can you make this brief but still useful… | 2 messages |

**OLDER rows:**

| Icon | Title | Time | Preview | Badge |
|---|---|---|---|---|
| `fa-brands fa-whatsapp` | iOS apps besides WhatsApp | 7h ago | Save your previous answer to a Google Doc… | 4 messages |
| `fa-solid fa-mug-hot` | Recipe Ideas | Oct 24 | 5 quick and healthy dinner options based on… | 6 messages |
| `fa-solid fa-video` | Watch video later | 2d ago | I need to see this video later today… | 8 messages |

### 2.4 Screen-Specific Notes

- **Search bar uses `.clay-press`** (inset shadow) — the only pressed full-width element, visually looks like a search field carved into the surface.
- Card groups use **`.clay` with `rounded-[24px]`** and `p-2.5` internal padding.
- Dividers between rows are `h-px bg-[#d2c4b4]` with `mx-3` (12px margin each side).
- Row active state is `bg-[#F3EBE2]/50` — 50% opacity linen wash.
- Each row is a full-width `<button>` for tap handling.
- `pb-36` (144px) on main ensures content doesn't hide behind the fixed tab bar.
- **Tab bar is present** — Skills tab is active (elevated).

---

## 3. Settings Screen

**File:** `warm-settings.html`  
**Purpose:** Grouped settings menu with drill-in rows.

### 3.1 Layout Structure (top → bottom)

```
┌─────────────────────────────────────┐
│  Header (px-6 pt-7 pb-2)           │
│  ┌────┐                             │
│  │ ←  │  "Settings"                 │
│  └────┘                             │
│         "Manage your account…"      │
├─────────────────────────────────────┤
│  Main (px-6 pt-5 pb-16, gap-7)     │
│                                     │
│  ┌──────────────────────────────┐   │
│  │ (💬) Preferences          >  │   │
│  └──────────────────────────────┘   │
│                                     │
│  INTEGRATIONS                       │
│  ┌──────────────────────────────┐   │
│  │ (✈️) Telegram              >  │   │
│  │ ─────────────────────────── │   │
│  │ (🔔) Proactive & Briefings >  │   │
│  └──────────────────────────────┘   │
│                                     │
│  AUTOMATIONS                        │
│  ┌──────────────────────────────┐   │
│  │ (📅) Scheduled Tasks       >  │   │
│  │ ─────────────────────────── │   │
│  │ (⚡) Skills ↗             >  │   │
│  └──────────────────────────────┘   │
│                                     │
│  SYSTEM                             │
│  ┌──────────────────────────────┐   │
│  │ (💓) Health                >  │   │
│  │ ─────────────────────────── │   │
│  │ (⚠️) Errors               >  │   │
│  └──────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### 3.2 Component Hierarchy

```
body
├── header (px-6 pt-7 pb-2)
│   ├── div.flex.items-center.gap-4
│   │   ├── button.clay-sm (Back — fa-arrow-left, 48×48, #E4D8CB)
│   │   └── h1 ("Settings" — 26px, semibold, #2A2521)
│   └── p (subtitle — "Manage your account & workspace", sm/14px, #8C8175, mt-2 ml-16)
├── main (px-6 pt-5 pb-16, flex flex-col gap-7)
│   ├── section [Preferences — standalone]
│   │   └── div.clay (rounded-[26px], #E4D8CB, overflow-hidden)
│   │       └── button (row: Preferences)
│   ├── section [Integrations]
│   │   ├── h2 (section header — "INTEGRATIONS", xs/12px, semibold, tracking-[0.14em], #C97A52, uppercase, px-1 pb-2)
│   │   └── div.clay (rounded-[26px], #E4D8CB, overflow-hidden)
│   │       ├── button (row: Telegram)
│   │       ├── div.hair.mx-4 (divider)
│   │       └── button (row: Proactive & Briefings)
│   ├── section [Automations]
│   │   ├── h2 ("AUTOMATIONS" — same style as above)
│   │   └── div.clay (2 rows)
│   │       ├── button (row: Scheduled Tasks)
│   │       ├── div.hair.mx-4
│   │       └── button (row: Skills — has external link icon)
│   └── section [System]
│       ├── h2 ("SYSTEM")
│       └── div.clay (2 rows)
│           ├── button (row: Health)
│           ├── div.hair.mx-4
│           └── button (row: Errors)
```

### 3.3 Content / Copy

**Header:** Title "Settings", subtitle "Manage your account & workspace" (indented `ml-16` = 64px to align past the back button)

**Rows:**

| Section | Icon | Label | Notes |
|---|---|---|---|
| *(standalone)* | `fa-solid fa-comment-dots` | Preferences | — |
| Integrations | `fa-brands fa-telegram` | Telegram | — |
| Integrations | `fa-solid fa-bell` | Proactive & Briefings | — |
| Automations | `fa-regular fa-calendar-check` | Scheduled Tasks | — |
| Automations | `fa-solid fa-bolt` | Skills | Has `fa-arrow-up-right-from-square` (10px, #8C8175) inline after label |
| System | `fa-solid fa-heart-pulse` | Health | — |
| System | `fa-solid fa-triangle-exclamation` | Errors | — |

### 3.4 Screen-Specific Notes

- **No tab bar** on settings screen — uses a back arrow for navigation instead.
- **No floating input pill** — this is a pure menu screen.
- Settings card groups use **`rounded-[26px]`** (2px larger than chat log's 24px) and `overflow-hidden` (no internal padding; rows go edge-to-edge).
- Dividers use the `.hair` class: `border-top: 1px solid rgba(120, 98, 74, 0.16)` with `mx-4`.
- Icon wells are **44×44** (slightly smaller than chat log's 48×48).
- Section headers are **terracotta colored** (`#C97A52`) unlike chat log's muted headers.
- Row active state is `translate-y: 1px` (pressed down) rather than background color change.
- `gap-7` (28px) between sections for clear grouping.
- Subtitle is offset `ml-16` (64px) to visually align with content past the back button.
- The "Skills" row has a small external-link icon (10px) indicating it opens outside the app.

---

## 4. Conversation Screen

**File:** `warm-conversation.html`  
**Purpose:** Active chat thread with message exchange between user and Ruby AI.

### 4.1 Layout Structure (top → bottom)

```
┌─────────────────────────────────────┐
│  Sticky Header (bg blur, z-20)     │
│  ┌────┐  [🤖] Ruby        ┌────┐  │
│  │ ←  │  ● Online          │ ⋮  │  │
│  └────┘                    └────┘  │
├─────────────────────────────────────┤
│  Main (px-5 pt-2 pb-36, space-y-7) │
│                                     │
│     "Today · 10:18 AM"             │
│                                     │
│               ┌────────────────┐    │
│               │ User message   │    │
│               │ (right-aligned)│    │
│               └────────────────┘    │
│                                     │
│  [🤖] │ Assistant response         │
│       │ with structured content    │
│       │ - numbered items           │
│       │ - bullet lists             │
│       │ - follow-up question       │
│                                     │
│  [🤖] [...] (typing indicator)     │
│                                     │
├─────────────────────────────────────┤
│  Fixed Bottom Input (px-5 pb-8 pt-5)│
│  ┌──────────────────────────────┐   │
│  │ [📎] [Message Ruby…]  [Send]│   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 4.2 Component Hierarchy

```
body
├── header.sticky.top-0.z-20 (bg-[#F3EBE2]/95 backdrop-blur, px-5 pt-7 pb-4)
│   └── div.flex.items-center.justify-between
│       ├── button.clay-sm (Back — fa-arrow-left, 44×44, #E4D8CB)
│       ├── div.flex.items-center.gap-3 (center group)
│       │   ├── div.clay-accent (bot badge — 40×40, rounded-[14px], #C97A52, fa-robot text-base white)
│       │   └── div.leading-tight
│       │       ├── p ("Ruby" — 15px, semibold, #2A2521)
│       │       └── span.flex.items-center.gap-1.5
│       │           ├── span.dot (online dot — 6×6px, #5E8A5A, pulseDot 1.8s)
│       │           └── text ("Online" — xs/12px, #8C8175)
│       └── button.clay-sm (More — fa-ellipsis-vertical, 44×44, #E4D8CB)
├── main (px-5 pt-2 pb-36, space-y-7)
│   ├── div.flex.justify-center (timestamp divider)
│   │   └── span ("Today · 10:18 AM" — 11px, tracking-wide, #8C8175)
│   ├── section.flex.justify-end (user message)
│   │   └── div.clay-user (bubble — max-w-[85%], rounded-[22px] rounded-tr-[8px], #D8C9B9, px-5 py-4)
│   │       └── p (message text — 15px, leading-relaxed, #4A3D30)
│   ├── section.flex.gap-3 (assistant response)
│   │   ├── div.clay-accent (avatar — 36×36, rounded-[12px], #C97A52, fa-robot text-sm white, mt-0.5)
│   │   └── article.flex-1.border-l-2.border-[#E4D8CB].pl-4
│   │       ├── p (intro paragraph — 15px, leading-relaxed, #2A2521)
│   │       ├── div.mt-5.flex.items-center.gap-2.5 (sub-heading)
│   │       │   ├── span.clay-sm (mini icon badge — 32×32, rounded-full, #E4D8CB, fa-bell #C97A52 text-sm)
│   │       │   └── h2 (heading — 15px, semibold, #2A2521)
│   │       ├── p.mt-1.5 (subtitle — xs/12px, #8C8175)
│   │       ├── div.mt-4 (numbered item 1)
│   │       │   ├── div.flex.items-baseline.gap-2
│   │       │   │   ├── span ("1." — sm/14px, semibold, #C97A52)
│   │       │   │   └── h3 (title — 15px, semibold, #2A2521)
│   │       │   └── ul.mt-2.space-y-2.pl-1 (bullet list)
│   │       │       └── li.flex.gap-2.5 (each bullet)
│   │       │           ├── span (dot — 6×6px, mt-2, rounded-full, #C97A52)
│   │       │           └── span (text — 14px, leading-relaxed, #4A3D30)
│   │       ├── div.mt-4 (numbered item 2 — same structure)
│   │       └── p.mt-5 (follow-up — 14px, leading-relaxed, #4A3D30)
│   └── section.flex.gap-3.items-center (typing indicator)
│       ├── div.clay-accent (avatar — same as above)
│       └── div.clay-sm (pill — rounded-full, #E4D8CB, px-4 py-3, flex gap-1.5)
│           ├── span.dot (8×8px, #8C8175, delay 0s)
│           ├── span.dot (8×8px, #8C8175, delay 0.3s)
│           └── span.dot (8×8px, #8C8175, delay 0.6s)
└── div.fixed.bottom-0 (input container — gradient fade)
    └── form.clay (pill — rounded-full, #E4D8CB, pl-3 pr-2.5 py-2.5, gap-3)
        ├── button.clay-sm (attach — 40×40, rounded-full, #D8C9B9, fa-paperclip text-sm #8C8175)
        ├── input (placeholder "Message Ruby…" — 15px)
        └── button.clay-accent (send — 48×48, rounded-full, #C97A52, fa-paper-plane white)
```

### 4.3 Content / Copy

**Header:** Bot name "Ruby", status "Online"  
**Timestamp:** "Today · 10:18 AM"

**User message:**
> "What apps are there for iOS except WhatsApp which have an API I can use with my AI assistant to deliver reminder alerts? Telegram as a gateway is blocked in India."

**Assistant response intro:**
> "Good question — and an important constraint to work around. Here's a solid rundown of iOS-compatible messaging and notification apps with API access that can serve as a delivery channel for your AI assistant."

**Sub-heading:** "Notification & alert apps with APIs"  
**Subtitle:** "iOS, India-accessible"

**Item 1 — Pushover:**
- Purpose-built for sending push notifications via API.
- Clean REST API — dead simple to integrate.
- iOS app receives notifications instantly.
- Paid one-time ($5) but extremely reliable.

**Item 2 — ntfy.sh:**
- Open-source, free, and self-hostable.
- Send alerts with a single HTTP POST request.

**Follow-up:** "Want me to draft a sample integration for any of these with your assistant?"

**Input placeholder:** "Message Ruby…"

### 4.4 Screen-Specific Notes

- **Sticky header** with `position: sticky; top: 0; z-index: 20` — has frosted glass effect: `bg-[#F3EBE2]/95` (95% opacity) + `backdrop-blur` (8px blur).
- **No tab bar** — this is a detail/drill-in screen.
- Header buttons are **44×44** (smaller than home's 48×48) to save space.
- **User message bubble** has asymmetric radius: 22px on three corners, **8px on top-right** — creates a "speech tail" effect pointing to the sender.
- **Assistant response** has a **left border** (`2px solid #E4D8CB`) creating a visual thread line from avatar down through content.
- The assistant's avatar sits at `mt-0.5` (2px) to optically align with the first line of text.
- **Online status dot** uses `#5E8A5A` (green) — the *only* non-warm color in the entire design.
- **Typing indicator dots** use `#8C8175` (muted) not `#C97A52` — deliberate contrast with the "listening" dot on home.
- **Conversation variant** pulseDot animation is slightly different: 1.8s duration (vs 1.6s), opacity range 0.4–1 (vs 0.35–1), scale range 0.85–1 (vs 0.8–1). Slightly more subtle.
- Content bottom padding is `pb-36` (144px) to clear the floating input.
- Message spacing between sections is `28px` (`space-y-7`).
- **Attach button** uses `#D8C9B9` background (deeper clay) to differentiate from the pill surface.
- Bullet dots are **6×6px** (`w-1.5 h-1.5`) with `mt-2` (8px) to align with text baseline.

---

## 5. Shared: Bottom Tab Bar

**Appears on:** Chat Log screen  
**Does NOT appear on:** Home, Settings, Conversation

### 5.1 Structure

```
nav.fixed.bottom-0 (centered, w-[390px], px-6 pb-7 pt-3)
└── div.clay (rounded-full, #E4D8CB, py-3, flex items-center justify-around)
    ├── a [Home] (inactive)
    │   ├── i.fa-house (text-lg/18px, #8C8175)
    │   └── span ("Home" — 11px, #8C8175)
    ├── a [Skills] (active — elevated)
    │   ├── span.clay-accent (-mt-7, 48×48, rounded-full, #C97A52, fa-bolt text-base white)
    │   └── span ("Skills" — 11px, #C97A52, font-medium)
    └── a [Settings] (inactive)
        ├── i.fa-gear (text-lg/18px, #8C8175)
        └── span ("Settings" — 11px, #8C8175)
```

### 5.2 Tab States

| State | Icon Treatment | Label Color | Label Weight |
|---|---|---|---|
| **Inactive** | `text-lg`, `#8C8175`, inline | `#8C8175` | 400 (normal) |
| **Active (Skills)** | Elevated 48×48 circle with `.clay-accent`, `#C97A52` bg, white icon, `-mt-7` (floats 28px above bar edge) | `#C97A52` | 500 (medium) |

### 5.3 Tab Items

| Position | Label | Icon | State in Chat Log |
|---|---|---|---|
| Left | Home | `fa-solid fa-house` | Inactive |
| Center | Skills | `fa-solid fa-bolt` | Active (elevated) |
| Right | Settings | `fa-solid fa-gear` | Inactive |

### 5.4 Notes

- Each tab anchor is `w-16` (64px) wide.
- `gap-1` (4px) between icon and label within each tab.
- The active tab's elevated circle creates a **notch effect** — it protrudes above the pill-shaped bar.
- The tab bar pill itself has the standard `.clay` shadow.

---

## 6. Navigation Flow

```
                    ┌──────────┐
                    │   HOME   │
                    │(root)    │
                    └────┬─────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
              ▼          ▼          ▼
        ┌──────────┐ ┌──────┐ ┌──────────┐
        │ CHAT LOG │ │(Bot) │ │ SETTINGS │
        │(tab bar) │ │Input │ │(back ←)  │
        └────┬─────┘ └──────┘ └──────────┘
             │
             ▼
      ┌──────────────┐
      │ CONVERSATION │
      │  (back ←)    │
      └──────────────┘
```

### 6.1 Navigation Actions

| From | Action | To |
|---|---|---|
| Home | Tap Gear button | Settings |
| Home | Tap Menu button | Chat Log (or drawer — not shown) |
| Home | Type & send message | Conversation (implied) |
| Chat Log | Tap conversation row | Conversation |
| Chat Log | Tap "Home" tab | Home |
| Chat Log | Tap "Settings" tab | Settings |
| Chat Log | Tap "+ New" | New Conversation |
| Settings | Tap Back arrow | Previous screen |
| Settings | Tap any row | Sub-setting screen (drill-in) |
| Conversation | Tap Back arrow | Chat Log |
| Conversation | Tap More (⋮) | Action sheet (not shown) |

### 6.2 Active Tab States by Screen

| Screen | Home Tab | Skills Tab | Settings Tab |
|---|---|---|---|
| Home | — (no tab bar) | — | — |
| Chat Log | Inactive | **Active** (elevated) | Inactive |
| Settings | — (no tab bar) | — | — |
| Conversation | — (no tab bar) | — | — |

---

## Appendix: Quick Reference — Shadows per Screen

| Screen | `.clay` | `.clay-sm` | `.clay-accent` | `.clay-press` | `.clay-user` | `.clay-anchor` |
|---|---|---|---|---|---|---|
| Home | Input pill | Menu, Bell, Gear buttons | Bot avatar, Send button | — | — | — |
| Chat Log | Card groups, Tab bar | Menu button | "New" button, Skills tab icon | Icon wells, Search bar | — | — |
| Settings | Card groups | Back button | — | Icon wells | — | — |
| Conversation | Input pill | Back, More buttons, sub-heading icon, typing pill | Bot avatars, Send button | — | User message | — |
