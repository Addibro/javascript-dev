// once again, since we have babel we can use ES6 features
// import webpack from 'webpack';
import path from 'path';

export default {

    debug: true, // enables some debugging information as we run our build

    devtool: 'inline-source-map',

    noInfo: false, // will display list of all files it's bundling

    entry: [ // entry point of the app (array)
        path.resolve(__dirname, 'src/index')
        // the apps entry point is src/index with the global variable __dirname (part of node)
        // using path package that come with node
    ],

    target: 'web', // could be electron or node if we're running an app in node (so that node could work with it, instead of the browser)

    output: { // here we define where webpack should create our dev bundle
        path: path.resolve(__dirname, 'src'),
        publicPath: '/', // this variable is being referenced in srcServer in app.use method
        filename: 'bundle.js' // this will call our bundle, bundle.js
    }, // webpack wont generate any physical files, creates a bundle in memory and serve it to the browser

    plugins: [], // optionally define plugins to enhance things

    module: { // tells webpack the file types we want to handle (loaders)
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']}, // js etc
            {test: /\.css$/, loaders: ['style', 'css']} // css etc
        ]
    }

};