# Gethin Spencer — Journalism Portfolio

Static, dependency-free portfolio site (HTML/CSS/JS, no build step) for
Gethin Spencer, broadcast journalist and video journalist. Built for GitHub
Pages.

This is the **first-stage foundation**: the design system, layout, navigation
and portfolio structure are final; several photographs, one video, the CV
PDF and a few links are still placeholders, clearly labeled in the page
itself and in this README, ready to be swapped in without any redesign.

---

## 1. Run it locally

No build tools or dependencies are required — it's plain HTML/CSS/JS.

**Easiest option — just open the file:**

```bash
open index.html
```

**Recommended option — serve it** (some browsers restrict local file access
for things like `fetch`; a tiny server avoids any of that):

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## 2. Deploy to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to it:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio build"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. In the repository on GitHub: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
5. GitHub will publish the site at:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

   (or `https://<your-username>.github.io/` if the repo is named
   `<your-username>.github.io`).

**Notes:**

- The `.nojekyll` file at the project root tells GitHub Pages to skip Jekyll
  processing — required because this project doesn't use Jekyll and some
  filenames could otherwise be mishandled.
- All asset paths in `index.html` are **relative** (`assets/css/style.css`,
  not `/assets/css/style.css`), so the site works correctly whether it's
  served from a custom domain root or from a GitHub Pages project subpath
  like `/your-repo/`. Keep any new asset references relative in the same way.
- If you later add a custom domain, add a `CNAME` file at the project root
  containing just the domain name, and configure DNS per GitHub's
  instructions.

---

## 3. Where images should be stored

All images live in [`assets/images/`](assets/images/). See
[`assets/images/README.md`](assets/images/README.md) for the full filename
map (which file replaces which placeholder).

---

## 4. How to replace an image placeholder

Every placeholder in `index.html` is a `<div class="media-placeholder">`
with a labeled `<span>` (e.g. "IMAGE 5 — Multimedia Journalism Project"),
and it's always preceded by an HTML comment telling you exactly what to
replace it with, e.g.:

```html
<!-- Replace with: <img src="assets/images/gethin-headshot.jpg" alt="Portrait of Gethin Spencer"> -->
<div class="media-placeholder media-placeholder--portrait" aria-hidden="true">
  <span>IMAGE 1<br>Gethin Professional Hero Photo</span>
</div>
```

To replace it:

1. Add the real image file to `assets/images/` (see the filename map above).
2. Delete the `<div class="media-placeholder">…</div>` block.
3. Uncomment and use the `<img>` tag from the comment above it, with a real,
   descriptive `alt` attribute.

No CSS changes are needed — `.media-placeholder` and real `<img>` tags sit in
the same layout slot (`.port-media`, `.hero-media`, `.timeline-media`, etc.),
so swapping one for the other doesn't break spacing or the grid.

---

## 5. Where the CV PDF should be stored

Store it at `assets/documents/gethin-spencer-cv.pdf` (see
[`assets/documents/README.md`](assets/documents/README.md)), then update the
"Download CV" button in the hero (`index.html`, search for
`data-placeholder-cta="CV"`) to a real link:

```html
<a href="assets/documents/gethin-spencer-cv.pdf" class="btn btn-primary" download>Download CV</a>
```

---

## 6. How to update links

Every real, already-supplied link (news stories, YouTube, Spotify, the
Tickaroo live-reporting embed, Google Drive audio, establishgrowth.com) is
written directly into `index.html` as a plain `href`/`src`. To change one,
search `index.html` for the current URL (they're used consistently for both
the thumbnail link and the action link/button on each portfolio card) and
replace both occurrences.

The still-outstanding links — LinkedIn profile, email, YouTube channel — are
wired up as placeholder buttons (`data-placeholder-cta="LinkedIn"`,
`"Email"`, `"YouTube"`) rather than dead `<a>` tags. Once you have the real
URL:

```html
<!-- before -->
<button type="button" class="social-link" data-placeholder-cta="LinkedIn" aria-label="LinkedIn (link coming soon)">LinkedIn</button>

<!-- after -->
<a class="social-link" href="https://www.linkedin.com/in/your-real-profile/" target="_blank" rel="noopener">LinkedIn</a>
```

Repeat for every element sharing that `data-placeholder-cta` value (there are
several: hero action, contact row, contact social links, footer). A quick way
to find them all: search the file for `data-placeholder-cta="LinkedIn"`
(or `"Email"`, `"CV"`, `"YouTube"`).

For the contact email specifically, use a `mailto:` link:

```html
<a class="contact-value" href="mailto:real.email@example.com">real.email@example.com</a>
```

---

## 7. How to add another portfolio project

Portfolio projects live inside one of the four panels in the **Portfolio**
section of `index.html`:

- `#panel-written` — Written Journalism
- `#panel-audio` — Audio Journalism
- `#panel-video` — Video Journalism
- `#panel-live` — Live & Sports

Each project is one `<article class="port-card">` inside `.portfolio-grid`.
Copy an existing card as a template, e.g.:

```html
<article class="port-card">
  <a class="port-media" href="https://example.com/your-story" target="_blank" rel="noopener">
    <!-- Replace with: <img src="assets/images/your-image.jpg" alt="Description"> -->
    <div class="media-placeholder" aria-hidden="true"><span>IMAGE — Your Project</span></div>
  </a>
  <div class="port-body">
    <p class="port-cat">Written Journalism</p>
    <h3><a href="https://example.com/your-story" target="_blank" rel="noopener">Project Headline</a></h3>
    <p>One or two sentence description.</p>
    <a class="port-action" href="https://example.com/your-story" target="_blank" rel="noopener">Read Story <span aria-hidden="true">&rarr;</span></a>
  </div>
</article>
```

Add `port-card--large` to the `class` list to give a project a wider,
two-column-span feature treatment (used for the strongest pieces).

---

## 8. How to change contact information

See section 6 above — contact details are the `data-placeholder-cta="Email"`
and `data-placeholder-cta="LinkedIn"` elements inside `#contact` in
`index.html`.

---

## 9. How to update the accent color

Everything themed with the accent color (links, category labels, the active
tab underline, hover states, focus rings) reads from two CSS variables at the
top of [`assets/css/style.css`](assets/css/style.css):

```css
:root {
  --color-accent: #9c2b20;
  --color-accent-dark: #7a2019;
  ...
}
```

Change those two values (keep `--color-accent-dark` a slightly darker shade
of the same hue) and the whole site updates — no other CSS or HTML edits are
needed.

---

## 10. GitHub Pages-specific configuration

- **`.nojekyll`** at the project root — already included; disables Jekyll
  processing so the site is served as-is.
- **Relative asset paths** — already used throughout (`assets/...`, not
  `/assets/...`), so the site works whether it's served at the repo root or
  a project subpath (`username.github.io/repo-name/`).
- **No backend** — the site is fully static. The contact section
  intentionally does not include a working form submission (GitHub Pages
  can't run server code); it uses direct `mailto:`/profile links instead.
  If a contact form is added later, wire it to a third-party form service
  (e.g. Formspree) rather than expecting it to work on its own.
- **Custom domain (optional)** — add a `CNAME` file at the project root with
  your domain, then configure DNS per GitHub's Pages documentation.

---

## Project structure

```
index.html                  Single-page site (all sections)
assets/
  css/style.css              All styles, incl. accent color variables
  js/main.js                 Nav, scrollspy, portfolio tabs, scroll-reveal,
                              placeholder-CTA messaging
  images/                    Photos + README mapping placeholders → filenames
  documents/                 CV PDF goes here + README
  audio/                     Reserved for self-hosted audio + README
  video/                     Reserved for self-hosted video + README
.nojekyll                    Disables Jekyll on GitHub Pages
```

## Content & link policy

All biography, experience, project, skills and education copy on the site
is Gethin's own supplied wording, unedited in substance — only presentational
line breaks were added. All portfolio URLs currently on the site (Shorthand
projects, Sheffield Wire, Derbyshire Times, The Star, Hits Radio/Rayo,
Tickaroo, the two Google Drive audio files, the Spotify episode, the YouTube
documentary, and establishgrowth.com) are real, supplied links — not
placeholders. Anything still outstanding (headshot and other photography,
CV PDF, LinkedIn URL, email, YouTube URL, the Rugby package, additional
freelance video, Forge TV details, American sports broadcasting details) is
marked with an explicit, visible placeholder in both the UI and this README,
by design, so nothing is silently invented.
