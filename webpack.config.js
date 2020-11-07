const path = require(`path`);

module.exports = {
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
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  }
};
