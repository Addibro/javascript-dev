# javascript-dev

### WHAT'S GOING ON HERE?!


## 1. Run security check with nsp check (after installing nsp with npm)
Although, you'll create a script for this later

## 2. To share the work in progress
run the app, open a new terminal window and run 'lr --port 3000'
and this will generate a unique url to share
You can type 'lt --port 3000 --subdomain andy' to get a personalised url

## 3. Add a script with npm scripts
In the package.json file you can add a script under the "scripts": {}, for example:
"scripts": {
    "start": "node buildScripts/srcServer.js"
}

We can add a nice little start message script to run every time we start our server, like this:
"prestart": "node buildScripts/startMessage.js", for example,
This will run before "start" script, since we use the prefix "pre" before "start"
If we want to run a script after we use post fix "post" after a script name
(needs to be the same name, for example "poststart")

We can now create scripts for security check and localtunnel:
"security-check": "nsp check"
"share": "lt --port 3000"

We want to run multiple things at the same time sometimes!
To use 'npm run all' we can change the start script to: "npm-run-all --parallel <script> <script>"
For example "npm-run-all --parallel security-check open-src"
(To run "silently" type: npm start -s)


@see package.json for all scripts

## 4. Transpilers?!

Babel to transpile the latest version of javascript down to ES5 (for those who don't support ES6)
Add a .babelrc file and add
{
    "presets":["latest"]
}

To use babel we need to add it to our package.json file, specifically to the prestart script:
"prestart": "babel-node buildSc...."
We can use it for our src server(srcServer.js) too:
"open-src": "babel-node buildScript..." and now we can use ES syntax, like import express from 'express';

## 5. Bundling
Nowadays you need to bundle up code that the browser can consume,
but you can also use a bundler create different file structures

# 5.1 Module format
ES6 modules is a standardized, statically analyzable
(improved autocomplete, intelligent refactoring, fail fast, tree shaking)
Tree shaking = dead code elimination
ES6 is easy to read (named imports, defaults exports)

# 5.2 The bundler -- Webpack
Webpack bundle all our assets up into a single file that runs in our target environment, for example the web.
We will configure webpack in a js file (like webpack.config.js)

@see webpack.config.dev.js

# 5.3 Configure express to use webpack


