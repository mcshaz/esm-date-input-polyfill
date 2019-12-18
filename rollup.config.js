import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import sass from 'rollup-plugin-sass';
import 'core-js';

export default {
  input: 'nodep-date-input-polyfill.js',
  output: {
    file: 'nodep-date-input-polyfill.dist.js',
    format: 'umd'
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
    /*minify({
      comments: false,
      sourceMap: false
    }),*/
    sass({
      insert: true
    })
  ],
};
