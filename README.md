# Javascript-dev

This is a evnironment template for javascript

# What's going on here?!

### 1. run security check with nsp check (after installing nsp with npm)
although, you'll create a script for this later

### 2. to share the work in progress
run the app, open a new terminal window and run 'lr --port 3000'
and this will generate a unique url to share
you can type 'lt --port 3000 --subdomain andy' to get a personalised url

### 3. add a script with npm scripts
in the package.json file you can add a script under the "scripts": {}, for example:
```
"scripts": {
    "start": "node buildscripts/srcserver.js"
}
```

we can add a nice little start message script to run every time we start our server, like this:`
```
"prestart": "node buildscripts/startmessage.js"
```
this will run before "start" script, since we use the prefix "pre" before "start"
if we want to run a script after we use post fix "post" after a script name
(needs to be the same name, for example "poststart")

we can now create scripts for security check and localtunnel:
```
"security-check": "nsp check"
"share": "lt --port 3000"
```
we want to run multiple things at the same time sometimes!
to use 'npm run all' we can change the start script to:
```
"npm-run-all --parallel <script> <script>"
```
for example
```
"npm-run-all --parallel security-check open-src"
```
(to run "silently" type: npm start -s)


@see package.json for all scripts

### 4. transpilers?!

babel to transpile the latest version of javascript down to es5 (for those who don't support es6)
add a .babelrc file and add
```
{
    "presets":["latest"]
}
```

to use babel we need to add it to our package.json file, specifically to the prestart script:
"prestart": "babel-node buildsc...."
we can use it for our src server(srcserver.js) too:
```
"open-src": "babel-node buildscript..."
```
and now we can use es syntax, like import express from 'express';

### 5. Bundling
Nowadays you need to bundle up code that the browser can consume,
but you can also use a bundler create different file structures

#### 5.1 module format
es6 modules is a standardized, statically analyzable
(improved autocomplete, intelligent refactoring, fail fast, tree shaking)
tree shaking = dead code elimination
es6 is easy to read (named imports, defaults exports)

#### 5.2 the bundler -- webpack
webpack bundle all our assets up into a single file that runs in our target environment, for example the web.
we will configure webpack in a js file (like webpack.config.dev.js)

@see webpack.config.dev.js

#### 5.3 Configure express to use webpack
In our srcServer we import to packages, webpack and the webpack config:

```
import webpack from 'webpack';
import config from '../webpack.config.dev';
```

Then create a compiler using webpack with config:
```
const compiler = webpack(config);
```

To use webpack:
```
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, // no info display
    publicPath: config.output.publicPath // this is a variable in the output object in webpack.config.dev.js
}));

```

#### 5.4 Handle css with webpack
In our webpack config file we added loaders for modules, for js and css
So now we can create some style in a css file. And all we have to do is to
import that css file to our index.js file:

```
import './inedx.css';
```

Webpack parse our style sheet and then use javascript to inject the style onto the page
(Check this in the Network tab using inspection in Chrome etc)

### 6. Sourcemap
Maps code back to original source code, part of our build,
downloaded if you open developer tools (only downloaded when you need it)
We have specified this in the webpack.config.dev.js:

```
devtool: 'inline-source-map'
```

We can use the keyword debugger; in our js code to set a break point

### 7. Linting using eslint
a linter helps you:
enforce consistence curly brace position, confirm/alert, trailing commas, globals, eval
avoid mistakes like: extra parenthesis, overwriting function, assignment in conditional, missing default case in switch, debugger /console.log in production

```
"extends": "eslint: recommended" --> tells eslint to use the recommended rules (warnings and errors)
           "plugin:import/errors" and "plugin:import/warning" --> adds enhanced linting of es6 import syntax
```

```
"parseroption": {
    "ecmaversion": 7 --> using version of javascript 7
    "sourcetype": "module" --> using standard javascript modules
}
```

```
"env": { --> declare some environments that lint should be aware of, like the browser, node, mocha etc
```

```
"rules": { --> any rules we want to override
    "no-console": 1 --> 0 == off, 1 == warning, 2 == error, so if you feel strongly about a rule you can set it to 2, and it will break your build
}
```
to use the lint watch library add i into package.json, for example:
```
"lint": "esw webpack.config.* src buildscripts"
```
@see package.json

### 8. Tests
unit tests --> small units, single functions
    should run every time you hit save (automatic)
integration test --> testing multiple items (clicking and waiting)


### 9. Continuous integration (ci)
"Continuous Integration (CI) is a development practice that requires developers to integrate code into a shared repository several times a day. Each check-in is then verified by an automated build, allowing teams to detect problems early." Let's create a ci server to:
- Run Automated build
- Run your tests
- Check code coverage
- Automate deployment

[Travis](https://travis-ci.org/Addibro/javascript-dev) CI™ for Linux
[Appveyor](https://ci.appveyor.com/project/Addibro/javascript-dev) for Windows

### 10. HTTP calls
We can handle http calls in javascript.
Node can use packages: http (provides basic functionality for making http requests)
and request (higher level library)
Browser can use XMLHttpRequest (old), jQuery (faster and cleaner) and Angular (framework-based) and Fetch
Node and & browser can use isomorphic-fetch, xhr, SuperAgent, Axios

Centralized API calls: configure all calls, handle preloader logic, handle errors, single seam for mocking.

#### 10.1 Mocking HTTP calls
Why Mock http?
- Unit testing
- Instant response
- Keep wokring when service are down
- Rapid prototyping
- Avoid inter-team bottlenecks
- Work offline

How to:
1. Declare our schema:
    - JSON SChema Faker
2. Generate Random Data:
    - faker.js (we'll use this)
    - chance.js
    - randexp.js
3. Server Data via API
    - JSON Server

@see generateMockData.js

Randomized data is helpful, simulates edge cases such as:
1. Empty lists
2. Long lists
3. Long values
4. Testing
5. Filtering
6. Sorting

So let's generate new random mocks data every time we run the app, by adding a "pre" script:
```
"prestart-mockapi": "npm run generate-mock"
```
This will generate our mock data before it runs start mock api. Also, we add this script to our "start" script:
```
"start": "npm-run-all --parallel security-check open-src lint-watch test-watch start-mockapi"
```

And now we need to redirect our app to hit the new mock api instead of that express api call we created earlier:
