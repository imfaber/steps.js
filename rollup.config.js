import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import {uglify}  from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';

let pkg = require('./package.json');
let outputFile = pkg.main;

// The plugin Array.
let plugins = [];

// Add babel.
plugins.push(babel(babelrc()));

// Add rollup-plugin-node-resolve
plugins.push(resolve());

// Production
if (process.env.BUILD === 'production') {
  outputFile = `${outputFile.slice(0, -3)}.min.js`;
  plugins.push(uglify({
    output: {
      comments: function(node, comment) {
        const text = comment.value;
        const type = comment.type;
        if (type === "comment2") {
          // multiline comment
          return /@preserve|@license|@cc_on/i.test(text);
        }
      },
    }
  }));
}

export default {
  input:  'src/js/index.js',
  output: {
    file:      outputFile,
    format:    'iife',
    sourcemap: (process.env.BUILD !== 'production'),
    banner:    `/**
 * steps.min.js ${pkg.version}
 * @license MIT
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