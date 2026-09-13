# MindVault

Personal knowledge vault — static website (HTML, CSS, JavaScript).

## Open the site

Open `index.html` in your browser.

## Pages

| Page | Question it answers |
|------|---------------------|
| Home | Overview of the vault |
| Books | What am I reading? |
| Resources | What am I consuming? |
| Ideas | What came to my mind? |
| Insights | What did I learn? |
| Motivation | What keeps me moving? |

## Status

All planned phases complete (0–7):

- Shared nav + mobile menu  
- Home with live stats + recent items  
- Books / Resources / Ideas / Insights (add, filter/search where planned, in-memory)  
- Motivation quotes + Inspire Me  

See [IMPLEMENTATION.md](IMPLEMENTATION.md) for phase notes and viva explanations.

## Note on data

Starter items live in `js/data.js`. Items you add stay in memory only and disappear on refresh (by design for phase 1). Helpers are ready to swap to `localStorage` later.
