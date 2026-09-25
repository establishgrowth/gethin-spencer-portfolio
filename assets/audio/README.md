# /assets/audio

Currently unused — the two radio pieces link out to their real Google Drive
files, and the news programme is embedded from Spotify. This folder is
reserved for when local audio hosting is wanted instead (e.g. self-hosted
`<audio>` players).

If you later host audio locally, a suggested pattern:

```html
<audio controls>
  <source src="assets/audio/radio-package.mp3" type="audio/mpeg">
</audio>
```
