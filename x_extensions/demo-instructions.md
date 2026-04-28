# Demo Instructions

## Before the demo — one-time setup

Open a terminal with `Ctrl+`` (or Terminal → New Terminal from the menu), then:

```
cd tools/dashboard
npm run dev
```

Leave it running throughout. Check the terminal for the local URL (e.g. `http://localhost:5173/`) and open it in your browser.

---

## Step 1 — Show the broken starting point

Open a second terminal with `Ctrl+`` and use it for all `git checkout` commands below:

```
git checkout 4790a8b
```

Restart the dev server (`Ctrl+C` then `npm run dev`). Show Bella: the dashboard loads but clicking any hypothesis detail page crashes, the back button does nothing, Observable Filters are missing, and Value Proposition shows no content.

---

## Step 2 — Apply Fix 1 (vite config) - shows Home Page

```
git checkout 482ed17
```

Restart the dev server. Show: the dashboard now loads `hypotheses.md` correctly (no 500 error).

---

## Step 3 — Apply Fix 2 (crash on undefined arrays) - shows Panel Pages

```
git checkout 2b6d57c
```

Hot-reload is enough here — no restart needed. Show: clicking Problem, Segment, Unit Economics, and Value Proposition no longer crashes.

---

## Step 4 — Apply Fix 3 (back button)

```
git checkout 4837dab
```

Show: clicking Back from a detail page now returns to the main panel list.

---

## Step 5 — Apply Fix 4 (Observable Filters on segment page)

```
git checkout a7ac65d
```

Show: the Segment detail page now shows the Observable Filters section.

---

## Step 6 — Apply Fix 5 (Value Proposition panel and page)

```
git checkout caab705
```

Restart the dev server (`Ctrl+C` then `npm run dev`) — this fix adds a new import to the parser and Vite won't always hot-reload that cleanly. Show: the Value Proposition panel now shows real confidence, evidence, and assumptions instead of a blank page.

---

## After the demo — return to main

```
git checkout main
```

You will be in detached HEAD mode during the demo — that is fine, it is read-only and nothing gets changed on any branch.
