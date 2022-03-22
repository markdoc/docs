## Set up your dev box

While we prepare Markdoc for open source, there are a few steps you'll need to take to get it working locally.

1. If you haven't, clone this repo locally
   ```
   git clone git@github.com:markdoc/docs.git ~/stripe/markdoc-docs
   ```
2. Next, you need to clone `@markdoc/next.js` to an adjacent directory.
   ```
   git clone git@github.com:markdoc/next.js.git ~/stripe/markdoc-next.js
   ```
3. In the working directory for `@markdoc/next.js`, run these commands:
   ```
   cd ~/stripe/markdoc-next.js
   npm install
   npm link
   ```
4. Change directories to `docs` and run these commands:
   ```
   cd ~/stripe/markdoc-docs
   npm link @markdoc/next.js
   npm install
   ```
5. Assuming you didn't get any errors, you can run your dev server and test with the demo site:
   ```
   npm run dev
   ```

## Publishing to Pages

1. Run `NEXT_PUBLIC_BASE_PATH=/markdoc npm run export`
2. Run `cp -r ~/stripe/markdoc-docs/out/* ~/stripe/pages/sites/markdoc/public`
3. Submit a PR

## Issues

If you get any errors, please reach out to @mfix.
