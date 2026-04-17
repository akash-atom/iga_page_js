# @aw-webflow/iga_page_js

## Project Overview
Custom JavaScript for a Webflow page, published to npm as `@aw-webflow/iga_page_js` and consumed via the jsDelivr CDN on the live Webflow site.

## Code Style
- All code in `script.js` must use `var` and ES5 syntax for broad browser compatibility.
- No ES6+ features (no `let`/`const`, arrow functions, template literals, `class`, destructuring, etc.) unless transpiled.
- The script runs directly in the browser via a `<script>` tag in Webflow — assume no build step on the consumer side.

## Deployment
1. Commit and push changes to GitHub.
2. Bump the version in `package.json`.
3. Run `npm publish --access public` (scoped packages default to private).
4. jsDelivr automatically serves the new version at:
   `https://cdn.jsdelivr.net/npm/@aw-webflow/iga_page_js@<version>/script.min.js`
5. Update the `<script>` tag in the Webflow page embed to reference the new version.

## Local Development
- `npm install` to install dev dependencies.
- `npm start` to run Parcel against `script.js` for local testing.
