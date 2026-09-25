# /assets/documents

Place the real CV PDF here as:

```
gethin-spencer-cv.pdf
```

Then in `index.html` find the "Download CV" button (search for
`data-placeholder-cta="CV"` inside the `.hero-actions` block) and replace it
with a real link, e.g.:

```html
<a href="assets/documents/gethin-spencer-cv.pdf" class="btn btn-primary" download>Download CV</a>
```

You can then remove the `id="cta-note"` placeholder-message paragraph if it's
no longer needed for the LinkedIn button, or leave it in place — it only
displays a message when a placeholder button is clicked.
