# @aw-webflow/iga_page_js

Custom JavaScript for a Webflow page.

## Usage via jsDelivr CDN

Add the following script tag to the Webflow page's custom code (before `</body>`):

```html
<script src="https://cdn.jsdelivr.net/npm/@aw-webflow/iga_page_js@1.0.1/script.js"></script>
```

Pin to a specific version in production. jsDelivr will cache aggressively — bump the version to force a refresh.

## Deployment Workflow

1. Push changes to GitHub.
2. Bump the version in `package.json`.
3. Run `npm publish --access public`.
4. Update the `<script>` tag version in Webflow to point at the newly published version.

## Local Development

```bash
npm install
npm start
```

`npm start` runs Parcel against `script.js` for local testing.
