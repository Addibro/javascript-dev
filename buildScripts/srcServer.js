// var express = require('express'); // get express
// var path = require('path'); // reference to path
// var open = require('open'); // reference to open, which we'll use our site in the browser
// var port = 3000; // port to use
// var app = express(); // create an instance of express

// Thanks to babel we can use ES6 syntax instead of node's (above)
import express from 'express';
import path from 'path';
import open from 'open';

// import webpack and webpack config
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
// use webpack with its config
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, { // app.use tells express other things we'd like to use, for example our webpack dev middleware
    noInfo: true, // no info display
    publicPath: config.output.publicPath
}));


app.get('/', function (req, res) {  // "any references to the root should be handled by this function, which takes and request and a response"
    res.sendFile(path.join(__dirname, '../src/index.html'));
    // join together a path to our src dir (index.html)
    // dirname will get us the current directory name that we're currently running in
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
        // if no error, open the application on 'http://localhost:' + port
    }
});
