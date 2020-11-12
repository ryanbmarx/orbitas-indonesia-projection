const assert = require("assert");
const path = require("path");

const Gootenberg = require("gootenberg");
const sander = require("sander");

// the directory we're in is our project slug, always
// if you need a different project URL, use UW config
const PROJECT_SLUG = path.basename(process.cwd());

const REQUIRED_ENVS = ["GAPI_CLIENT_EMAIL", "GAPI_PRIVATE_KEY"];

const OUTPUT_DIR = "./src/content";

const GIT_BRANCH = process.env.GIT_BRANCH || "dev";
const CDN_ROOT =
  "https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps";
const PROJECT_PATH = `${CDN_ROOT}/${GIT_BRANCH}/${PROJECT_SLUG}`;

module.exports = {
  default: check,
  auth,
  data,
  embed,
};

async function check() {
  console.log("Checking configuration.");

  REQUIRED_ENVS.forEach((key) => {
    assert(
      key in process.env,
      `${key} not found. Please check your .env and try again.`
    );
  });

  console.log("Good to gulp.");
}

async function auth() {
  const goot = new Gootenberg();
  await goot.auth.jwt();

  return goot;
}

async function data() {
  await check();

  // fetch data here
  const goot = await auth();
  console.log("Go get some data.");
}

/*
Generate an embed.html file that can be used as within an In Depth story.
*/
async function embed() {
  const seed = Date.now();
  const css = `${PROJECT_PATH}/bundle.css?c=${seed}`;
  const js = `${PROJECT_PATH}/bundle.js?c=${seed}`;

  const html = `
<div id="${PROJECT_SLUG}"></div>
<link href="${css}" rel="stylesheet" />
<script defer src="${js}"></script>
`;

  return sander.writeFile("./public", "embed.html", html);
}
