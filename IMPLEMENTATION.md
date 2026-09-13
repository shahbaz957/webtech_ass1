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

## Phase 2 — Books page (`feature/books`)

### Goal

Show 8 starter books as cards (cover from the internet, author, category, summary), open a Read More modal, and let the user add a book with a validated form. User books stay in memory only (lost on refresh). Delete is only for user-added books.

### Files touched

| File | Role |
|------|------|
| `books.html` | Books page + Add Book modal + Read More modal |
| `js/data.js` | `initialBooks` with 8 books |
| `js/script.js` | Books render, form, modals, in-memory CRUD helpers |
| `css/style.css` | Grid cards, modal, form styles, responsive columns |
| `IMPLEMENTATION.md` | This section |
| `README.md` | Status update |

### The 8 books

| Title | Author | Cover source |
|-------|--------|--------------|
| Atomic Habits | James Clear | Open Library ISBN `9780735211292` |
| The Warren Buffett Way | Robert G. Hagstrom | Open Library ISBN `9781118503256` |
| Think and Grow Rich | Napoleon Hill | Open Library ISBN `9781585424337` |
| The Psychology of Money | Morgan Housel | Open Library ISBN `9780857197689` |
| Mindset | Carol S. Dweck | Open Library ISBN `9780345472328` |
| Deep Work | Cal Newport | Open Library ISBN `9781455586691` |
| Hyperfocus | Chris Bailey | Open Library ISBN `9780525522232` |
| Zero to One | Peter Thiel | Open Library ISBN `9780804139298` |

Cover URL pattern: `https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`  
(Needs internet while viewing the page.)

### HTML — tags used and why

| Tag | Why |
|-----|-----|
| `header.page-header` | Page title + Add Book button (Flexbox row) |
| `section` + `#books-grid` | Empty container; cards are created by JS |
| `article.book-card` | Each book is a semantic card (created in JS) |
| `form` / `label` / `input` / `select` / `textarea` | Add Book form (assignment form requirements) |
| `.modal-backdrop` + `.modal` | Add Book and Read More dialogs |
| `button` | Open modal, submit, cancel, read more, delete |

### CSS — what and why

| Piece | Layout | Why |
|-------|--------|-----|
| `.items-grid` | **Grid** 3 columns | Book board (desktop) |
| `@media 900px` / `600px` | Grid 2 → 1 | Responsive tablet/mobile |
| `.book-card` | Flex column | Cover on top, body grows, actions at bottom |
| `.page-header` | **Flexbox** | Title left, button right |
| `.modal-backdrop` | Flex center | Dim overlay + centered dialog |
| `.form-group.error` | Border + error text | Validation feedback |
| `.card-actions` | **Flexbox** | Read More + Delete side by side |

### JavaScript — simplified shared helpers + books

`script.js` was rewritten shorter. Shared helpers are reused on later pages.

| Function | What it does |
|----------|----------------|
| `$` / `openModal` / `closeModal` / `setupModals` | DOM + modals |
| `copyList` / `findById` / `removeById` / `newId` | Reusable list CRUD helpers |
| `setError` / `clearError` | Form errors |
| `setupNav` | Hamburger menu |
| `renderBooks` | Build all book cards as HTML |
| `setupBooks` | Open form, validate, add, one click handler for Read More + Delete |

Working list: `var books = copyList(initialBooks);`  
Later pages: same pattern with `resources`, `ideas`, etc.

**Validation:** title/author ≥ 2, category required, summary ≥ 10.  
**Refresh:** original 8 stay; user books disappear.

### How to test

1. Open `books.html` (with internet for covers).
2. See 8 cards in a grid; resize → 2 then 1 column.
3. Click **Read More** → modal with full text; Close / Escape / outside click.
4. Click **+ Add Book** → leave fields empty → submit → errors show.
5. Fill valid data → new card appears with **Delete**.
6. Delete user book → card removed. Refresh → only the original 8 remain.

### Git

- Branch: `feature/books`
- Suggested commit: `Add Books page with cards, add modal, and in-memory storage`

### Not in this phase

- localStorage persistence  
- Resources / Ideas / Insights pages  
- Home stats wired to real counts  

---

## Phase 3 — Resources page (`feature/resources`)

### Goal

List 8 learning resources, filter by type, search by text, add a resource with validation, delete only user-added items. Same simple in-memory pattern as Books.

### Files touched

| File | Change |
|------|--------|
| `resources.html` | Full page: filters, search, grid, add modal |
| `js/data.js` | 8 items in `initialResources` |
| `js/script.js` | `renderResources` + `setupResources` (reuses helpers) |
| `css/style.css` | `.filters`, `.filter-btn`, `.search-box`, `.resource-card` |
| `IMPLEMENTATION.md` / `README.md` | Phase 3 notes |

### JavaScript (minimal)

Reuses: `copyList`, `removeById`, `newId`, `setError`, `clearError`, `openModal`, `closeModal`, `setupModals`.

| New pieces | Role |
|------------|------|
| `resources` | `copyList(initialResources)` |
| `resourceFilter` / `resourceSearch` | Current filter + search text |
| `renderResources()` | Loop list; skip items that fail filter/search; build cards |
| `setupResources()` | Wire filters, search, delete, add form |

URL check: must start with `http`.

### How to test

1. Open `resources.html`.
2. Click type filters (Videos, Docs, …).
3. Search e.g. `database`.
4. Add Resource with empty fields → errors; then valid save → new card with Delete.
5. Refresh → only original 8 remain.

### Git

- Suggested branch: `feature/resources`
- Suggested commit: `Add Resources page with filter, search, and add form`

---

## Phase 4 — Ideas page (`feature/ideas`)

### Goal

Capture ideas before they disappear: 8 starter ideas, category filter, search, add form, delete user ideas. Same simple pattern as Resources.

### Files touched

| File | Change |
|------|--------|
| `ideas.html` | Filters, search, grid, add modal |
| `js/data.js` | 8 items in `initialIdeas` |
| `js/script.js` | `renderIdeas` + `setupIdeas` |
| `IMPLEMENTATION.md` / `README.md` | Phase 4 notes |

Reuses existing CSS (`.filters`, `.search-box`, `.resource-card`) and helpers (`copyList`, `removeById`, `newId`, errors, modals).

### How to test

1. Open `ideas.html`.
2. Filter by Blog Idea / Project Idea, etc.
3. Search e.g. `database`.
4. Capture Idea → validation → save → Delete on user card.
5. Refresh → only original 8 remain.

### Git

- Suggested branch: `feature/ideas`
- Suggested commit: `Add Ideas page with search, filter, and capture form`

---

## Phase 5 — Insights page (`feature/insights`)

### Goal

Store “what I learned” notes by domain: 8 starter insights, domain filter, add form, delete user items.

### Files touched

| File | Change |
|------|--------|
| `insights.html` | Domain filters, grid, add modal |
| `js/data.js` | 8 items in `initialInsights` |
| `js/script.js` | `renderInsights` + `setupInsights` |

Reuses helpers and `.resource-card` / `.filters` CSS.

### How to test

1. Open `insights.html`.
2. Filter by Databases / AI / etc.
3. Add Insight → validate → save → Delete on user card.
4. Refresh → only original 8 remain.

### Git

- Suggested branch: `feature/insights`
- Suggested commit: `Add Insights page with domain filters and add form`

---

## Later phases (placeholder)

- Phase 6 — Motivation  
- Phase 7 — Wire Home to data  
