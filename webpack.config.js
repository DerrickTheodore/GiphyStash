const webpack = require('webpack');
const path = require('path');

//path.resolve creates an absolute path 
let BUILD_DIR = path.resolve(__dirname, 'src/server/public');
let APP_DIR = path.resolve(__dirname, 'src/client/app');

let config = {
  //Starting point for files to babel and minifiy 
  entry: APP_DIR + '/index.jsx',
  output: {
    //directory with my inex.html file which will have a script tag with my minified bundle.js with all I need to run ES6 + JSX on browser
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    //babel-loader config, test: which file ext. to check, include: which directory to look for these files, loader: name of loader
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        //init had babel here, but ran into compile error. In error message it stated that we had to specify "babel-loader" instead of "babel"
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = config;

