const metalsmith = require('metalsmith');
const watch = require('metalsmith-watch');
const webpack = require('metalsmith-webpack')
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const browserSync = require('metalsmith-browser-sync');
const assets = require('metalsmith-assets');
const sass = require('metalsmith-sass');
const webpackConfig = require('./webpack.config.js');

const DEVMODE = process.env.AUTO_RELOAD ? true : false;


const metadataOptions = {
  title: "Static Site",
  description: "#1 test with metalsmith",
  url: "http://abstract.it",
  copyright: "Giorgio Borelli",
}


var config = metalsmith(__dirname)
  .metadata(metadataOptions)
  .source('./pages')
  .use(assets({
      source: './assets',
      destination: './assets'
    })
  )
  .use(markdown())
  .use(layouts({
      engine: "handlebars",
      partials: "snippets",
      directory: "layouts",
      default: "default.html"
    })
  )
  .use(webpack(webpackConfig))

// Hot reload and watch changes and browser sync
if (DEVMODE) {
  config.use(browserSync({
      server : "build",
      files  : [
        "pages/**/*",
        "snippets/**/*",
        "layouts/**/*",
        "js/**/*",
        "styles/**/*"
      ]
    })
  );

}


config.build(function(err) {
  if (err) throw err;
});
