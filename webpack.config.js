const webpack = require('webpack');
const path = require('path');

//path.resolve creates an absolute path 
let BUILD_DIR = path.resolve(__dirname, 'src/client/public');
let APP_DIR = path.resolve(__dirname, 'src/client/app');

let config = {
  //Starting point for files to babel and minifiy 
  entry: APP_DIR + '/index.jsx',
  output: {
    //directory with my inex.html file which will have a script tag with my minified bundle.js with all I need to run ES6 + JSX on browser
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;

