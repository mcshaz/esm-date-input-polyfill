import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import sass from 'rollup-plugin-sass';
import 'core-js';
import resolve from '@rollup/plugin-node-resolve';
 import commonjs from '@rollup/plugin-commonjs';

export default /*[{
  input: 'nodep-date-input-polyfill.js',
  output: {
    file: 'nodep-date-input-polyfill.dist.js',
    format: 'iife'// 'iife'
  },
  plugins: [
    babel({
      include: `*.js`,
      exclude: `node_modules/**`,
      presets: [[ '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          targets: '> 0.15%, not dead',
          corejs: 3,
        }]],
    }),
/*    minify({
      comments: false,
      sourceMap: false,
      banner: '//MIT licence - https://github.com/brianblakely/nodep-date-input-polyfill\n'
    }), 
    sass({
      insert: true
    }),
    resolve()
  ],
}, */ {
  input: 'input.js',
  output: {
    file: 'date-input-pollyfill-picker.dist.js',
    format: 'iife',
    name: 'picker'
  },
  plugins: [
    babel({
      // babelrc: false,
      include: `*.js`,
      exclude: `node_modules/**`,
      presets: [[ '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          targets: '> 0.15%, not dead',
          corejs: 3,
        }]],
    }),
/*    minify({
      comments: false,
      sourceMap: false,
      banner: '//MIT licence - https://github.com/brianblakely/nodep-date-input-polyfill\n'
    }), */
    sass({
      insert: true
    }),
    resolve(),
    commonjs()
  ],
}; //];
