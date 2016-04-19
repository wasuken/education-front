/* global module, __dirname */
var webpack = require("webpack");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel" }
        ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
                              )
    ]
};
