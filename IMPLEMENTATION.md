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

## Later phases (placeholder)

- Phase 1 — Home  
- Phase 2 — Books  
- Phase 3 — Resources  
- Phase 4 — Ideas  
- Phase 5 — Insights  
- Phase 6 — Motivation  
- Phase 7 — Wire Home to data  
