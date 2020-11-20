import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import babel from "rollup-plugin-babel";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js",
    globals: {
      "topojson-client": "topojson-client",
      "d3-dsv": "d3-dsv",
    },
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // Enable hydratabe apps
      hydratable: true,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("bundle.css");
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee => importee === "svelte" || importee.startsWith("svelte/"),
    }),
    commonjs(),

    json(), // so we can import json files

    // use process.env in browser code
    replace({
      "process.env.MAPBOX_TOKEN": JSON.stringify(process.env.MAPBOX_TOKEN),
    }),

    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".mjs", ".svelte"],
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              esmodules: true,
            },
          },
        ],
      ],
    }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
