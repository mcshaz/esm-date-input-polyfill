// some of the code below derived from
// https://github.com/philipwalton/rollup-native-modules-boilerplate/blob/master/rollup.config.js
// which is covered by the Apache 2.0 @licence http://www.apache.org/licenses/LICENSE-2.0
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import 'core-js';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';
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
    // commonjs(),
    postcss({
      extract: false,
      modules: false,
      use: ['sass'],
    }),
    // replace({'process.env.NODE_ENV': JSON.stringify('production')}),
    terser({
      sourcemap: true,
      output: { preamble: '// @license MIT - https://github.com/mcshaz/esm-date-input-polyfill' },
    }),
  ];
  if (buildTarget === buildTargets.browserModule || buildTarget === buildTargets.browserNoModule) {
    const targets = buildTarget === buildTargets.browserNoModule 
      ? { browsers: ['ie 11'] }
      // : { browsers: ['last 2 Chrome versions', 'last 2 Safari versions', 'last 2 iOS versions', 'last 2 Edge versions', 'Firefox ESR' ] };
      : { esmodules: true };
    plugins.push(babel({
        exclude: /node_modules/,
        //extensions: ['.js', '.ts'],
        presets: [['@babel/preset-env', {
          targets,
          useBuiltIns: 'usage',
          debug: false,
          corejs: 3,
        }], /* ['@babel/typescript'] */],
      }));
  } else  { // if (buildTarget === buildTargets.npm)
    plugins.push(typescript());
  }
  return plugins;
}

const moduleConfig = [
  // create ECMAScript Modules library - note ES modules = Node >= 13.2.0
  {
    input: 'src/polyfill-if-required.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      sourcemap: true,
    },
    plugins: [
      ...getRollupBasePlugins({ buildTarget: buildTargets.npm }),
      del({ targets: ['dist/*', 'docs/dist/*'] }),
    ],
  },
  // create Common JS library
  {
    input: 'src/polyfill-if-required.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs.js',
      chunkFileNames: '[name]-[hash].cjs.mjs',
      sourcemap: false,
    },
    plugins: [
      ...getRollupBasePlugins({ buildTarget: buildTargets.npm }),
    ]
  },
  // Legacy config for anyone who wants to insert the <script> and have defined
  // window.nodepDateInputPolyfill
  // to polyfill run window.nodepDateInputPolyfill.polyfillIfRequired()
  {
    input: 'dist/polyfill-if-required.mjs',
    output: {
      file: 'dist/iife/esm-date-input-polyfill.js',
      format: 'iife',
      name: 'dateInputPolyfill',
      sourcemap: true,
    },
    plugins: [
      ...getRollupBasePlugins({ buildTarget: buildTargets.browserNoModule }),
      copy({
        targets: [
          { src: ['dist/iife/esm-date-input-polyfill.js', 'dist/iife/esm-date-input-polyfill.js.map'], dest: 'docs/dist' },
        ],
        hook: 'writeBundle'})
    ],
    inlineDynamicImports: true,
  },
  // create example using library
  // Module config for <script type="module">
  {
    input: 'examples/esm.module.js', // 'examples/src/gest-age.module.js',
    output: {
      dir: 'docs/dist',
      format: 'esm',
      dynamicImportFunction: '__import__',
      sourcemap: true,
    },
    plugins: getRollupBasePlugins({ buildTarget: buildTargets.browserModule }),
  },
  // Legacy config for <script nomodule>
  {
    input: 'examples/esm.nomodule.js',
    output: {
      file: 'docs/dist/esm.nomodule.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: getRollupBasePlugins({ buildTarget: buildTargets.browserNoModule }),
    inlineDynamicImports: true,
  },
  /*
  // Module config for <script type="module">
  {
    input: 'examples/gest-age.module.js',
    output: {
      dir: 'docs/dist',
      format: 'esm',
      dynamicImportFunction: '__import__',
      sourcemap: true,
    },
    plugins: getRollupBasePlugins({ buildTarget: buildTargets.browserModule }),
  },
  // Legacy config for <script nomodule>
  {
    input: 'examples/gest-age.nomodule.js',
    output: {
      file: 'docs/dist/gest-age.nomodule.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: getRollupBasePlugins({ buildTarget: buildTargets.browserNoModule }),
    inlineDynamicImports: true,
  },
  */
];

export default moduleConfig;
