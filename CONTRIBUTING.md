While we prepare Markdoc for open source, there are a few steps you'll need to take to get it working locally. 

1. If you haven't, clone this repo locally (`markdoc-site`).
   ```
   git clone git@git.corp.stripe.com:mfix/markdoc-site.git
   ```
2. Next, you need to clone `next-markdoc` to an adjacent directory. **Important**: Don't clone this into `markdoc-site`.
   ```
   git clone git@git.corp.stripe.com:mfix/next-markdoc.git
   ```
3. In the working directory for `next-markdoc`, run these commands:
   ```
   yarn
   yarn link
   ```
4. Copy the output. It should look like this: `@stripe-internal/next-markdoc`.
5. Change directories to `markdoc-site` and run these commands: 
   ```
   yarn link @stripe-internal/next-markdoc
   yarn
   ```
6. Assuming you didn't get any errors, you can run your dev server and test with the demo site:
   ```
   yarn dev
   ```

## Issues

If you get any errors, please reach out to @mfix.
