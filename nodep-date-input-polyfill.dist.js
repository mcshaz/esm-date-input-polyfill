(function () {
  'use strict';

  

  function ___$insertStyle(css) {
    if (!css) {
      return;
    }
    if (typeof window === 'undefined') {
      return;
    }

    var style = document.createElement('style');

    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
  }

  // Return false if the browser does not support input[type="date"].
  function supportsDateInput() {
    var input = document.createElement("input");
    input.setAttribute("type", "date");
    var notADateValue = "not-a-date";
    input.setAttribute("value", notADateValue);
    return document.currentScript && !document.currentScript.hasAttribute("data-nodep-date-input-polyfill-debug") && !(input.value === notADateValue);
  }

  // import Picker from './picker.js';
  // Check if type="date" is supported.

  if (!supportsDateInput()) {
    loadScript('date-input-pollyfill-picker.dist.js', function (done) {
      var init = function init() {
        Picker.instance = new Picker();
        Input.addPickerToDateInputs(); // This is also on mousedown event so it will capture new inputs that might
        // be added to the DOM dynamically.
        // document.querySelector(`body`).addEventListener(`mousedown`, ()=> {
        //   Input.addPickerToDateInputs();
        // });
      };

      if (document.readyState === "complete") {
        init();
      } else {
        var DOMContentLoaded = false;
        document.addEventListener("DOMContentLoaded", function () {
          DOMContentLoaded = true;
          init();
        });
        window.addEventListener("load", function () {
          if (!DOMContentLoaded) {
            init();
          }
        });
      }
    });
  } //would be nicer with promise/await, but more polyfills not required by modern browsers


  function loadScript(src, done) {
    var js = document.createElement('script');
    js.src = src;

    js.onload = function () {
      done();
    };

    js.onerror = function () {
      done(new Error('Failed to load script ' + src));
    };

    document.head.appendChild(js);
  }

}());
