# Storytelling Studio apps

This is a project template for [Svelte](https://svelte.dev) apps. Hopefully you've cloned this into [storytelling-studio-apps](https://github.com/GannettDigital/storytelling-studio-apps), which handles most deployment and testing tasks.

_Note that you will need to have [Node.js](https://nodejs.org) installed._

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit GannettDigital/s2-apps-template storytelling-studio-apps/<new-project-slug>
cd <new-project-slug>
```

**Please note:** Your project directory will become the project slug used for deployment, so choose carefully. Calling your project _election_ is bad, _election-2018_ is slightly better, _election-faq-2020_ is much better.

## Get started

Install the dependencies...

```bash
cd <new-project-slug>
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

The dev server will listen on `$PORT` (5000 by default). Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it. The page should reload with your changes.

## Connecting to Google Docs and Sheets

You should be doing this any time there's an editor or reporter involved. Which is to say, almost every project. We use [gootenberg](https://github.com/The-Politico/gootenberg) to pull files from Google Drive. We use a shared Google service account and [JWT authentication](https://github.com/The-Politico/gootenberg/blob/master/docs/docs.jwt.md). If you don't have credentials, please ask.

You will need:

- An environment variable, `$GOOGLE_AUTH_FILE`, pointing to the location of a credentials file (again, ask if you don't have this)
- a spreadsheet or document key, or both, or many of those, depending on the project

Run `gulp auth` to ensure you can authenticate with Google. From there, follow the Gootenberg docs to download and parse [documents with ArchieML](https://github.com/The-Politico/gootenberg/blob/master/docs/parse.archie.md) or [spreadsheets as JSON](https://github.com/The-Politico/gootenberg/blob/master/docs/parse.table.md). These usually live in a `data` task in `gulpfile.js`.

## Using Content API

We can fetch data about Presto assets, which can save us the trouble of managing media or large text files. You'll need `$CONTENT_API_KEY` defined. See past projects for example GraphQL code.

## Where to put data

For the most part, we're dealing with small amounts of data for each project. By the time it reaches us, whatever data we need should be clean and well-organized. If it's not, we should be talking to the reporters and editors we're working with and/or building in time to do that work.

For small data files, it's often easiest to simply import a JSON (or CSV) file into our codebase. That way everything is available immediately, without waiting for an AJAX call. We don't need a loading state because the data is already loaded.

In these cases, data should live in the `src/content` directory. One plugin, `rollup-plugin-json` is already installed. For CSV, install [`rollup-plugin-dsv`](https://github.com/rollup/rollup-plugin-dsv).

If that doesn't work, or if we need to load data asynchronously, data can live in `public` and be loaded via `fetch()`. Just remember to handle cases where requests take longer than expected or fail entirely.

## Deploying to the web

For the most part, this is automated. The include `Makefile` runs two commands on every pull request and merge: `install` and `build`. Running those commands should put a fully rendered app in `public/`, which Jenkins will upload to the CDN.

If you need to build more frequently, or without going through a PR process, a `deploy.sh` script is included. Please use this judiciously.

You'll need to have Google Cloud configured locally, plus two environment variables for this to work:

- `$CDN_AUTH`
- `$USAT_AUTH`

Both variables allow you to cache bust assets on deploy. Again, use wisely.
