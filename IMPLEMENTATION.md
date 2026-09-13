# MindVault — Implementation Notes

Living document. After each phase we record **what** was added, **how**, and **why** (for viva prep).

---

## Phase 0 — Project setup (`feature/setup`)

### Goal

Create the empty project skeleton: folders, shared navbar/footer on all 6 pages, CSS design tokens + base layout, mobile nav JS only, and empty data placeholders.

### Files touched

| File | Role |
|------|------|
| `index.html` | Home stub |
| `books.html` | Books stub |
| `resources.html` | Resources stub |
| `ideas.html` | Ideas stub |
| `insights.html` | Insights stub |
| `motivation.html` | Motivation stub |
| `css/style.css` | Shared stylesheet |
| `js/data.js` | Empty initial arrays |
| `js/script.js` | `setupNav()` only |
| `images/books/` | Folder for book covers (you fill later) |
| `IMPLEMENTATION.md` | This file |

### HTML — tags used and why

| Tag | Where | Why |
|-----|--------|-----|
| `header` | Top of every page | Semantic site header (assignment requirement) |
| `nav` | Inside header | Main navigation landmark |
| `ul` / `li` / `a` | Nav links | List of destinations; `active` class marks current page |
| `main` | Page body | Primary content area |
| `section` | Stub content | Logical content block (will hold hero/cards later) |
| `footer` | Bottom of every page | Consistent footer across the site |
| `button.nav-toggle` | Header | Opens mobile menu (visible under 600px) |
| `link` to `css/style.css` | `<head>` | One external stylesheet for all pages |
| `script` for `data.js` then `script.js` | Before `</body>` | Load data first, then behaviour |

### CSS — what and why

| Piece | Why |
|-------|-----|
| `:root` variables (`--bg`, `--accent`, `--space-*`, etc.) | One place to change colours/spacing; keeps UI consistent |
| `.container` | Centers content with max width |
| `.nav-inner` + `.site-nav ul` + `.footer-inner` | **Flexbox** for one-dimensional rows (logo + nav, footer links) |
| `.btn` / `.btn-outline` | Shared button styles for later Add / Cancel actions |
| `.page-stub` | Temporary card so stubs look intentional |
| `@media (max-width: 600px)` | Hamburger menu; footer stacks — **responsive** |

Grid for card boards is **not** added yet (starts in Phase 2 Books).

### JavaScript — functions

#### `setupNav()`

- **What:** Finds `.nav-toggle` and `.site-nav`. On click, toggles class `open` on the nav. Clicking a nav link closes the menu.
- **How:** `document.querySelector`, `addEventListener("click")`, `classList.toggle` / `remove`.
- **Why:** Assignment needs a responsive hamburger menu; this is the first interactive feature and works on every page.

#### Boot

```js
document.addEventListener("DOMContentLoaded", function () {
  setupNav();
});
```

Runs after the HTML is ready so elements exist.

### Data (`js/data.js`)

Empty arrays: `initialBooks`, `initialResources`, `initialIdeas`, `initialInsights`, `initialQuotes`.  
Filled in later phases. Kept separate from `script.js` so content is easy to edit.

### How to test

1. Open `index.html` in a browser.
2. Click each nav link — all 6 pages load with the same header/footer.
3. Resize the window below ~600px — hamburger (☰) appears; click it to open/close the menu.
4. Confirm no console errors.

### Git

- Branch: `feature/setup`
- Suggested commit message: `Add MindVault Phase 0 project skeleton and shared nav`

### Not in this phase

- Home hero/stats content  
- Cards, modals, forms  
- localStorage  
- Book images (place them in `images/books/` before Phase 2)

---

## Phase 1 — Home page (`feature/home`)

### Goal

Turn the Home stub into a real overview: hero, vault statistics (static numbers), quick actions, and a recent-items placeholder. No new JavaScript yet — stats stay hardcoded until Phase 7.

### Files touched

| File | Role |
|------|------|
| `index.html` | Full Home page content |
| `css/style.css` | Hero, stats, quick actions, recent cards + responsive rules |
| `IMPLEMENTATION.md` | This Phase 1 section |
| `README.md` | Status update |

### HTML — tags used and why

| Tag / structure | Where | Why |
|-----------------|--------|-----|
| `section.hero` | Top of `main` | Introduces MindVault; one clear purpose |
| `h1` | Hero | Main page heading (brand message) |
| `section.statistics` | Below hero | Groups the count cards |
| `article.stat-card` | Inside stats | Each statistic is its own article (semantic card) |
| `strong` + `span` | Stat card | Number + label |
| `section.quick-actions` | Middle | Shortcut links to other pages |
| `a.btn` | Quick actions / hero | Links styled as buttons (no modals yet) |
| `section.recent-items` | Lower | Placeholder for future “recent” list |
| `article.recent-card` | Recent grid | Placeholder cards until real data exists |
| `id="stat-books"` etc. | Stat numbers | Ready for Phase 7 JS to update counts |

### CSS — what and why

| Piece | Layout | Why |
|-------|--------|-----|
| `.hero`, `.hero-lead`, `.hero-actions` | Flexbox on `.hero-actions` | Hero text + CTA buttons in a row that wraps |
| `.stats-row` | **Flexbox** | One-dimensional row of equal-ish stat cards (`flex: 1 1 120px`) |
| `.stat-card` | Card surface | Consistent with site tokens (border, radius, shadow) |
| `.actions-row` | **Flexbox** | Button group for quick actions |
| `.recent-grid` | **CSS Grid** `repeat(3, 1fr)` | Two-dimensional card layout (first Grid use) |
| `@media (max-width: 900px)` | Grid → 2 columns | Tablet |
| `@media (max-width: 600px)` | Grid → 1 col; actions column | Mobile; full-width buttons |

### JavaScript

No new functions in Phase 1.

- Still only `setupNav()` from Phase 0.
- Stat numbers are **static HTML** (`8` for each). Phase 7 will call something like `updateHomeStats()` to read array lengths.

### How to test

1. Open `index.html`.
2. Check hero text and two CTAs (Ideas / Books).
3. Check five stat cards show `8`.
4. Click each quick action — goes to Books, Resources, Ideas, Insights.
5. Resize: stats wrap; recent cards go 3 → 2 → 1 columns; buttons stack on mobile.
6. Hamburger still works under 600px.

### Git

- Branch: `feature/home`
- Suggested commit message: `Add MindVault Home page with hero, stats, and quick actions`

### Not in this phase

- Dynamic stats from data arrays  
- Real recent items  
- Add modals from Home  
- Books page content (Phase 2)

---

## Later phases (placeholder)

- Phase 2 — Books  
- Phase 3 — Resources  
- Phase 4 — Ideas  
- Phase 5 — Insights  
- Phase 6 — Motivation  
- Phase 7 — Wire Home to data  
