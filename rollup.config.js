import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';
import {uglify}  from 'rollup-plugin-uglify';
import sass from 'node-sass'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcss from 'rollup-plugin-postcss'

let pkg = require('./package.json');
let outputFile = pkg.main;

// The plugin Array.
let plugins = [];

// Add postcss to plugins.
let postcssOptions = {
  preprocessor: (content, id) => new Promise((resolve, reject) => {
    const result = sass.renderSync({file: id});
    resolve({code: result.css.toString()});
  }),
  plugins:      [
    autoprefixer
  ],
  sourceMap:    (process.env.BUILD !== 'production'),
  extract:      true,
  extensions:   ['.scss', '.css']
};
if (process.env.BUILD === 'production') {
  postcssOptions.plugins.push(cssnano);
}
plugins.push(postcss(postcssOptions));

// Add babel.
plugins.push(babel(babelrc()));

// Production
if (process.env.BUILD === 'production') {
  outputFile = `${outputFile.slice(0, -3)}.min.js`;
  plugins.push(uglify({
    output: {
      preamble: `/**
 * tutorial.min.js ${pkg.version}
 * MIT licensed
 *
 * Copyright (C) 2018 Fabrizio Meinero, http://imfaber.me
 */`
    }
  }));
}


// Dev
if (process.env.BUILD !== 'production') {
  plugins.push(istanbul({
    exclude: ['test/**/*', 'node_modules/**/*']
  }));
}

export default {
  input:  'src/js/main.js',
  output: {
    file:      outputFile,
    format:    'iife',
    sourceMap: true,
  },
  watch:  {
    include:     'src/**/*',
    clearScreen: false
  },
  plugins
};