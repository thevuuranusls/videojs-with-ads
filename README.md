## Current dist versions
videojs: 5.11.7
videojs-contrib-ads: 3.1.2
videojs-ima: 0.4.0

## Installation

Nothing to install, all the source files are directly in /dist/ folder.

To use the test pages, just launch a local server in the root dir.

## How it works

There are 3 example pages:

- `debug.html`: debug page, using the /latest videojs5-hlsjs-source-handler and ads_debug.js
- `preprod.html`: preproduction environment page, using the /latest videojs5-hlsjs-source-handler and ads.js
- `prod.html`: production environment page using the /stable streamroot videojs5-hlsjs-source-handler and ads.js

Launch a local webserver to see the pages working in local.

To use the player in a production environment, you need to include the /dist/ folder, as well as ads.js javascript file into your webpage.
