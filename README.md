# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
# API availability

Set the existing `VITE_API_BASE_URL` build environment variable to
`https://api.redpharmabd.com/api`. Vite embeds this value at build time; deployments
must supply it before running `npm run build`. The local `.env` is Git-ignored.
Missing or malformed values resolve to the maintenance page without throwing
during app initialization or issuing API requests to the frontend origin.

The shared Axios client checks its API root with HEAD (5-second timeout) once at
startup. Any HTTP response, including 401/403/404/405/422/5xx, proves reachability.
Transport failures from normal requests trigger a shared confirmation check,
limited to once every 15 seconds. During an outage, a single retry runs 15 seconds
after the previous check finishes. No checks run on route navigation or periodically
while healthy. Normal requests have a 15-second timeout, overridable per request.

The app displays a responsive maintenance page during outages and remounts its
normal content on recovery at the same route, retaining the existing Pinia stores.
It never reloads the browser or automatically resubmits failed writes. Customers
may need to retry an interrupted action after recovery. Browser connectivity checks
require the API's usual CORS support; a CORS failure is indistinguishable from a
network failure in browser JavaScript.

Run `node --test tests/availability.test.js` for HTTP-error, connectivity,
interceptor, request-sharing, and scheduled recovery tests, and `npm run build`
for production compilation.

For rendered browser verification, start Vite and run
`node tests/availability.browser.mjs <playwright-package-path> http://127.0.0.1:5174`.
The test simulates refusal, DNS/network failure, timeout, HTTP error responses,
31 seconds of sustained downtime, automatic recovery at `/about`, and invalid
configuration. It checks mobile overflow and uncaught browser errors. Playwright
can be supplied from an existing runtime; no production dependency is required.
To verify the compiled bundle, run `node tests/preview-server.mjs`, set
`TEST_PRODUCTION=1`, and target `http://127.0.0.1:5181`; configuration injection
checks require the development server and are skipped for compiled assets.

