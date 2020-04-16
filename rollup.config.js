// some of the code below derived from
// https://github.com/philipwalton/rollup-native-modules-boilerplate/blob/master/rollup.config.js
// which is covered by the Apache 2.0 @licence http://www.apache.org/licenses/LICENSE-2.0
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import 'core-js';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
// import { eslint } from "rollup-plugin-eslint";
// import path from 'path';

const buildTargets = {
  npm: Symbol("npm"),
  browserNoModule: Symbol("browserNoModule"),
  browserModule: Symbol("browserModule")
};

function getRollupBasePlugins({ buildTarget = buildTargets.npm }) {
  const plugins = [
    resolve(),
    commonjs(),
    postcss({
      extract: false,
      modules: false,
      use: ['sass'],
    }),
    // replace({'process.env.NODE_ENV': JSON.stringify('production')}),
    terser({
      sourcemap: true,
      output: { preamble: '// @license MIT - https://github.com/brianblakely/esm-date-input-polyfill' },
    }),
  ];
  if (buildTarget === buildTargets.browserModule || buildTarget === buildTargets.browserNoModule) {
    const targets = buildTarget === buildTargets.browserNoModule 
      ? { browsers: ['ie 11'] }
      // : { browsers: ['last 2 Chrome versions', 'last 2 Safari versions', 'last 2 iOS versions', 'last 2 Edge versions', 'Firefox ESR' ] };
      : { esmodules: true };
    plugins.push(babel({
        exclude: /node_modules/,
        presets: [['@babel/preset-env', {
          targets,
          useBuiltIns: 'usage',
          debug: false,
          corejs: 3,
        }]],
      }));
  }
  return plugins;
}

const moduleConfig = [
  // create library - note ES modules = Node >= 13.2.0
  {
    input: 'src/polyfill-if-required.js',
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      sourcemap: true,
    },
    plugins: [
      ...getRollupBasePlugins({ buildTarget: buildTargets.npm }),
      del({ targets: 'dist/*' })
    ],
  },
  // create library - note ES modules = Node >= 13.2.0
  {
    input: 'src/polyfill-if-required.js',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs.js',
      chunkFileNames: '[name]-[hash].cjs.mjs',
      sourcemap: false,
    },
    plugins: getRollupBasePlugins({ buildTarget: buildTargets.npm }),
  },
  // Legacy config for anyone who wants to insert the <script> and have defined
  // window.nodepDateInputPolyfill
  // to polyfill run window.nodepDateInputPolyfill.polyfillIfRequired()
  {
    input: 'src/polyfill-if-required.js',
    output: {
      file: 'dist/iife/esm-date-input-polyfill.js',
      format: 'iife',
      name: 'dateInputPolyfill',
      sourcemap: true,
    },
    plugins: getRollupBasePlugins({ buildTarget: buildTargets.browserNoModule }),
    inlineDynamicImports: true,
  },
  // create example using library
  // Module config for <script type="module">
  {
    input: 'examples/src/esm.module.js', // 'examples/src/gest-age.module.js',
    output: {
      dir: 'examples/dist',
      format: 'esm',
      dynamicImportFunction: '__import__',
      sourcemap: true,
    },
    plugins: [
      ...getRollupBasePlugins({ buildTarget: buildTargets.browserModule }),
      del({targets: 'examples/dist/*'}),
    ]
  },
  // Legacy config for <script nomodule>
  {
    input: 'examples/src/esm.nomodule.js',
    output: {
      file: 'examples/dist/esm.nomodule.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: getRollupBasePlugins({ buildTarget: buildTargets.browserNoModule }),
    inlineDynamicImports: true,
  },
  // Module config for <script type="module">
  {
    input: 'examples/src/gest-age.module.js',
    output: {
      dir: 'examples/dist',
      format: 'esm',
      dynamicImportFunction: '__import__',
      sourcemap: true,
    },
    plugins: getRollupBasePlugins({ buildTarget: buildTargets.browserModule }),
  },
  // Legacy config for <script nomodule>
  {
    input: 'examples/src/gest-age.nomodule.js',
    output: {
      file: 'examples/dist/gest-age.nomodule.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: getRollupBasePlugins({ buildTarget: buildTargets.browserNoModule }),
    inlineDynamicImports: true,
  },
];

export default moduleConfig;
