/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const nodemon = require("nodemon");
const path = require("path");
const yargs = require("yargs");
const config = require("dotenv").config;

const res = yargs.boolean("debug").boolean("debugNest").boolean("e2e").string("logDB").boolean("debugGraphql").boolean("verbose").string("inspect").string("inspectbrk").string("sendAllEmailsTo").argv;
const { debug, debugNest, e2e, verbose, inspect, inspectbrk, logDB, sendAllEmailsTo, debugGraphql } = res;

const options = debug ? "--debug 0.0.0.0:5858" : "";

const exec = e2e ? `yarn run build && mocha --timeout=60000 ${options} 'dist/e2e/**/*.e2e.js'` : `nest start --preserveWatchOutput --watch ${options} -p tsconfig.json`;

/**
 * --inspect and --inspect-brk are node arguments used by things like intellj IDE's (WebStorm, in my case (Dave))
 * to allow the IDE to connect to node for debugging inside the IDE itself.
 * You can use it two ways (for both variables)
 * // --inspect        <-- just the flag, which turns on the inspector
 * // --inspect=XXXX   <-- adds the flag and also inspector port number. ie: --inspect:3030
 * These values will be passed into the Nodemon config via the nodeArgs property.
 */
const nodeArgs: string[] = [];
if (inspect === "") nodeArgs.push(`--inspect`);
if (inspect !== undefined && inspect !== "") nodeArgs.push(`--inspect:${inspect}`);
if (inspectbrk === "") nodeArgs.push(`--inspect-brk`);
if (inspectbrk !== undefined && inspectbrk !== "") nodeArgs.push(`--inspect-brk:${inspectbrk}`);

const ignore = e2e ? ["src/gql/graphql.ts"] : ["src/**/*.spec.ts", "src/gql/graphql.ts"];

config({
  path: path.resolve(__dirname, "../../../.env"),
});
config({
  path: path.resolve(__dirname, "../.env"),
});

const nodemonOptions = {
  watch: ["./src", "./graphql"],
  ext: "js,ts,graphql",
  verbose,
  ignore,
  exec,
  nodeArgs,
  env: {
    NODE_ENV: "local",
    NEST_DEBUG: debugNest ? "true" : "",
    APP_PORT: "8888",
    APP_ENVIRONMENT: "local",
    APP_HOST_NAME: "http://localhost:3000",
  },
};
const nodemonProcess = nodemon(nodemonOptions);

nodemonProcess.on("start", () => console.log("App has started")).on("quit", () => process.exit());
