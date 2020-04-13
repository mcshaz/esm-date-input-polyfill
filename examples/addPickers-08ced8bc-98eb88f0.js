import { f as fails, h as has, D as DESCRIPTORS, $, r as require$$0, i as internalObjectKeys, e as enumBugKeys, a as anObject, b as require$$0$1, s as sharedKey, c as hiddenKeys, d as documentCreateElement, g as html, w as wellKnownSymbol, j as requireObjectCoercible, k as createNonEnumerableProperty, l as createPropertyDescriptor, m as setToStringTag, I as Iterators, n as isObject, o as redefine, p as require$$2, t as toIndexedObject, q as classof, u as toPrimitive, V as V8_VERSION, v as toLength, x as toAbsoluteIndex, y as IndexedObject, z as getOwnPropertySymbolsModule, A as propertyIsEnumerableModule, B as global, C as isForced, E as setSpecies, F as require$$1, G as toInteger, H as userAgent, J as speciesConstructor, K as pickerAppliedAttr, L as dateInputIsSupported, M as FindInputsHelper } from './gest-age.module-9af6f2ea.js';

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

var $indexOf = require$$0.indexOf;



var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) require$$0$1.f(O, key = keys[index++], Properties[key]);
  return O;
};

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  require$$0$1.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ( !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis$1 = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  Iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = require$$2.set;
var getInternalState = require$$2.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) require$$0$1.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var SPECIES = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES$1 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$1];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var nativeAssign = Object.assign;
var defineProperty$1 = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
var objectAssign = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty$1({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$1(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
  assign: objectAssign
});

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
	UNSUPPORTED_Y: UNSUPPORTED_Y,
	BROKEN_CARET: BROKEN_CARET
};

var defineProperty$2 = require$$0$1.f;
var getOwnPropertyNames = require$$1.f;





var setInternalState$1 = require$$2.set;



var MATCH$1 = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
  re2[MATCH$1] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegexp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y$1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y$1 && sticky) setInternalState$1(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$2(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

var MATCH$2 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$2] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
var stringRepeat = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

// https://github.com/tc39/proposal-string-pad-start-end




var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = String(requireObjectCoercible($this));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : String(fillString);
    var intMaxLength = toLength(maxLength);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = stringRepeat.call(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

var stringPad = {
  // `String.prototype.padStart` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};

// https://github.com/zloirock/core-js/issues/280


// eslint-disable-next-line unicorn/no-unsafe-regex
var stringPadWebkitBug = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

var $padStart = stringPad.start;


// `String.prototype.padStart` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: stringPadWebkitBug }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

$({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

// TODO: Remove from `core-js@4` since it's moved to entry points







var SPECIES$2 = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$2] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var charAt = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

var max$1 = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regexpExecAbstract(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max$1(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

var arrayPush = [].push;
var min$1 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegexp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min$1(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var ITERATOR$2 = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME in domIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$2] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "date-input-polyfill {\n  background: #fff;\n  color: #000;\n  text-shadow: none;\n  border: 0;\n  padding: 0;\n  height: auto;\n  width: auto;\n  line-height: normal;\n  border-radius: 0;\n  font-family: sans-serif;\n  font-size: 14px;\n  position: absolute !important;\n  text-align: center;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12);\n  cursor: default;\n  z-index: 1; }\n  date-input-polyfill[data-open=\"false\"] {\n    display: none; }\n  date-input-polyfill[data-open=\"true\"] {\n    display: block; }\n  date-input-polyfill select, date-input-polyfill table, date-input-polyfill th, date-input-polyfill td {\n    background: #fff;\n    color: #000;\n    text-shadow: none;\n    border: 0;\n    padding: 0;\n    height: auto;\n    width: auto;\n    line-height: normal;\n    border-radius: 0;\n    font-family: sans-serif;\n    font-size: 14px;\n    box-shadow: none; }\n  date-input-polyfill select, date-input-polyfill button {\n    border: 0;\n    border-bottom: 1px solid #E0E0E0;\n    height: 24px;\n    vertical-align: top; }\n  date-input-polyfill select {\n    width: 50%; }\n    date-input-polyfill select:first-of-type {\n      border-right: 1px solid #E0E0E0;\n      width: 30%; }\n  date-input-polyfill button {\n    padding: 0;\n    width: 20%;\n    background: #E0E0E0; }\n  date-input-polyfill table {\n    border-collapse: collapse; }\n  date-input-polyfill th, date-input-polyfill td {\n    width: 32px;\n    padding: 4px;\n    text-align: center; }\n  date-input-polyfill td[data-day] {\n    cursor: pointer; }\n    date-input-polyfill td[data-day]:hover {\n      background: #E0E0E0; }\n  date-input-polyfill [data-selected] {\n    font-weight: bold;\n    background: #D8EAF6; }\n\ninput[data-has-picker]::-ms-clear {\n  display: none; }\n";
styleInject(css_248z);

class Picker {
  constructor() {
    // This is a singleton.
    if (Picker.instance) {
      return Picker.instance;
    }

    var passiveOpt = {
      passive: true
    };
    this.date = new Date();
    this.input = null;
    this.isOpen = false; // The picker element. Unique tag name attempts to protect against
    // generic selectors.

    this.container = document.createElement("date-input-polyfill"); // Add controls.
    // Year picker.

    this.year = document.createElement("select");
    Picker.createRangeSelect(this.year, this.date.getFullYear() - 80, this.date.getFullYear() + 20);
    this.year.className = "yearSelect";
    this.year.addEventListener("change", () => {
      this.date.setYear(this.year.value);
      this.refreshDaysMatrix();
    }, passiveOpt);
    this.container.appendChild(this.year); // Month picker.

    this.month = document.createElement("select");
    this.month.className = "monthSelect";
    this.month.addEventListener("change", () => {
      this.date.setMonth(this.month.value);
      this.refreshDaysMatrix();
    }, passiveOpt);
    this.container.appendChild(this.month); // Today button.

    this.today = document.createElement("button");
    this.today.textContent = "Today";
    this.today.addEventListener("click", () => {
      this.date = new Date();
      this.setInput();
    }, passiveOpt);
    this.container.appendChild(this.today); // Setup unchanging DOM for days matrix.

    var daysMatrix = document.createElement("table");
    this.daysHead = document.createElement("thead");
    this.days = document.createElement("tbody"); // THIS IS THE BIG PART.
    // When the user clicks a day, set that day as the date.
    // Uses event delegation.

    this.days.addEventListener("click", e => {
      var tgt = e.target;

      if (!tgt.hasAttribute("data-day")) {
        return false;
      }

      var curSel = this.days.querySelector("[data-selected]");

      if (curSel) {
        curSel.removeAttribute("data-selected");
      }

      tgt.setAttribute("data-selected", '');
      this.date.setDate(parseInt(tgt.textContent));
      this.setInput();
    }, passiveOpt);
    daysMatrix.appendChild(this.daysHead);
    daysMatrix.appendChild(this.days);
    this.container.appendChild(daysMatrix);
    this.hide();
    document.body.appendChild(this.container); // Close the picker when clicking outside of a date input or picker.

    document.addEventListener('click', e => {
      var el = e.target;
      var isPicker = el === this.container;

      while (!isPicker && (el = el.parentNode)) {
        isPicker = el === this.container;
      }

      var attr = e.target.getAttribute('type');

      if (attr !== 'date' && attr !== 'date-polyfill' && !isPicker) {
        this.hide();
      }
    }, passiveOpt);
  } // Hide.


  hide() {
    this.container.setAttribute('data-open', this.isOpen = false);
  } // Show.


  show() {
    this.container.setAttribute('data-open', this.isOpen = true);
  } // Position picker below element. Align to element's left edge.


  goto(element) {
    var rekt = element.getBoundingClientRect();
    this.container.style.top = "".concat(rekt.top + rekt.height + (document.documentElement.scrollTop || document.body.scrollTop), "px");
    this.container.style.left = "".concat(rekt.left + (document.documentElement.scrollLeft || document.body.scrollLeft), "px");
    this.show();
  } // Initiate I/O with given date input.


  attachTo(input) {
    if (input === this.input && this.isOpen) {
      return false;
    }

    this.input = input;
    this.sync();
    this.goto(this.input.element);
  } // Match picker date with input date.


  sync() {
    if (this.input.element.valueAsDate) {
      this.date = Picker.absoluteDate(this.input.element.valueAsDate);
    } else {
      this.date = new Date();
    }

    this.year.value = this.date.getFullYear();
    this.month.value = this.date.getMonth();
    this.refreshDaysMatrix();
  } // Match input date with picker date.


  setInput() {
    this.input.element.value = "".concat(this.date.getFullYear(), "-").concat(String(this.date.getMonth() + 1).padStart(2, '0'), "-").concat(String(this.date.getDate()).padStart(2, '0'));
    this.input.element.focus();
    setTimeout(() => {
      // IE wouldn't hide, so in a timeout you go.
      this.hide();
    }, 100);
    this.pingInput();
  }

  refreshLocale() {
    if (this.locale === this.input.locale) {
      return false;
    }

    this.locale = this.input.locale;
    var daysHeadHTML = ["<tr>"];

    for (var i = 0, len = this.input.localeText.days.length; i < len; ++i) {
      daysHeadHTML.push("<th scope=\"col\">".concat(this.input.localeText.days[i], "</th>"));
    }

    this.daysHead.innerHTML = daysHeadHTML.join('');
    Picker.createRangeSelect(this.month, 0, 11, this.input.localeText.months, this.date.getMonth());
    this.today.textContent = this.input.localeText.today;
  }

  refreshDaysMatrix() {
    this.refreshLocale(); // Determine days for this month and year,
    // as well as on which weekdays they lie.

    var year = this.date.getFullYear(); // Get the year (2016).

    var month = this.date.getMonth(); // Get the month number (0-11).

    var startDay = new Date(year, month, 1).getDay(); // First weekday of month (0-6).

    var maxDays = new Date(this.date.getFullYear(), month + 1, 0).getDate(); // Get days in month (1-31).
    // The input's current date.

    var selDate = Picker.absoluteDate(this.input.element.valueAsDate) || false; // Are we in the input's currently-selected month and year?

    var selMatrix = selDate && year === selDate.getFullYear() && month === selDate.getMonth(); // Populate days matrix.

    var matrixHTML = [];

    for (var i = 0; i < maxDays + startDay; ++i) {
      // Add a row every 7 days.
      if (i % 7 === 0) {
        matrixHTML.push("\n          ".concat(i !== 0 ? "</tr>" : '', "\n          <tr>\n        "));
      } // Add new column.
      // If no days from this month in this column, it will be empty.


      if (i + 1 <= startDay) {
        matrixHTML.push("<td></td>");
        continue;
      } // Populate day number.


      var dayNum = i + 1 - startDay;
      var selected = selMatrix && selDate.getDate() === dayNum;
      matrixHTML.push("<td data-day ".concat(selected ? "data-selected" : '', ">\n          ").concat(dayNum, "\n        </td>"));
    }

    this.days.innerHTML = matrixHTML.join('');
  }

  pingInput() {
    // Dispatch DOM events to the input.
    var inputEvent;
    var changeEvent; // Modern event creation.

    try {
      inputEvent = new Event("input");
      changeEvent = new Event("change");
    } // Old-fashioned way.
    catch (e) {
      inputEvent = document.createEvent("KeyboardEvent");
      inputEvent.initEvent("input", true, false);
      changeEvent = document.createEvent("KeyboardEvent");
      changeEvent.initEvent("change", true, false);
    }

    this.input.element.dispatchEvent(inputEvent);
    this.input.element.dispatchEvent(changeEvent);
  }

  static createRangeSelect(theSelect, min, max, namesArray, selectedValue) {
    theSelect.innerHTML = '';

    for (var i = min; i <= max; ++i) {
      var aOption = document.createElement("option");
      theSelect.appendChild(aOption);
      var theText = namesArray ? namesArray[i - min] : i;
      aOption.text = theText;
      aOption.value = i;

      if (i === selectedValue) {
        aOption.selected = "selected";
      }
    }

    return theSelect;
  }

  static absoluteDate(date) {
    return date && new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  }

}

Picker.instance = null; // Localizations for UI text.

function getLocaleFormat(localeNames) {
  var locales = [["D. M. Y", '_dsb_dsb-de_hsb_hsb-de_sk_sk-sk_'], ["D.M.Y", '_az_az-cyrl_az-cyrl-az_az-latn_az-latn-az_ba_ba-ru_be_be-by_bs_bs-cyrl_bs-cyrl-ba_bs-latn_bs-latn-ba_cs_cs-cz_de_de-at_de-ch_de-de_de-li_de-lu_et_et-ee_fi_fi-fi_fr-ch_hy_hy-am_is_is-is_it-ch_ka_ka-ge_kk_kk-kz_ky_ky-kg_mk_mk-mk_nb_nb-no_nn_nn-no_no_ro_ro-ro_ru_ru-ru_se_se-fi_se-no_sl_sl-si_sma-no_smj-no_smn_smn-fi_sms_sms-fi_sr_sr-cyrl_sr-cyrl-ba_sr-cyrl-cs_sr-cyrl-me_sr-cyrl-rs_sr-latn_sr-latn-ba_sr-latn-cs_sr-latn-me_sr-latn-rs_sv-fi_tg_tg-cyrl_tg-cyrl-tj_tk_tk-tm_tr_tr-tr_tt_tt-ru_uk_uk-ua_uz-cyrl_uz-cyrl-uz_'], ["D.M.Y 'г.'", '_bg_bg-bg_'], ["D.M.Y.", '_hr_hr-ba_hr-hr_'], ["D/M Y", '_uz_uz-latn_uz-latn-uz_'], ["D/M/Y", '_am_am-et_ar_ar-ae_ar-bh_ar-eg_ar-iq_ar-jo_ar-kw_ar-lb_ar-ly_ar-om_ar-qa_ar-sa_ar-sy_ar-ye_br_br-fr_ca_ca-es_co_co-fr_cy_cy-gb_dv_dv-mv_el_el-gr_en-au_en-bz_en-ca_en-gb_en-ie_en-jm_en-my_en-nz_en-sg_en-tt_es_es-ar_es-bo_es-co_es-cr_es-do_es-ec_es-es_es-gt_es-hn_es-mx_es-ni_es-pe_es-pr_es-py_es-sv_es-uy_es-ve_fr_fr-be_fr-fr_fr-lu_fr-mc_ga_ga-ie_gd_gd-gb_gl_gl-es_gsw_gsw-fr_ha_ha-latn_ha-latn-ng_he_he-il_id_id-id_ig_ig-ng_it_it-it_iu_iu-cans_iu-cans-ca_iu-latn_iu-latn-ca_lb_lb-lu_lo_lo-la_mi_mi-nz_ms_ms-bn_ms-my_mt_mt-mt_nl-be_oc_oc-fr_prs_prs-af_ps_ps-af_pt_pt-br_qut_qut-gt_quz_quz-bo_quz-ec_quz-pe_rm_rm-ch_syr_syr-sy_th_th-th_ur_ur-pk_vi_vi-vn_wo_wo-sn_yo_yo-ng_zh-cht_zh-hant_zh-hk_zh-mo_zh-sg_'], ["D-M-Y", '_ar-dz_ar-ma_arn_arn-cl_ar-tn_as_as-in_bn_bn-bd_bn-in_da_da-dk_en-in_es-cl_fo_fo-fo_fy_fy-nl_gu_gu-in_hi_hi-in_kl_kl-gl_kn_kn-in_kok_kok-in_ml_ml-in_mr_mr-in_nl_nl-nl_or_or-in_pa_pa-in_pt-pt_sa_sa-in_ta_ta-in_te_te-in_tzm_tzm-latn_tzm-latn-dz_'], ["M.D.Y", '_sah_sah-ru_'], ["M/D/Y", '_en_en-029_en-ph_en-us_en-zw_es-pa_es-us_fa_fa-ir_fil_fil-ph_moh_moh-ca_ne_ne-np_rw_rw-rw_sw_sw-ke_'], ["Y.M.D", '_lt_lt-lt_mn_mn-cyrl_mn-mn_'], ["Y.M.D.", '_hu_hu-hu_lv_lv-lv_'], ["Y/M/D", '_af_af-za_bo_bo-cn_en-za_eu_eu-es_ii_ii-cn_ja_ja-jp_mn-mong_mn-mong-cn_nso_nso-za_tn_tn-za_xh_xh-za_zh_zh-chs_zh-cn_zh-hans_zh-tw_zu_zu-za_'], ["Y-M-D", '_fr-ca_km_km-kh_ko_ko-kr_pl_pl-pl_se-se_si_si-lk_sma_sma-se_smj_smj-se_sq_sq-al_sv_sv-se_ug_ug-cn_']];
  var localeCpy = localeNames.map(l => l.toLowerCase());

  var _loop = function _loop(i) {
    var srchStr = '_' + localeCpy[i] + '_';
    var found = locales.find(l => l[1].includes(srchStr));

    if (found) {
      return {
        v: {
          locale: localeCpy[i],
          format: found[0],
          parseLocale: parseFromFormat(found[0])
        }
      };
    }

    var decrSpec = decreaseLocaleSpecificity(localeCpy[i]);

    if (decrSpec) {
      localeCpy.push(decrSpec);
    }
  };

  for (var i = 0; i < localeCpy.length; ++i) {
    var _ret = _loop(i);

    if (typeof _ret === "object") return _ret.v;
  }

  var format = "Y-M-D";
  return {
    locale: "en",
    format,
    parseLocale: parseFromFormat(format)
  };
}

function decreaseLocaleSpecificity(localeName) {
  var returnVar = localeName.replace(/-[a-z0-9]+$/, '');

  if (!returnVar || returnVar === localeName) {
    return null;
  }

  return returnVar;
}

function parseFromFormat(format) {
  var yPos = format.indexOf('Y');
  var mPos = format.indexOf('M');
  var dPos; // only 3 permutaions in use: DMY, YMD & MDY

  if (yPos < mPos) {
    yPos = 1;
    mPos = 2;
    dPos = 3;
  } else {
    yPos = 3;
    dPos = format.indexOf('D');

    if (dPos < mPos) {
      dPos = 1;
      mPos = 2;
    } else {
      mPos = 1;
      dPos = 2;
    }
  }

  format = format.replace(/\./g, '\\.').replace('Y', '([12]\\d{3})').replace('M', '([01]?\\d)').replace('D', '([0-3]?\\d)');
  var localeDtRx = new RegExp(format);
  return dtStr => {
    var dateMatch = localeDtRx.exec(dtStr);

    if (!dateMatch) {
      return null;
    }

    var yr = parseInt(dateMatch[yPos], 10);
    var mth = parseInt(dateMatch[mPos], 10) - 1;
    var dt = parseInt(dateMatch[dPos], 10);
    var returnVar = new Date(yr, mth, dt);

    if (returnVar.getFullYear() !== yr || returnVar.getMonth() !== mth || returnVar.getDate() !== dt) {
      return null;
    }

    return returnVar;
  };
}

function getLanguageInfo(localeNames) {
  var languages = getLanguages();
  var fmt = getLocaleFormat(localeNames);
  var language;
  var l = fmt.locale;

  while (!(language = languages[l])) {
    l = decreaseLocaleSpecificity(l);
  }

  if (!language) {
    language = languages['en']; // shouldn't get to here - possibly throw an error?
  }

  return Object.assign(fmt, language);
}

function getLanguages() {
  return {
    ar: {
      // Arabic
      today: "اليوم",
      days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      months: ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"]
    },
    bg: {
      // Bulgarian
      today: "днес",
      days: ["нед", "пон", "вт", "ср", "четв", "пет", "съб"],
      months: ["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември"]
    },
    ca: {
      // Catalan
      today: "avui",
      days: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
      months: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"]
    },
    cs: {
      // Czech
      today: "dnes",
      days: ["ne", "po", "út", "st", "čt", "pá", "so"],
      months: ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"]
    },
    da: {
      // Danish
      today: "i dag",
      days: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
      months: ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"]
    },
    de: {
      // German
      today: "heute",
      days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    },
    el: {
      // Greek
      today: "σήμερα",
      days: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],
      months: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"]
    },
    en: {
      // English
      today: "today",
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    es: {
      // Spanish
      today: "hoy",
      days: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    },
    fi: {
      // Finnish
      today: "tänään",
      days: ["su", "ma", "ti", "ke", "to", "pe", "la"],
      months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"]
    },
    fr: {
      // French
      today: "aujourd'hui",
      days: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
    },
    he: {
      // Hebrew
      today: "היום",
      days: ["יום א", "יום ב", "יום ג", "יום ד", "יום ה", "יום ו", "שבת"],
      months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
    },
    hu: {
      // Hungarian
      today: "Ma",
      days: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
      months: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"]
    },
    is: {
      // Icelandic
      today: "Í dag",
      days: ["sun.", "mán.", "þri.", "mið.", "fim.", "fös.", "lau."],
      months: ["janúar", "febrúar", "mars", "apríl", "maí", "júní", "júlí", "ágúst", "september", "október", "nóvember", "desember"]
    },
    it: {
      // Italian
      today: "oggi",
      days: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
      months: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
    },
    ja: {
      // Japanese
      today: "今日",
      days: ["日", "月", "火", "水", "木", "金", "土"],
      months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },
    ko: {
      // Korean
      today: "오늘",
      days: ["일", "월", "화", "수", "목", "금", "토"],
      months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
    },
    nl: {
      // Dutch
      today: "vandaag",
      days: ["zo", "ma", "di", "wo", "do", "vr", "za"],
      months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]
    },
    no: {
      // Norwegian
      today: "i dag",
      days: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
      months: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"]
    },
    pl: {
      // Polish
      today: "dzisiaj",
      days: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
      months: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"]
    },
    pt: {
      // Portuguese
      today: "hoje",
      days: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      months: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    },
    rm: {
      // Romansh
      today: "oz",
      days: ["du", "gli", "ma", "me", "gie", "ve", "so"],
      months: ["schaner", "favrer", "mars", "avrigl", "matg", "zercladur", "fanadur", "avust", "settember", "october", "november", "december"]
    },
    ro: {
      // Romanian
      today: "astăzi",
      days: ["D", "L", "Ma", "Mi", "J", "V", "S"],
      months: ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"]
    },
    ru: {
      // Russian
      today: "Cегодня",
      days: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    },
    hr: {
      // Croatian
      today: "danas",
      days: ["ned", "pon", "uto", "sri", "čet", "pet", "sub"],
      months: ["siječanj", "veljača", "ožujak", "travanj", "svibanj", "lipanj", "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac"]
    },
    sk: {
      // Slovak
      today: "dnes",
      days: ["ne", "po", "ut", "st", "št", "pi", "so"],
      months: ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"]
    },
    sq: {
      // Albanian
      today: "sot",
      days: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht"],
      months: ["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor"]
    },
    sv: {
      // Swedish
      today: "i dag",
      days: ["sö", "må", "ti", "on", "to", "fr", "lö"],
      months: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"]
    },
    th: {
      // Thai
      today: "ในวันนี้",
      days: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
      months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
    },
    tr: {
      // Turkish
      today: "bugün",
      days: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
      months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    },
    ur: {
      // Urdu
      today: "آج",
      days: ["اتوار", "پير", "منگل", "بدھ", "جمعرات", "جمعه", "هفته"],
      months: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"]
    },
    id: {
      // Indonesian
      today: "hari ini",
      days: ["Minggu", "Sen", "Sel", "Rabu", "Kamis", "Jumat", "Sabtu"],
      months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]
    },
    uk: {
      // Ukrainian
      today: "сьогодні",
      days: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"]
    },
    be: {
      // Belarusian
      today: "сёння",
      days: ["нд", "пн", "аў", "ср", "чц", "пт", "сб"],
      months: ["Студзень", "Люты", "Сакавік", "Красавік", "Май", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"]
    },
    sl: {
      // Slovenian
      today: "danes",
      days: ["ned", "pon", "tor", "sre", "čet", "pet", "sob"],
      months: ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"]
    },
    et: {
      // Estonian
      today: "täna",
      days: ["P", "E", "T", "K", "N", "R", "L"],
      months: ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"]
    },
    lv: {
      // Latvian
      today: "šodien",
      days: ["sv", "pr", "ot", "tr", "ce", "pk", "se"],
      months: ["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris"]
    },
    lt: {
      // Lithuanian
      today: "šiandien",
      days: ["Sk", "Pr", "An", "Tr", "Kt", "Pn", "Št"],
      months: ["sausis", "vasaris", "kovas", "balandis", "gegužė", "birželis", "liepa", "rugpjūtis", "rugsėjis", "spalis", "lapkritis", "gruodis"]
    },
    tg: {
      // Tajik
      today: "имрӯз",
      days: ["Яш", "Дш", "Сш", "Чш", "Пш", "Ҷм", "Шн"],
      months: ["Январ", "Феврал", "Март", "Апрел", "Май", "Июн", "Июл", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр"]
    },
    fa: {
      // Persian
      today: "امروز",
      days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      months: ["جانفييه", "فيفرييه", "مارس", "أفريل", "مي", "جوان", "جوييه", "أوت", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"]
    },
    vi: {
      // Vietnamese
      today: "hôm nay",
      days: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
      months: ["Tháng Giêng", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"]
    },
    hy: {
      // Armenian
      today: "այսօր",
      days: ["Կիր", "Երկ", "Երք", "Չրք", "Հնգ", "ՈՒր", "Շբթ"],
      months: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"]
    },
    az: {
      // Azeri
      today: "bugün",
      days: ["B", "Be", "Ça", "Ç", "Ca", "C", "Ş"],
      months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"]
    },
    eu: {
      // Basque
      today: "gaur",
      days: ["ig.", "al.", "as.", "az.", "og.", "or.", "lr."],
      months: ["urtarrila", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", "urria", "azaroa", "abendua"]
    },
    hsb: {
      // Upper Sorbian
      today: "dźensa",
      days: ["nje", "pón", "wut", "srj", "štw", "pja", "sob"],
      months: ["januar", "februar", "měrc", "apryl", "meja", "junij", "julij", "awgust", "september", "oktober", "nowember", "december"]
    },
    mk: {
      // Macedonian (FYROM)
      today: "денес",
      days: ["нед", "пон", "втр", "срд", "чет", "пет", "саб"],
      months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"]
    },
    tn: {
      // Setswana
      today: "Gompieno",
      days: ["Ltp.", "Mos.", "Lbd.", "Lbr.", "Lbn.", "Lbt.", "Lmt."],
      months: ["Ferikgong", "Tlhakole", "Mopitloe", "Moranang", "Motsheganong", "Seetebosigo", "Phukwi", "Phatwe", "Lwetse", "Diphalane", "Ngwanatsele", "Sedimothole"]
    },
    xh: {
      // isiXhosa
      today: "namhlanje",
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["Mqungu", "Mdumba", "Kwindla", "Tshazimpuzi", "Canzibe", "Silimela", "Khala", "Thupha", "Msintsi", "Dwarha", "Nkanga", "Mnga"]
    },
    zu: {
      // isiZulu
      today: "namhlanje",
      days: ["Son.", "Mso.", "Bi.", "Tha.", "Ne.", "Hla.", "Mgq."],
      months: ["uMasingana", "uNhlolanja", "uNdasa", "uMbaso", "uNhlaba", "uNhlangulana", "uNtulikazi", "uNcwaba", "uMandulo", "uMfumfu", "uLwezi", "uZibandlela"]
    },
    af: {
      // Afrikaans
      today: "vandag",
      days: ["Son", "Maan", "Dins", "Woen", "Dond", "Vry", "Sat"],
      months: ["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember"]
    },
    ka: {
      // Georgian
      today: "დღეს",
      days: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"],
      months: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"]
    },
    fo: {
      // Faroese
      today: "í dag",
      days: ["sun", "mán", "týs", "mik", "hós", "frí", "leyg"],
      months: ["januar", "februar", "mars", "apríl", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"]
    },
    hi: {
      // Hindi
      today: "आज",
      days: ["रवि.", "सोम.", "मंगल.", "बुध.", "गुरु.", "शुक्र.", "शनि."],
      months: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्तूबर", "नवम्बर", "दिसम्बर"]
    },
    mt: {
      // Maltese
      today: "illum",
      days: ["Ħad", "Tne", "Tli", "Erb", "Ħam", "Ġim", "Sib"],
      months: ["Jannar", "Frar", "Marzu", "April", "Mejju", "Ġunju", "Lulju", "Awissu", "Settembru", "Ottubru", "Novembru", "Diċembru"]
    },
    se: {
      // Sami (Northern)
      today: "odne",
      days: ["sotn", "vuos", "maŋ", "gask", "duor", "bear", "láv"],
      months: ["ođđajagemánnu", "guovvamánnu", "njukčamánnu", "cuoŋománnu", "miessemánnu", "geassemánnu", "suoidnemánnu", "borgemánnu", "čakčamánnu", "golggotmánnu", "skábmamánnu", "juovlamánnu"]
    },
    ga: {
      // Irish
      today: "inniu",
      days: ["Domh", "Luan", "Máir", "Céad", "Déar", "Aoi", "Sath"],
      months: ["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig"]
    },
    ms: {
      // Malay
      today: "hari ini",
      days: ["Ahad", "Isnin", "Sel", "Rabu", "Khamis", "Jumaat", "Sabtu"],
      months: ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"]
    },
    kk: {
      // Kazakh
      today: "бүгін",
      days: ["Жк", "Дс", "Сс", "Ср", "Бс", "Жм", "Сн"],
      months: ["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"]
    },
    ky: {
      // Kyrgyz
      today: "бүгүн",
      days: ["Жш", "Дш", "Шш", "Шр", "Бш", "Жм", "Иш"],
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    },
    sw: {
      // Kiswahili
      today: "leo",
      days: ["Jumap.", "Jumat.", "Juman.", "Jumat.", "Alh.", "Iju.", "Jumam."],
      months: ["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Decemba"]
    },
    tk: {
      // Turkmen
      today: "bugün",
      days: ["Db", "Sb", "Çb", "Pb", "An", "Şb", "Ýb"],
      months: ["Ýanwar", "Fewral", "Mart", "Aprel", "Maý", "lýun", "lýul", "Awgust", "Sentýabr", "Oktýabr", "Noýabr", "Dekabr"]
    },
    uz: {
      // Uzbek
      today: "Bugun",
      days: ["yak.", "dsh.", "sesh.", "chr.", "psh.", "jm.", "sh."],
      months: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"]
    },
    tt: {
      // Tatar
      today: "бүген",
      days: ["Якш", "Дүш", "Сиш", "Чәрш", "Пәнҗ", "Җом", "Шим"],
      months: ["Гыйнвар", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    },
    bn: {
      // Bengali
      today: "আজ",
      days: ["রবি.", "সোম.", "মঙ্গল.", "বুধ.", "বৃহস্পতি.", "শুক্র.", "শনি."],
      months: ["জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"]
    },
    pa: {
      // Punjabi
      today: "ਅੱਜ",
      days: ["ਐਤ.", "ਸੋਮ.", "ਮੰਗਲ.", "ਬੁੱਧ.", "ਵੀਰ.", "ਸ਼ੁਕਰ.", "ਸ਼ਨਿੱਚਰ."],
      months: ["ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ"]
    },
    gu: {
      // Gujarati
      today: "આજે",
      days: ["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"],
      months: ["જાન્યુઆરી", "ફેબ્રુઆરી", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટેમ્બર", "ઑક્ટ્બર", "નવેમ્બર", "ડિસેમ્બર"]
    },
    or: {
      // Oriya
      today: "ଆଜି",
      days: ["ରବି.", "ସୋମ.", "ମଙ୍ଗଳ.", "ବୁଧ.", "ଗୁରୁ.", "ଶୁକ୍ର.", "ଶନି."],
      months: ["ଜାନୁୟାରୀ", "ଫ୍ରେବୃୟାରୀ", "ମାର୍ଚ୍ଚ", "ଏପ୍ରିଲ୍‌", "ମେ", "ଜୁନ୍‌", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "(ଡିସେମ୍ବର"]
    },
    ta: {
      // Tamil
      today: "இன்று",
      days: ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"],
      months: ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"]
    },
    te: {
      // Telugu
      today: "నేడు",
      days: ["ఆది.", "సోమ.", "మంగళ.", "బుధ.", "గురు.", "శుక్ర.", "శని."],
      months: ["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"]
    },
    kn: {
      // Kannada
      today: "ಇಂದು",
      days: ["ಭಾನು.", "ಸೋಮ.", "ಮಂಗಳ.", "ಬುಧ.", "ಗುರು.", "ಶುಕ್ರ.", "ಶನಿ."],
      months: ["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಎಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"]
    },
    ml: {
      // Malayalam
      today: "ഇന്ന്",
      days: ["ഞായർ.", "തിങ്കൾ.", "ചൊവ്വ.", "ബുധൻ.", "വ്യാഴം.", "വെള്ളി.", "ശനി."],
      months: ["ജനുവരി", "ഫെബ്റുവരി", "മാറ്ച്ച്", "ഏപ്റില്", "മെയ്", "ജൂണ്", "ജൂലൈ", "ഓഗസ്ററ്", "സെപ്ററംബറ്", "ഒക്ടോബറ്", "നവംബറ്", "ഡിസംബറ്"]
    },
    as: {
      // Assamese
      today: "আজি",
      days: ["সোম.", "মঙ্গল.", "বুধ.", "বৃহ.", "শুক্র.", "শনি.", "ৰবি."],
      months: ["জানুৱাৰী", "ফেব্রুৱাৰী", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগষ্ট", "চেপ্টেম্বর", "অক্টোবর", "নবেম্বর", "ডিচেম্বর"]
    },
    mr: {
      // Marathi
      today: "आज",
      days: ["रवि.", "सोम.", "मंगळ.", "बुध.", "गुरु.", "शुक्र.", "शनि."],
      months: ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"]
    },
    sa: {
      // Sanskrit
      today: "अद्य",
      days: ["रविवासरः", "सोमवासरः", "मङ्गलवासरः", "बुधवासरः", "गुरुवासरः", "शुक्रवासरः", "शनिवासरः"],
      months: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्तूबर", "नवम्बर", "दिसम्बर"]
    },
    mn: {
      // Mongolian
      today: "өнөөдөр",
      days: ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"],
      months: ["1 дүгээр сар", "2 дугаар сар", "3 дугаар сар", "4 дүгээр сар", "5 дугаар сар", "6 дугаар сар", "7 дугаар сар", "8 дугаар сар", "9 дүгээр сар", "10 дугаар сар", "11 дүгээр сар", "12 дугаар сар"]
    },
    bo: {
      // Tibetan
      today: "ད་རིང",
      days: ["ཉི་མ།", "ཟླ་བ།", "མིག་དམར།", "ལྷག་པ།", "ཕུར་བུ།", "པ་སངས།", "སྤེན་པ།"],
      months: ["སྤྱི་ཟླ་དང་པོ།", "སྤྱི་ཟླ་གཉིས་པ།", "སྤྱི་ཟླ་གསུམ་པ།", "སྤྱི་ཟླ་བཞི་པ།", "སྤྱི་ཟླ་ལྔ་པ།", "སྤྱི་ཟླ་དྲུག་པ།", "སྤྱི་ཟླ་བདུན་པ།", "སྤྱི་ཟླ་བརྒྱད་པ།", "སྤྱི་ཟླ་དགུ་པ།", "སྤྱི་ཟླ་བཅུ་པོ།", "སྤྱི་ཟླ་བཅུ་གཅིག་པ།", "སྤྱི་ཟླ་བཅུ་གཉིས་པ།"]
    },
    cy: {
      // Welsh
      today: "heddiw",
      days: ["Sul", "Llun", "Maw", "Mer", "Iau", "Gwe", "Sad"],
      months: ["Ionawr", "Chwefror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorffennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr"]
    },
    km: {
      // Khmer
      today: "ថ្ងៃនេះ",
      days: ["អាទិ.", "ច.", "អ.", "ពុ", "ព្រហ.", "សុ.", "ស."],
      months: ["មករា", "កុម្ភៈ", "មិនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"]
    },
    lo: {
      // Lao
      today: "ໃນມື້ນີ້",
      days: ["ອາທິດ", "ຈັນ", "ອັງຄານ", "ພຸດ", "ພະຫັດ", "ສຸກ", "ເສົາ"],
      months: ["ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ", "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", "ພະຈິກ", "ທັນວາ"]
    },
    gl: {
      // Galician
      today: "hoxe",
      days: ["dom", "luns", "mar", "mér", "xov", "ven", "sáb"],
      months: ["xaneiro", "febreiro", "marzo", "abril", "maio", "xuño", "xullo", "agosto", "setembro", "outubro", "novembro", "decembro"]
    },
    kok: {
      // Konkani
      today: "आजि",
      days: ["आय.", "सोम.", "मंगळ.", "बुध.", "बिरे.", "सुक्र.", "शेन."],
      months: ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोवेम्बर", "डिसेंबर"]
    },
    syr: {
      // Syriac
      today: "ܝܘܡܐ",
      days: ["܏ܐ ܏ܒܫ", "܏ܒ ܏ܒܫ", "܏ܓ ܏ܒܫ", "܏ܕ ܏ܒܫ", "܏ܗ ܏ܒܫ", "܏ܥܪܘܒ", "܏ܫܒ"],
      months: ["ܟܢܘܢ ܐܚܪܝ", "ܫܒܛ", "ܐܕܪ", "ܢܝܣܢ", "ܐܝܪ", "ܚܙܝܪܢ", "ܬܡܘܙ", "ܐܒ", "ܐܝܠܘܠ", "ܬܫܪܝ ܩܕܝܡ", "ܬܫܪܝ ܐܚܪܝ", "ܟܢܘܢ ܩܕܝܡ"]
    },
    si: {
      // Sinhala
      today: "අද",
      days: ["ඉරිදා", "සඳුදා", "කුජදා", "බුදදා", "ගුරුදා", "කිවිදා", "ශනිදා"],
      months: ["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අ‌ප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අ‌ගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"]
    },
    iu: {
      // Inuktitut
      today: "ullumi",
      days: ["Nat", "Nag", "Aip", "Pi", "Sit", "Tal", "Siv"],
      months: ["Jaannuari", "Viivvuari", "Maatsi", "Iipuri", "Mai", "Juuni", "Julai", "Aaggiisi", "Sitipiri", "Utupiri", "Nuvipiri", "Tisipiri"]
    },
    am: {
      // Amharic
      today: "ዛሬ",
      days: ["እሑድ", "ሰኞ", "ማክሰ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"],
      months: ["ጃንዩወሪ", "ፌብሩወሪ", "ማርች", "ኤፕረል", "ሜይ", "ጁን", "ጁላይ", "ኦገስት", "ሴፕቴምበር", "ኦክተውበር", "ኖቬምበር", "ዲሴምበር"]
    },
    tzm: {
      // Tamazight
      today: "assa",
      days: ["Ace", "Ari", "Ara", "Aha", "Amh", "Sem", "Sed"],
      months: ["Yenayer", "Furar", "Maghres", "Yebrir", "Mayu", "Yunyu", "Yulyu", "Ghuct", "Cutenber", "Ktuber", "Wambir", "Dujanbir"]
    },
    ne: {
      // Nepali
      today: "आज",
      days: ["आइत", "सोम", "मङ्गल", "बुध", "बिही", "शुक्र", "शनि"],
      months: ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जून", "जुलाई", "अगस्त", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"]
    },
    fy: {
      // Frisian
      today: "hjoed",
      days: ["Sn", "Mo", "Ti", "Wo", "To", "Fr", "Sn"],
      months: ["jannewaris", "febrewaris", "maart", "april", "maaie", "juny", "july", "augustus", "septimber", "oktober", "novimber", "desimber"]
    },
    ps: {
      // Pashto
      today: "نن ورځ",
      days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      months: ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"]
    },
    fil: {
      // Filipino
      today: "ngayon",
      days: ["Lin", "Lun", "Mar", "Mier", "Hueb", "Bier", "Saba"],
      months: ["Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", "Agosto", "Septyembre", "Oktubre", "Nobyembre", "Disyembre"]
    },
    dv: {
      // Divehi
      today: "މިއަދު",
      days: ["އާދީއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"],
      months: ["މުޙައްރަމް", "ޞަފަރު", "ރަބީޢުލްއައްވަލް", "ރަބީޢުލްއާޚިރު", "ޖުމާދަލްއޫލާ", "ޖުމާދަލްއާޚިރާ", "ރަޖަބް", "ޝަޢްބާން", "ރަމަޟާން", "ޝައްވާލް", "ޛުލްޤަޢިދާ", "ޛުލްޙިއްޖާ"]
    },
    ha: {
      // Hausa
      today: "yau",
      days: ["Lah", "Lit", "Tal", "Lar", "Alh", "Jum", "Asa"],
      months: ["Januwaru", "Febreru", "Maris", "Afrilu", "Mayu", "Yuni", "Yuli", "Agusta", "Satumba", "Oktocba", "Nuwamba", "Disamba"]
    },
    yo: {
      // Yoruba
      today: "loni",
      days: ["Aik", "Aje", "Ise", "Ojo", "Ojo", "Eti", "Aba"],
      months: ["Osu kinni", "Osu keji", "Osu keta", "Osu kerin", "Osu karun", "Osu kefa", "Osu keje", "Osu kejo", "Osu kesan", "Osu kewa", "Osu kokanla", "Osu keresi"]
    },
    quz: {
      // Quechua
      today: "kunan",
      days: ["int", "kil", "ati", "quy", "Ch'", "Ill", "k'u"],
      months: ["Qulla puquy", "Hatun puquy", "Pauqar waray", "ayriwa", "Aymuray", "Inti raymi", "Anta Sitwa", "Qhapaq Sitwa", "Uma raymi", "Kantaray", "Ayamarq'a", "Kapaq Raymi"]
    },
    nso: {
      // Sesotho sa Leboa
      today: "Lehono",
      days: ["Lam", "Moš", "Lbb", "Lbr", "Lbn", "Lbh", "Mok"],
      months: ["Pherekgong", "Hlakola", "Mopitlo", "Moranang", "Mosegamanye", "Ngoatobošego", "Phuphu", "Phato", "Lewedi", "Diphalana", "Dibatsela", "Manthole"]
    },
    ba: {
      // Bashkir
      today: "бөгөн",
      days: ["Йш", "Дш", "Шш", "Шр", "Кс", "Йм", "Шб"],
      months: ["ғинуар", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
    },
    lb: {
      // Luxembourgish
      today: "haut",
      days: ["Son", "Méi", "Dën", "Mët", "Don", "Fre", "Sam"],
      months: ["Januar", "Februar", "Mäerz", "Abrëll", "Mee", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    },
    kl: {
      // Greenlandic
      today: "ullumi",
      days: ["sap", "ata", "mar", "ping", "sis", "tal", "arf"],
      months: ["januari", "februari", "martsi", "apriili", "maaji", "juni", "juli", "aggusti", "septembari", "oktobari", "novembari", "decembari"]
    },
    ig: {
      // Igbo
      today: "taa",
      days: ["Aik", "Aje", "Ise", "Ojo", "Ojo", "Eti", "Aba"],
      months: ["Onwa mbu", "Onwa ibua", "Onwa ato", "Onwa ano", "Onwa ise", "Onwa isi", "Onwa asa", "Onwa asato", "Onwa itolu", "Onwa iri", "Onwa iri n'ofu", "Onwa iri n'ibua"]
    },
    ii: {
      // Yi
      today: "ꀃꑍ",
      days: ["ꑭꆏ", "ꆏ꒔", "ꆏꑍ", "ꆏꌕ", "ꆏꇖ", "ꆏꉬ", "ꆏꃘ"],
      months: ["ꋍꆪ", "ꑍꆪ", "ꌕꆪ", "ꇖꆪ", "ꉬꆪ", "ꃘꆪ", "ꏃꆪ", "ꉆꆪ", "ꈬꆪ", "ꊰꆪ", "ꊯꊪꆪ", "ꊰꑋꆪ"]
    },
    arn: {
      // Mapudungun
      today: "fachantü",
      days: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    },
    moh: {
      // Mohawk
      today: "okàra",
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["Tsothohrkó:Wa", "Enniska", "Enniskó:Wa", "Onerahtókha", "Onerahtohkó:Wa", "Ohiari:Ha", "Ohiarihkó:Wa", "Seskéha", "Seskehkó:Wa", "Kenténha", "Kentenhkó:Wa", "Tsothóhrha"]
    },
    br: {
      // Breton
      today: "hiziv",
      days: ["Sul", "Lun", "Meu.", "Mer.", "Yaou", "Gwe.", "Sad."],
      months: ["Genver", "C'hwevrer", "Meurzh", "Ebrel", "Mae", "Mezheven", "Gouere", "Eost", "Gwengolo", "Here", "Du", "Kerzu"]
    },
    ug: {
      // Uyghur
      today: "bügün",
      days: ["يە", "دۈ", "سە", "چا", "پە", "جۈ", "شە"],
      months: ["1-ئاي", "2-ئاي", "3-ئاي", "4-ئاي", "5-ئاي", "6-ئاي", "7-ئاي", "8-ئاي", "9-ئاي", "10-ئاي", "11-ئاي", "12-ئاي"]
    },
    mi: {
      // Maori
      today: "i tenei ra",
      days: ["Ta", "Hi", "Tū", "Apa", "Pa", "Me", "Ho"],
      months: ["Kohi-tātea", "Hui-tanguru", "Poutū-te-rangi", "Paenga-whāwhā", "Haratua", "Pipiri", "Hōngongoi", "Here-turi-kōkā", "Mahuru", "Whiringa-ā-nuku", "Whiringa-ā-rangi", "Hakihea"]
    },
    oc: {
      // Occitan
      today: "uèi",
      days: ["dim.", "lun.", "mar.", "mèc.", "jòu.", "ven.", "sab."],
      months: ["genier", "febrier", "març", "abril", "mai", "junh", "julh", "agost", "setembre", "octobre", "novembre", "desembre"]
    },
    co: {
      // Corsican
      today: "oghje",
      days: ["dum.", "lun.", "mar.", "mer.", "ghj.", "ven.", "sab."],
      months: ["ghjennaghju", "ferraghju", "marzu", "aprile", "maghju", "ghjunghju", "lugliu", "aostu", "settembre", "ottobre", "nuvembre", "dicembre"]
    },
    gsw: {
      // Alsatian
      today: "heit",
      days: ["Su.", "Mo.", "Di.", "Mi.", "Du.", "Fr.", "Sà."],
      months: ["Jänner", "Feverje", "März", "Àpril", "Mai", "Jüni", "Jüli", "Augscht", "September", "Oktower", "Nowember", "Dezember"]
    },
    sah: {
      // Yakut
      today: "bügün",
      days: ["Бс", "Бн", "Оп", "Ср", "Чп", "Бт", "Сб"],
      months: ["Тохсунньу", "Олунньу", "Кулун тутар", "Муус устар", "Ыам ыйа", "Бэс ыйа", "От ыйа", "Атырдьах ыйа", "Балаҕан ыйа", "Алтынньы", "Сэтинньи", "Ахсынньы"]
    },
    qut: {
      // K'iche
      today: "[kamik]",
      days: ["juq", "kaq", "oxq", "kajq", "joq", "waqq", "wuqq"],
      months: ["nab'e ik'", "ukab' ik'", "rox ik'", "ukaj ik'", "uro' ik'", "uwaq ik'", "uwuq ik'", "uwajxaq ik'", "ub'elej ik'", "ulaj ik'", "ujulaj ik'", "ukab'laj ik'"]
    },
    rw: {
      // Kinyarwanda
      today: "uyu munsi",
      days: ["mbe.", "kab.", "gat.", "kan.", "gat.", "gat.", "cyu."],
      months: ["Mutarama", "Gashyantare", "Werurwe", "Mata", "Gicurasi", "Kamena", "Nyakanga", "Kanama", "Nzeli", "Ukwakira", "Ugushyingo", "Ukuboza"]
    },
    wo: {
      // Wolof
      today: "tey",
      days: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
    },
    prs: {
      // Dari
      today: "امروز",
      days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      months: ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"]
    },
    gd: {
      // Scottish Gaelic
      today: "an-diugh",
      days: ["Dòm", "Lua", "Mài", "Cia", "Ard", "Hao", "Sat"],
      months: ["Am Faoilleach", "An Gearran", "Am Màrt", "An Giblean", "An Cèitean", "An t-Ògmhios", "An t-Iuchar", "An Lùnastal", "An t-Sultain", "An Dàmhair", "An t-Samhain", "An Dùbhlachd"]
    },
    smn: {
      // Sami (Inari)
      today: "onne",
      days: ["pa", "vu", "ma", "ko", "tu", "vá", "lá"],
      months: ["uđđâivemáánu", "kuovâmáánu", "njuhčâmáánu", "cuáŋuimáánu", "vyesimáánu", "kesimáánu", "syeinimáánu", "porgemáánu", "čohčâmáánu", "roovvâdmáánu", "skammâmáánu", "juovlâmáánu"]
    },
    sms: {
      // Sami (Skolt)
      today: "pei ́vv",
      days: ["pâ", "vu", "mâ", "se", "ne", "pi", "su"],
      months: ["ođđee´jjmään", "tä´lvvmään", "pâ´zzlâšttammään", "njuhččmään", "vue´ssmään", "ǩie´ssmään", "suei´nnmään", "på´rǧǧmään", "čõhččmään", "kålggmään", "skamm´mään", "rosttovmään"]
    },
    zh: {
      // Simplified Chinese 
      days: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      today: "今天"
    },
    "zh-hans": {
      //Simplified Chinese, informal
      days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      today: "今天"
    },
    "zh-hant": {
      // Traditional Chinese
      days: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
      months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      today: "今天"
    },
    nn: {
      // Norwegian (Nynorsk)
      today: "i dag",
      days: ["sø", "må", "ty", "on", "to", "fr", "la"],
      months: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"]
    },
    bs: {
      // Bosnian
      today: "danas",
      days: ["ned", "pon", "uto", "sri", "čet", "pet", "sub"],
      months: ["januar", "februar", "mart", "april", "maj", "juni", "juli", "avgust", "septembar", "oktobar", "novembar", "decembar"]
    },
    sma: {
      // Sami (Southern)
      today: "daenbiejjien",
      days: ["aej", "måa", "dæj", "gask", "duar", "bearj", "laav"],
      months: ["tsïengele", "goevte", "njoktje", "voerhtje", "suehpede", "ruffie", "snjaltje", "mïetske", "skïerede", "golke", "rahka", "goeve"]
    },
    nb: {
      // Norwegian (Bokmål)
      today: "i dag",
      days: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
      months: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"]
    },
    sr: {
      // Serbian
      today: "данас",
      days: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
      months: ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"]
    },
    dsb: {
      // Lower Sorbian
      today: "źinsa",
      days: ["nje", "pon", "wał", "srj", "stw", "pět", "sob"],
      months: ["januar", "februar", "měrc", "apryl", "maj", "junij", "julij", "awgust", "september", "oktober", "nowember", "december"]
    },
    smj: {
      // Sami (Lule)
      today: "uddni",
      days: ["ájl", "mán", "dis", "gas", "duor", "bier", "láv"],
      months: ["ådåjakmánno", "guovvamánno", "sjnjuktjamánno", "vuoratjismánno", "moarmesmánno", "biehtsemánno", "sjnjilltjamánno", "bårggemánno", "ragátmánno", "gålgådismánno", "basádismánno", "javllamánno"]
    }
  };
}

class Input {
  constructor(input) {
    this.element = input;
    this.element.setAttribute(pickerAppliedAttr, '');

    if (dateInputIsSupported) {
      // this wil both prevent the native datepicker displaying AND allow asigning a value attribute which is not ISO8601 compliant
      this.element.type = 'date-polyfill'; // this.element.addEventListener('click', preventDefault);
    }

    var langEl = this.element,
        lang = '';

    while (langEl.parentNode) {
      lang = langEl.getAttribute('lang');

      if (lang) {
        break;
      }

      langEl = langEl.parentNode;
    }

    this.setLocaleText(lang);

    if (!this.element.placeholder) {
      this.element.placeholder = this.localeText.format.replace('M', 'mm').replace('D', 'dd').replace('Y', 'yyyy');
    }

    var valuePropDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.element), 'value');

    if (valuePropDescriptor === null) {
      valuePropDescriptor = (_readOnlyError("valuePropDescriptor"), {
        get: () => this.element.getAttribute('value'),

        set() {}

      });
      console.log("nodep-date-input-polyfill: unable to obtain native input[type=date] .value propertyDescriptor");
    }

    Object.defineProperties(this.element, {
      'textValue': {
        get: valuePropDescriptor.get,
        set: valuePropDescriptor.set
      },
      'value': {
        get: () => this.element.polyfillValue,
        set: val => {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
            this.element.polyfillValue = this.element.textValue = '';
            this.element.setAttribute('value', '');
            return;
          }

          this.element.polyfillValue = val;
          var YMD = val.split("-");
          this.element.textValue = this.localeText.format.replace("Y", YMD[0]).replace("M", YMD[1]).replace("D", YMD[2]);
          this.element.setAttribute("value", this.element.textValue);
        }
      },
      'valueAsDate': {
        get: () => {
          if (!this.element.polyfillValue) {
            return null;
          }

          return new Date(this.element.polyfillValue);
        },
        set: val => {
          if (val === null || isNaN(val.getTime())) {
            this.element.value = '';
          } else {
            this.element.value = val.toISOString().slice(0, 10);
          }
        }
      },
      'valueAsNumber': {
        get: () => {
          if (!this.element.value) {
            return NaN;
          }

          return this.element.valueAsDate.getTime();
        },
        set: val => {
          this.element.valueAsDate = new Date(val);
        }
      }
    }); // Initialize value for display.

    this.element.value = this.element.getAttribute('value'); // Open the picker when the input get focus,
    // also on various click events to capture it in all corner cases.

    var showPicker = () => {
      Picker.instance.attachTo(this);
    };

    var passiveOpt = {
      passive: true
    };
    this.element.addEventListener('focus', showPicker, passiveOpt);
    this.element.addEventListener('mousedown', showPicker, passiveOpt);
    this.element.addEventListener('mouseup', showPicker, passiveOpt); // Update the picker if the date changed manually in the input.

    this.element.addEventListener('keydown', e => {
      var beginValue = this.element.valueAsDate;
      var requirePing = true;
      var requireParse = false;

      switch (e.keyCode) {
        case 9:
        case 27:
          Picker.instance.hide();
          requirePing = false;
          break;

        case 38:
          if (beginValue === null) {
            beginValue = new Date();
          }

          beginValue.setDate(beginValue.getDate() + 1);
          this.element.valueAsDate = beginValue;
          break;

        case 40:
          if (beginValue === null) {
            beginValue = new Date();
          }

          beginValue.setDate(beginValue.getDate() - 1);
          this.element.valueAsDate = beginValue;
          break;

        default:
          requireParse = true;
      }

      if (requirePing) {
        if (requireParse) {
          var self = this;
          setTimeout(() => {
            var parseDt = self.localeText.parseLocale(self.element.textValue);

            if (parseDt) {
              parseDt.setTime(parseDt.getTime() - parseDt.getTimezoneOffset() * 60000);
            }

            if (+parseDt !== +self.element.valueAsDate) {
              self.element.valueAsDate = parseDt;
              Picker.instance.pingInput();
              Picker.instance.sync();
            }
          }, 1);
        } else {
          Picker.instance.pingInput();
          Picker.instance.sync();
        }
      }
    }, passiveOpt);
  }

  setLocaleText(elementLang) {
    var preferredLocales = window.navigator.languages ? [...window.navigator.languages] : [window.navigator.userLanguage || window.navigator.language]; // user browser preference 1st then element language - arguably should unshift here, or could get complex and 
    // differentiate element language only (length===2) from language and culture both defined on a containing element

    if (elementLang) {
      preferredLocales.push(elementLang);
    }

    var li = getLanguageInfo(preferredLocales); // First, look for an exact match to the provided locale.
    // for (const pl of preferredLocales) { - with current core-js polyfills this will import Symbol polyfill, which is unnecessary bloat

    this.locale = li.locale;
    this.localeText = li;
  }

  static pendingDateInputs() {
    '[data-nodep-date-input-polyfill-debug]';
  }

}

function addPickers() {
  var {
    watchForInsert = false,
    allowForcePicker = false
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  Picker.instance = new Picker();
  var findHelper = new FindInputsHelper({
    allowForcePicker
  }); // Get and loop all the input[type="date"]s in the page that do not have `[data-has-picker]` yet.

  findHelper.getAllInputsForPolyfilling().forEach(di => new Input(di));

  if (watchForInsert) {
    var observer = new MutationObserver(mutations => mutations.forEach(m => {
      if (m.type === 'childList') {
        m.addedNodes.forEach(el => {
          if (el.nodeType === Node.ELEMENT_NODE) {
            // [el, ...el.querySelectorAll('input[type=date]')] should do, but some problem with transpilling
            // firefox fine with same transpile, but IE somehow tries to implement es.string.iterator rather than nodelist!
            var nodes = Array.from(el.querySelectorAll('input[type=date]'));
            nodes.push(el);
            nodes.forEach(inpt => {
              if (findHelper.requiresPolyfilling(inpt)) {
                new Input(inpt);
              }
            });
          }
        });
      }
    })); // call `observe` on that MutationObserver instance, 
    // passing it the element to observe, and the options object

    observer.observe(document.body, {
      childList: true,
      attributes: false,
      subtree: true
    }); // this might not be the best way to handle this as it will not add placeholder until clicked

    /*
    document.body.addEventListener('mousedown', (evt)=> {
        if (findHelper.requiresPolyfilling(evt.target)) {
            return new Input(evt.target);
        }
    }, { passive: true });
    */
  }
}

export { addPickers };
//# sourceMappingURL=addPickers-08ced8bc-98eb88f0.js.map
