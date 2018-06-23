import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';
import {uglify}  from 'rollup-plugin-uglify';

let pkg = require('./package.json');
let outputFile = pkg.main;

// The plugin Array.
let plugins = [];

// Add babel.
plugins.push(babel(babelrc()));

// Production
if (process.env.BUILD === 'production') {
  outputFile = `${outputFile.slice(0, -3)}.min.js`;
  plugins.push(uglify());
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
    banner: `/**
 * tutorial.min.js ${pkg.version}
 * MIT licensed
 *
 * Copyright (C) 2018 Fabrizio Meinero, http://imfaber.me
 */`,
  },
  watch:  {
    include:     'src/**/*',
    clearScreen: false
  },
  plugins
};