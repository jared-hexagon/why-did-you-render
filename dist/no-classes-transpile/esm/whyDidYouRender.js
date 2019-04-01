/**
 * @welldone-software/why-did-you-render 3.0.0-beta.2
 * MIT Licensed
 * Generated by Vitali Zaidman <vzaidman@gmail.com> (https://github.com/vzaidman)
 * Generated at 2019-04-01
 */

import _defaults from 'lodash/defaults';
import _isString from 'lodash/isString';
import _reduce from 'lodash/reduce';
import _has from 'lodash/has';
import _keys from 'lodash/keys';
import _isFunction from 'lodash/isFunction';
import _isRegExp from 'lodash/isRegExp';
import _isDate from 'lodash/isDate';
import _isPlainObject from 'lodash/isPlainObject';
import _isArray from 'lodash/isArray';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var diffTypes = {
  'different': 'different',
  'deepEquals': 'deepEquals',
  'date': 'date',
  'regex': 'regex',
  'reactElement': 'reactElement',
  'function': 'function'
};

var _diffTypesDescription;
var moreInfoUrl = 'http://bit.ly/wdyr02';
var moreInfoHooksUrl = 'http://bit.ly/wdyr3';
var diffTypesDescriptions = (_diffTypesDescription = {}, _defineProperty(_diffTypesDescription, diffTypes.different, 'different objects.'), _defineProperty(_diffTypesDescription, diffTypes.deepEquals, 'different objects that are equal by value.'), _defineProperty(_diffTypesDescription, diffTypes.date, 'different date objects with the same value.'), _defineProperty(_diffTypesDescription, diffTypes.regex, 'different regular expressions with the same value.'), _defineProperty(_diffTypesDescription, diffTypes.reactElement, 'different React elements with the same displayName.'), _defineProperty(_diffTypesDescription, diffTypes.function, 'different functions with the same name.'), _diffTypesDescription);
var inHotReload = false;

function shouldLog(reason, Component, options) {
  if (inHotReload) {
    return false;
  }

  if (options.logOnDifferentValues) {
    return true;
  }

  if (Component.whyDidYouRender && Component.whyDidYouRender.logOnDifferentValues) {
    return true;
  }

  var hasDifferentValues = reason.propsDifferences && reason.propsDifferences.some(function (diff) {
    return diff.diffType === diffTypes.different;
  }) || reason.stateDifferences && reason.stateDifferences.some(function (diff) {
    return diff.diffType === diffTypes.different;
  }) || reason.hookDifferences && reason.hookDifferences.some(function (diff) {
    return diff.diffType === diffTypes.different;
  });
  return !hasDifferentValues;
}

function logDifference(_ref) {
  var Component = _ref.Component,
      displayName = _ref.displayName,
      hookName = _ref.hookName,
      prefixMessage = _ref.prefixMessage,
      diffObjType = _ref.diffObjType,
      differences = _ref.differences,
      values = _ref.values,
      options = _ref.options;

  if (differences && differences.length > 0) {
    options.consoleLog(_defineProperty({}, displayName, Component), "".concat(prefixMessage, " of ").concat(diffObjType, " changes:"));
    differences.forEach(function (_ref2) {
      var pathString = _ref2.pathString,
          diffType = _ref2.diffType,
          prevValue = _ref2.prevValue,
          nextValue = _ref2.nextValue;
      options.consoleGroup("%c".concat(diffObjType === 'hook' ? "hook ".concat(hookName, " ") : "".concat(diffObjType, "."), "%c").concat(pathString, "%c"), 'color:blue;', 'color:red;', 'color:black;');
      options.consoleLog("".concat(diffTypesDescriptions[diffType], " (more info at ").concat(hookName ? moreInfoHooksUrl : moreInfoUrl, ")"));
      options.consoleLog(_defineProperty({}, "prev ".concat(pathString), prevValue), '!==', _defineProperty({}, "next ".concat(pathString), nextValue));
      options.consoleGroupEnd();
    });
  } else if (differences) {
    options.consoleLog(_defineProperty({}, displayName, Component), "".concat(prefixMessage, " the ").concat(diffObjType, " object itself changed but it's values are all equal."), diffObjType === 'props' ? 'This could of been avoided by making the component pure, or by preventing it\'s father from re-rendering.' : 'This usually means this component called setState when no changes in it\'s state actually occurred.', "more info at ".concat(moreInfoUrl));
    options.consoleLog("prev ".concat(diffObjType, ":"), values.prev, ' !== ', values.next, ":next ".concat(diffObjType));
  }
}

function defaultNotifier(updateInfo) {
  var Component = updateInfo.Component,
      displayName = updateInfo.displayName,
      hookName = updateInfo.hookName,
      prevProps = updateInfo.prevProps,
      prevState = updateInfo.prevState,
      prevHook = updateInfo.prevHook,
      nextProps = updateInfo.nextProps,
      nextState = updateInfo.nextState,
      nextHook = updateInfo.nextHook,
      reason = updateInfo.reason,
      options = updateInfo.options;

  if (!shouldLog(reason, Component, options)) {
    return;
  }

  options.consoleGroup("%c".concat(displayName), 'color: #058;');
  var prefixMessage = 'Re-rendered because';

  if (reason.propsDifferences) {
    logDifference({
      Component: Component,
      displayName: displayName,
      prefixMessage: prefixMessage,
      diffObjType: 'props',
      differences: reason.propsDifferences,
      values: {
        prev: prevProps,
        next: nextProps
      },
      options: options
    });
    prefixMessage = 'And because';
  }

  if (reason.stateDifferences) {
    logDifference({
      Component: Component,
      displayName: displayName,
      prefixMessage: prefixMessage,
      diffObjType: 'state',
      differences: reason.stateDifferences,
      values: {
        prev: prevState,
        next: nextState
      },
      options: options
    });
  }

  if (reason.hookDifferences) {
    logDifference({
      Component: Component,
      displayName: displayName,
      prefixMessage: prefixMessage,
      diffObjType: 'hook',
      differences: reason.hookDifferences,
      values: {
        prev: prevHook,
        next: nextHook
      },
      hookName: hookName,
      options: options
    });
  }

  if (!reason.propsDifferences && !reason.stateDifferences && !reason.hookDifferences) {
    options.consoleLog(_defineProperty({}, displayName, Component), 'Re-rendered although props and state objects are the same.', 'This usually means there was a call to this.forceUpdate() inside the component.', "more info at ".concat(moreInfoUrl));
  }

  options.consoleGroupEnd();
}
function createDefaultNotifier(hotReloadBufferMs) {
  if (hotReloadBufferMs) {
    if (module && module.hot && module.hot.addStatusHandler) {
      module.hot.addStatusHandler(function (status) {
        if (status === 'idle') {
          inHotReload = true;
          setTimeout(function () {
            inHotReload = false;
          }, hotReloadBufferMs);
        }
      });
    }
  }

  return defaultNotifier;
}

var emptyFn = function emptyFn() {};

function normalizeOptions() {
  var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var consoleGroup = console.group;
  var consoleGroupEnd = console.groupEnd;

  if (userOptions.collapseGroups) {
    consoleGroup = console.groupCollapsed;
  } else if (userOptions.onlyLogs) {
    consoleGroup = console.log;
    consoleGroupEnd = emptyFn;
  }

  var notifier = userOptions.notifier || createDefaultNotifier(userOptions.hasOwnProperty('hotReloadBufferMs') ? userOptions.hotReloadBufferMs : 500);
  return _objectSpread({
    include: null,
    exclude: null,
    notifier: notifier,
    onlyLogs: false,
    consoleLog: console.log,
    consoleGroup: consoleGroup,
    consoleGroupEnd: consoleGroupEnd,
    logOnDifferentValues: false,
    trackHooks: true
  }, userOptions);
}

function getDisplayName(type) {
  return type.displayName || type.name || type.type && getDisplayName(type.type) || (_isString(type) ? type : undefined);
}

var hasElementType = typeof Element !== 'undefined'; // copied from https://github.com/facebook/react/packages/shared/ReactSymbols.js

var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;

var isReactElement = function isReactElement(object) {
  return object.$$typeof === REACT_ELEMENT_TYPE;
}; // end


function trackDiff(a, b, diffsAccumulator, pathString, diffType) {
  diffsAccumulator.push({
    diffType: diffType,
    pathString: pathString,
    prevValue: a,
    nextValue: b
  });
  return diffType !== diffTypes.different;
}

function accumulateDeepEqualDiffs(a, b, diffsAccumulator) {
  var pathString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if (a === b) {
    return true;
  }

  if (!a || !b) {
    return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (_isArray(a) && _isArray(b)) {
    var length = a.length;

    if (length !== b.length) {
      return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
    }

    var allChildrenDeepEqual = true;

    for (var i = length; i-- !== 0;) {
      if (!accumulateDeepEqualDiffs(a[i], b[i], diffsAccumulator, "".concat(pathString, "[").concat(i, "]"))) {
        allChildrenDeepEqual = false;
      }
    }

    return allChildrenDeepEqual ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.deepEquals) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (_isDate(a) && _isDate(b)) {
    return a.getTime() === b.getTime() ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.date) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (_isRegExp(a) && _isRegExp(b)) {
    return a.toString() === b.toString() ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.regex) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (hasElementType && a instanceof Element && b instanceof Element) {
    return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (isReactElement(a) && isReactElement(b)) {
    return a.type === b.type ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.reactElement) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (_isFunction(a) && _isFunction(b)) {
    return a.name === b.name ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.function) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  if (_isPlainObject(a) && _isPlainObject(b)) {
    var keys = _keys(a);

    var _length = keys.length;

    if (_length !== _keys(b).length) {
      return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
    }

    for (var _i = _length; _i-- !== 0;) {
      if (!_has(b, keys[_i])) {
        return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
      }
    }

    var _allChildrenDeepEqual = true;

    for (var _i2 = _length; _i2-- !== 0;) {
      var key = keys[_i2];

      if (!accumulateDeepEqualDiffs(a[key], b[key], diffsAccumulator, "".concat(pathString, ".").concat(key))) {
        _allChildrenDeepEqual = false;
      }
    }

    return _allChildrenDeepEqual ? trackDiff(a, b, diffsAccumulator, pathString, diffTypes.deepEquals) : trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
  }

  return trackDiff(a, b, diffsAccumulator, pathString, diffTypes.different);
}

function calculateDeepEqualDiffs(a, b, initialPathString) {
  try {
    var diffs = [];
    accumulateDeepEqualDiffs(a, b, diffs, initialPathString);
    return diffs;
  } catch (error) {
    if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
      // warn on circular references, don't crash.
      // browsers throw different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      // eslint-disable-next-line no-console
      console.warn('Warning: why-did-you-render couldn\'t handle circular references in props.', error.name, error.message);
      return false;
    }

    throw error;
  }
}

var emptyObject = {};
function findObjectsDifferences(userPrevObj, userNextObj) {
  if (userPrevObj === userNextObj) {
    return false;
  }

  var prevObj = userPrevObj || emptyObject;
  var nextObj = userNextObj || emptyObject;
  var keysOfBothObjects = Object.keys(_objectSpread({}, prevObj, nextObj));
  return _reduce(keysOfBothObjects, function (result, key) {
    var deepEqualDiffs = calculateDeepEqualDiffs(prevObj[key], nextObj[key], key);

    if (deepEqualDiffs) {
      result = [].concat(_toConsumableArray(result), _toConsumableArray(deepEqualDiffs));
    }

    return result;
  }, []);
}

function getUpdateReason(prevProps, prevState, prevHook, nextProps, nextState, nextHook) {
  return {
    propsDifferences: findObjectsDifferences(prevProps, nextProps),
    stateDifferences: findObjectsDifferences(prevState, nextState),
    hookDifferences: findObjectsDifferences(prevHook, nextHook)
  };
}

function getUpdateInfo(_ref) {
  var Component = _ref.Component,
      displayName = _ref.displayName,
      hookName = _ref.hookName,
      prevProps = _ref.prevProps,
      prevState = _ref.prevState,
      prevHook = _ref.prevHook,
      nextProps = _ref.nextProps,
      nextState = _ref.nextState,
      nextHook = _ref.nextHook,
      options = _ref.options;
  return {
    Component: Component,
    displayName: displayName,
    hookName: hookName,
    prevProps: prevProps,
    prevState: prevState,
    prevHook: prevHook,
    nextProps: nextProps,
    nextState: nextState,
    nextHook: nextHook,
    options: options,
    reason: getUpdateReason(prevProps, prevState, prevHook, nextProps, nextState, nextHook)
  };
}

function shouldInclude(displayName, options) {
  return options.include && options.include.length > 0 && options.include.some(function (regex) {
    return regex.test(displayName);
  });
}

function shouldExclude(displayName, options) {
  return options.exclude && options.exclude.length > 0 && options.exclude.some(function (regex) {
    return regex.test(displayName);
  });
}

function shouldTrack(Component, displayName, options) {
  if (shouldExclude(displayName, options)) {
    return false;
  }

  return !!(Component.whyDidYouRender || shouldInclude(displayName, options));
}

var hasSymbol$1 = typeof Symbol === 'function' && Symbol.for;
var REACT_MEMO_TYPE = hasSymbol$1 ? Symbol.for('react.memo') : 0xead3;

function patchClassComponent(ClassComponent, displayName, React, options) {
  class WDYRPatchedClassComponent extends ClassComponent {
    constructor(props, context) {
      var _this;

      super(props, context);
      _this = this;
      var renderIsAnArrowFunction = this.render && !ClassComponent.prototype.render;

      if (renderIsAnArrowFunction) {
        var origRender = this.render;

        this.render = function () {
          WDYRPatchedClassComponent.prototype.render.apply(_this);
          return origRender();
        };
      }
    }

    render() {
      if (this._prevProps) {
        options.notifier(getUpdateInfo({
          Component: ClassComponent,
          displayName: displayName,
          prevProps: this._prevProps,
          prevState: this._prevState,
          nextProps: this.props,
          nextState: this.state,
          options: options
        }));
      }

      this._prevProps = this.props;
      this._prevState = this.state;
      return super.render && super.render();
    }

  }

  WDYRPatchedClassComponent.displayName = displayName;

  _defaults(WDYRPatchedClassComponent, ClassComponent);

  return WDYRPatchedClassComponent;
}

function patchFunctionalComponent(FunctionalComponent, displayName, React, options) {
  function WDYRFunctionalComponent(nextProps) {
    var ref = React.useRef();
    var prevProps = ref.current;
    ref.current = nextProps;

    if (prevProps) {
      var notification = getUpdateInfo({
        Component: FunctionalComponent,
        displayName: displayName,
        prevProps: prevProps,
        nextProps: nextProps,
        options: options
      }); // if a functional component re-rendered without a props change
      // it was probably caused by a hook and we should not care about it

      if (notification.reason.propsDifferences) {
        options.notifier(notification);
      }
    }

    return FunctionalComponent(nextProps);
  }

  WDYRFunctionalComponent.displayName = displayName;

  _defaults(WDYRFunctionalComponent, FunctionalComponent);

  return WDYRFunctionalComponent;
}

function patchMemoComponent(MemoComponent, displayName, React, options) {
  var WDYRMemoizedFunctionalComponent = React.memo(function (nextProps) {
    var ref = React.useRef();
    var prevProps = ref.current;
    ref.current = nextProps;

    if (prevProps) {
      var notification = getUpdateInfo({
        Component: MemoComponent,
        displayName: displayName,
        prevProps: prevProps,
        nextProps: nextProps,
        options: options
      }); // if a functional component re-rendered without a props change
      // it was probably caused by a hook and we should not care about it

      if (notification.reason.propsDifferences) {
        options.notifier(notification);
      }
    }

    return MemoComponent.type(nextProps);
  });
  WDYRMemoizedFunctionalComponent.displayName = displayName;

  _defaults(WDYRMemoizedFunctionalComponent, MemoComponent);

  return WDYRMemoizedFunctionalComponent;
}

function trackHookChanges(hookName, hookConfig, hookResult, React, options) {
  var nextHook = hookResult;
  var Component = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current.type;
  var displayName = getDisplayName(Component);
  var isShouldTrack = shouldTrack(Component, displayName, options);

  if (!isShouldTrack) {
    return nextHook;
  }

  var ref = React.useRef();
  var prevHook = ref.current;
  ref.current = nextHook;

  if (prevHook) {
    var notification = getUpdateInfo({
      Component: Component,
      displayName: displayName,
      hookName: hookName,
      prevHook: prevHook,
      nextHook: nextHook,
      options: options
    });
    var shouldNotifyHookDifference = notification.reason.hookDifferences && (notification.reason.hookDifferences.length > 0 || !hookConfig.allowShallow);

    if (shouldNotifyHookDifference) {
      options.notifier(notification);
    }
  }

  return ref.current;
}

function createPatchedComponent(componentsMap, Component, displayName, React, options) {
  if (Component.$$typeof === REACT_MEMO_TYPE) {
    return patchMemoComponent(Component, displayName, React, options);
  }

  if (Component.prototype && Component.prototype.isReactComponent) {
    return patchClassComponent(Component, displayName, React, options);
  }

  return patchFunctionalComponent(Component, displayName, React, options);
}

function getPatchedComponent(componentsMap, Component, displayName, React, options) {
  if (componentsMap.has(Component)) {
    return componentsMap.get(Component);
  }

  var WDYRPatchedComponent = createPatchedComponent(componentsMap, Component, displayName, React, options);
  componentsMap.set(Component, WDYRPatchedComponent);
  return WDYRPatchedComponent;
}

var hooksConfig = {
  useState: {
    allowShallow: true
  },
  useReducer: true
};
function whyDidYouRender(React, userOptions) {
  var options = normalizeOptions(userOptions);
  var origCreateElement = React.createElement;
  var origCreateFactory = React.createFactory;
  var componentsMap = new WeakMap();

  React.createElement = function (componentNameOrComponent) {
    var isShouldTrack = (typeof componentNameOrComponent === 'function' || componentNameOrComponent.$$typeof === REACT_MEMO_TYPE) && shouldTrack(componentNameOrComponent, getDisplayName(componentNameOrComponent), options);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    if (!isShouldTrack) {
      return origCreateElement.apply(React, [componentNameOrComponent].concat(rest));
    }

    var displayName = componentNameOrComponent && componentNameOrComponent.whyDidYouRender && componentNameOrComponent.whyDidYouRender.customName || getDisplayName(componentNameOrComponent);
    var WDYRPatchedComponent = getPatchedComponent(componentsMap, componentNameOrComponent, displayName, React, options);
    return origCreateElement.apply(React, [WDYRPatchedComponent].concat(rest));
  };

  Object.assign(React.createElement, origCreateElement);

  React.createFactory = function (type) {
    var factory = React.createElement.bind(null, type);
    factory.type = type;
    return factory;
  };

  Object.assign(React.createFactory, origCreateFactory);

  if (options.trackHooks) {
    var currentDispatcher;
    Object.defineProperty(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher, 'current', {
      set: function set(_currentDispatcher) {
        currentDispatcher = _currentDispatcher;
      },
      get: function get() {
        return Object.entries(hooksConfig).reduce(function (result, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              hookName = _ref2[0],
              hookConfig = _ref2[1];

          result[hookName] = function () {
            var _currentDispatcher2;

            var hookResult = (_currentDispatcher2 = currentDispatcher)[hookName].apply(_currentDispatcher2, arguments);

            if (hookConfig) {
              trackHookChanges(hookName, hookConfig === true ? {} : hookConfig, hookResult, React, options);
            }

            return hookResult;
          };

          return result;
        }, _objectSpread({}, currentDispatcher));
      }
    });
  }

  React.__REVERT_WHY_DID_YOU_RENDER__ = function () {
    Object.assign(React, {
      createElement: origCreateElement,
      createFactory: origCreateFactory
    });
    componentsMap = null;
    Object.defineProperty(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher, 'current', {
      writable: true
    });
    delete React.__REVERT_WHY_DID_YOU_RENDER__;
  };

  return React;
}

export default whyDidYouRender;
