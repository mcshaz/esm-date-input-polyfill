// import Picker from './picker.js';
// import Input from './input.js';
import { supportsDateInput } from './supportsDateInput';

// Run the above code on any <input type="date"> in the document, also on dynamically created ones.
// Check if type="date" is supported.
if(!supportsDateInput()) {
  loadScript('date-input-pollyfill-picker.dist.js', (done) => {
    const init = ()=> {
      Picker.instance = new Picker();
      Input.addPickerToDateInputs();
  
      // This is also on mousedown event so it will capture new inputs that might
      // be added to the DOM dynamically.
      // document.querySelector(`body`).addEventListener(`mousedown`, ()=> {
      //   Input.addPickerToDateInputs();
      // });
    };
  
    if(document.readyState === `complete`) {
      init();
    } else {
      let DOMContentLoaded = false;
  
      document.addEventListener(`DOMContentLoaded`, ()=> {
        DOMContentLoaded = true;
  
        init();
      });
  
      window.addEventListener(`load`, ()=> {
        if(!DOMContentLoaded) {
          init();
        }
      });
    }
  });
}

//would be nicer with promise/await, but more polyfills not required by modern browsers
function loadScript(src, done) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    done();
  };
  js.onerror = function() {
    done(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
}
