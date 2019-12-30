// importing this is a bit of a hack to put the src at the top of the script
import { supportsDateInput } from './supportsDateInput';

// these are not imported as that would include some largish scripts in browsers where it is not necessary
// import addPickers from './addPickers.js';

// Run the above code on any <input type="date"> in the document, also on dynamically created ones.
// Check if type="date" is supported.
if(!supportsDateInput()) {
  loadScript('dist/nodep-date-input-pollyfill.dist.js', (done) => {
    if(document.readyState === `complete`) {
      datePolyfill.addPickers();
    } else {
      let DOMContentLoaded = false;
  
      document.addEventListener(`DOMContentLoaded`, ()=> {
        DOMContentLoaded = true;
        datePolyfill.addPickers();
      });
  
      window.addEventListener(`load`, ()=> {
        if(!DOMContentLoaded) {
          datePolyfill.addPickers();
        }
      });
    }
  });
}

// it would be nicer with promise/await, but more polyfills will be downloaded which are
// not required by modern browsers
function loadScript(src, done) {
  /*
  // document.currentScript not supported in ie11
  if (!~src.indexOf('/') && document.currentScript) {
    const currentScriptSrc = document.currentScript.getAttribute('src');
    if (currentScriptSrc) {
      const slashPos = currentScriptSrc.lastIndexOf('/');
      if (~slashPos) {
        src = currentScriptSrc.substring(0, slashPos + 1) + src;
      }
    }
  }
  */
  var js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    done();
  };
  js.onerror = function() {
    throw new Error('Failed to load script ' + src);
  };
  document.head.appendChild(js);
}
