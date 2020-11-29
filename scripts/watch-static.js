const chokidar = require("chokidar");
const { exec } = require("child_process");

const watchedDirectories = process.argv.slice(2);

/**
 * Take a list of directories, assumed to be in ./src, and watches them for changes to the contents.
 * If changes are detected, then it runs the corresponding npn script static:{dir}.
 */

watchedDirectories.forEach(d => {
  console.log(`+++ Now watching ${d}`);
  const watcher = chokidar.watch(`./src/${d}`, { persistent: true });
  watcher.on("change", path => {
    const cmd = `npm run static:${d}`;
    console.log(`+++ ${path} has changed. Running ${cmd}`);
    exec(cmd);
  });
});
