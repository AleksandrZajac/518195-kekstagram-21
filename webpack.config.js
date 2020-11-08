const path = require(`path`);
const webpack = require("webpack");

const config = {
  devtool: false,
  entry: [
    "./js/http.js",
    "./js/debounce.js",
    "./js/gallery.js",
    "./js/filter.js",
    "./js/picture.js",
    "./js/photo.js",
    "./js/validate.js",
    "./js/preview.js",
    "./js/form.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.mode = "development";
    config.devtool = "source-map";
    config.devServer = {
      open: true,
      port: 3000,
    };
    config.plugins = [new webpack.HotModuleReplacementPlugin()];
  }

  return config;
};
