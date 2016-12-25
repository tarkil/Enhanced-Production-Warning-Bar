Enhanced Production Warning Bar [![Build Status](https://travis-ci.org/tarkil/Enhanced-Production-Warning-Bar.svg?branch=master)](https://travis-ci.org/tarkil/Enhanced-Production-Warning-Bar)
====================================================================================================================

A chrome extension to overlay a warning bar when the use is on a productions site. This is to be a constant reminder to be careful with the data on the site.

Install
=======

If you want to installs this plugin from sources, [npm](https://www.npmjs.com/) is required. Once you have installed it, execute:
```bash
npm run build
```

or for a production environment/release:

```bash
npm run production
```

After building it, open Chrome and go to [extensions](chrome://extensions/) to enable the developer mode. See [Chrome's faq](https://developer.chrome.com/extensions/faq#faq-dev-01) for further information.
Then press "Load Unpacked Extension" button and select the extension (the directory that contains _manifest.json_).

Basic Configuration
===================

To configure it, go to [extensions](chrome://extensions/), and press _Options_ under the extension's description. 


Acknowledgments
===============

This project is a fork of [production warning bar](https://github.com/ericvpeters/production-warning-bar)that includes some new features: such as modal that blocks the whole page.

You can install the original extension from  [Chrome store](https://chrome.google.com/webstore/detail/jdgjpoeggllpkbdjpfipmcifjgjeblpe/publish-delayed?hl=en&gl=US)

You can get icons from https://github.com/rudrab/Shadow
