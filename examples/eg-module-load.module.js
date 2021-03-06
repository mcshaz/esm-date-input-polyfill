import { egModuleLoadPageScript } from './eg-module-load-page-script.js';

import dynamicImportPolyfill from 'dynamic-import-polyfill';

// This needs to be done before any dynamic imports are used.
// If your modules are hosted in a sub-directory, it must be specified here.
dynamicImportPolyfill.initialize({modulePath: 'examples/dist'});

egModuleLoadPageScript();
