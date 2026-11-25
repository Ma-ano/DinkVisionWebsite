# DinkVision

[DinkVision](https://dink-vision-website.vercel.app/) is WrenLabs PH’s courtside pickleball recording and replay site. This repository contains the Next.js website, the app walkthrough, and the sample clips.

## Run locally

Run `npm ci` and `npm run dev`. Run `npm run lint` and `npm run build` before deploying.

## Search and discoverability

- The current production origin is `https://dink-vision-website.vercel.app`. If it changes, set `DINKVISION_SITE_URL` to the new HTTPS origin in Vercel before deploying. The new origin will be used for canonical tags, share previews, structured data, and the sitemap.
- In [Google Search Console](https://search.google.com/search-console/), add the production site as a URL-prefix property. Add its HTML verification token to Vercel as `DINKVISION_GOOGLE_SITE_VERIFICATION`, deploy, verify ownership, then submit `/sitemap.xml`. [Search Console verification guide](https://support.google.com/webmasters/answer/9008080)
- In [Bing Webmaster Tools](https://www.bing.com/webmasters/), import the verified Search Console property or set `DINKVISION_BING_SITE_VERIFICATION` to the HTML verification token from Bing. Submit the same sitemap after verification.
- Use the canonical homepage URL on the official DinkVision social profile and the WrenLabs portfolio. Ask participating venues to link to the [player guide](https://dink-vision-website.vercel.app/players) where they already explain how their recording system works.

## Security notes

The quote form prepares a mail draft in the browser. The user’s email service delivers the draft when the user sends it. Production responses include browser security headers. The CSP permits inline framework scripts for static rendering and allows video from the site and any configured HTTPS video origins. Use direct HTTPS URLs for externally hosted clips.

Run `npm audit` when updating dependencies.
