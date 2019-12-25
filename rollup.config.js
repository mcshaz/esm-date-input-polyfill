import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import sass from 'rollup-plugin-sass';
import 'core-js';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [{
  input: 'nodep-date-input-polyfill-required.js',
  output: {
    file: 'dist/nodep-date-input-polyfill-required.dist.js',
    format: 'iife'
  },
  plugins: [
    babel({
      include: `*.js`,
      exclude: `node_modules/**`,
      presets: [[ '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          targets: {ie: "9"}, // '> 0.15%, not dead', currently won't build with this
          corejs: 3,
        }]],
    }),
    minify({
      comments: false,
      sourceMap: false,
      banner: '//MIT licence - https://github.com/brianblakely/nodep-date-input-polyfill\n'
    }),
    sass({
      insert: true
    }),
    resolve()
  ],
}, {
  input: 'addPickers.js',
  output: {
    file: 'dist/nodep-date-input-pollyfill.dist.js',
    format: 'iife',
    name: 'datePolyfill'
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
          targets: {ie: "9" }, //'> 0.15%, not dead',
          corejs: 3,
        }]],
    }),
    minify({
      comments: false,
      sourceMap: false,
      banner: '//MIT licence - https://github.com/brianblakely/nodep-date-input-polyfill\n'
    }),
    sass({
      insert: true
    }),
    resolve(),
    commonjs()
  ],
}];
