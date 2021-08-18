// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5FtZm":[function(require,module,exports) {
var Refresh = require('react-refresh/runtime');
Refresh.injectIntoGlobalHook(window);
window.$RefreshReg$ = function() {
};
window.$RefreshSig$ = function() {
    return function(type) {
        return type;
    };
};

},{"react-refresh/runtime":"7mFS9"}],"7mFS9":[function(require,module,exports) {
'use strict';
module.exports = require('./cjs/react-refresh-runtime.development.js');

},{"./cjs/react-refresh-runtime.development.js":"29u2B"}],"29u2B":[function(require,module,exports) {
/** @license React v0.9.0
 * react-refresh-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
(function() {
    // ATTENTION
    // When adding new symbols to this file,
    // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var REACT_ELEMENT_TYPE = 60103;
    var REACT_PORTAL_TYPE = 60106;
    var REACT_FRAGMENT_TYPE = 60107;
    var REACT_STRICT_MODE_TYPE = 60108;
    var REACT_PROFILER_TYPE = 60114;
    var REACT_PROVIDER_TYPE = 60109;
    var REACT_CONTEXT_TYPE = 60110;
    var REACT_FORWARD_REF_TYPE = 60112;
    var REACT_SUSPENSE_TYPE = 60113;
    var REACT_SUSPENSE_LIST_TYPE = 60120;
    var REACT_MEMO_TYPE = 60115;
    var REACT_LAZY_TYPE = 60116;
    var REACT_BLOCK_TYPE = 60121;
    var REACT_SERVER_BLOCK_TYPE = 60122;
    var REACT_FUNDAMENTAL_TYPE = 60117;
    var REACT_SCOPE_TYPE = 60119;
    var REACT_OPAQUE_ID_TYPE = 60128;
    var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
    var REACT_OFFSCREEN_TYPE = 60130;
    var REACT_LEGACY_HIDDEN_TYPE = 60131;
    if (typeof Symbol === 'function' && Symbol.for) {
        var symbolFor = Symbol.for;
        REACT_ELEMENT_TYPE = symbolFor('react.element');
        REACT_PORTAL_TYPE = symbolFor('react.portal');
        REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
        REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
        REACT_PROFILER_TYPE = symbolFor('react.profiler');
        REACT_PROVIDER_TYPE = symbolFor('react.provider');
        REACT_CONTEXT_TYPE = symbolFor('react.context');
        REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
        REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
        REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
        REACT_MEMO_TYPE = symbolFor('react.memo');
        REACT_LAZY_TYPE = symbolFor('react.lazy');
        REACT_BLOCK_TYPE = symbolFor('react.block');
        REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
        REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
        REACT_SCOPE_TYPE = symbolFor('react.scope');
        REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
        REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
        REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
        REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
    }
    var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map; // We never remove these associations.
    // It's OK to reference families, but use WeakMap/Set for types.
    var allFamiliesByID = new Map();
    var allFamiliesByType = new PossiblyWeakMap();
    var allSignaturesByType = new PossiblyWeakMap(); // This WeakMap is read by React, so we only put families
    // that have actually been edited here. This keeps checks fast.
    // $FlowIssue
    var updatedFamiliesByType = new PossiblyWeakMap(); // This is cleared on every performReactRefresh() call.
    // It is an array of [Family, NextType] tuples.
    var pendingUpdates = []; // This is injected by the renderer via DevTools global hook.
    var helpersByRendererID = new Map();
    var helpersByRoot = new Map(); // We keep track of mounted roots so we can schedule updates.
    var mountedRoots = new Set(); // If a root captures an error, we remember it so we can retry on edit.
    var failedRoots = new Set(); // In environments that support WeakMap, we also remember the last element for every root.
    // It needs to be weak because we do this even for roots that failed to mount.
    // If there is no WeakMap, we won't attempt to do retrying.
    // $FlowIssue
    var rootElements = typeof WeakMap === 'function' ? new WeakMap() : null;
    var isPerformingRefresh = false;
    function computeFullKey(signature) {
        if (signature.fullKey !== null) return signature.fullKey;
        var fullKey = signature.ownKey;
        var hooks;
        try {
            hooks = signature.getCustomHooks();
        } catch (err) {
            // This can happen in an edge case, e.g. if expression like Foo.useSomething
            // depends on Foo which is lazily initialized during rendering.
            // In that case just assume we'll have to remount.
            signature.forceReset = true;
            signature.fullKey = fullKey;
            return fullKey;
        }
        for(var i = 0; i < hooks.length; i++){
            var hook = hooks[i];
            if (typeof hook !== 'function') {
                // Something's wrong. Assume we need to remount.
                signature.forceReset = true;
                signature.fullKey = fullKey;
                return fullKey;
            }
            var nestedHookSignature = allSignaturesByType.get(hook);
            if (nestedHookSignature === undefined) continue;
            var nestedHookKey = computeFullKey(nestedHookSignature);
            if (nestedHookSignature.forceReset) signature.forceReset = true;
            fullKey += '\n---\n' + nestedHookKey;
        }
        signature.fullKey = fullKey;
        return fullKey;
    }
    function haveEqualSignatures(prevType, nextType) {
        var prevSignature = allSignaturesByType.get(prevType);
        var nextSignature = allSignaturesByType.get(nextType);
        if (prevSignature === undefined && nextSignature === undefined) return true;
        if (prevSignature === undefined || nextSignature === undefined) return false;
        if (computeFullKey(prevSignature) !== computeFullKey(nextSignature)) return false;
        if (nextSignature.forceReset) return false;
        return true;
    }
    function isReactClass(type) {
        return type.prototype && type.prototype.isReactComponent;
    }
    function canPreserveStateBetween(prevType, nextType) {
        if (isReactClass(prevType) || isReactClass(nextType)) return false;
        if (haveEqualSignatures(prevType, nextType)) return true;
        return false;
    }
    function resolveFamily(type) {
        // Only check updated types to keep lookups fast.
        return updatedFamiliesByType.get(type);
    } // If we didn't care about IE11, we could use new Map/Set(iterable).
    function cloneMap(map) {
        var clone = new Map();
        map.forEach(function(value, key) {
            clone.set(key, value);
        });
        return clone;
    }
    function cloneSet(set) {
        var clone = new Set();
        set.forEach(function(value) {
            clone.add(value);
        });
        return clone;
    }
    function performReactRefresh() {
        if (pendingUpdates.length === 0) return null;
        if (isPerformingRefresh) return null;
        isPerformingRefresh = true;
        try {
            var staleFamilies = new Set();
            var updatedFamilies = new Set();
            var updates = pendingUpdates;
            pendingUpdates = [];
            updates.forEach(function(_ref) {
                var family = _ref[0], nextType = _ref[1];
                // Now that we got a real edit, we can create associations
                // that will be read by the React reconciler.
                var prevType = family.current;
                updatedFamiliesByType.set(prevType, family);
                updatedFamiliesByType.set(nextType, family);
                family.current = nextType; // Determine whether this should be a re-render or a re-mount.
                if (canPreserveStateBetween(prevType, nextType)) updatedFamilies.add(family);
                else staleFamilies.add(family);
            }); // TODO: rename these fields to something more meaningful.
            var update = {
                updatedFamilies: updatedFamilies,
                // Families that will re-render preserving state
                staleFamilies: staleFamilies
            };
            helpersByRendererID.forEach(function(helpers) {
                // Even if there are no roots, set the handler on first update.
                // This ensures that if *new* roots are mounted, they'll use the resolve handler.
                helpers.setRefreshHandler(resolveFamily);
            });
            var didError = false;
            var firstError = null; // We snapshot maps and sets that are mutated during commits.
            // If we don't do this, there is a risk they will be mutated while
            // we iterate over them. For example, trying to recover a failed root
            // may cause another root to be added to the failed list -- an infinite loop.
            var failedRootsSnapshot = cloneSet(failedRoots);
            var mountedRootsSnapshot = cloneSet(mountedRoots);
            var helpersByRootSnapshot = cloneMap(helpersByRoot);
            failedRootsSnapshot.forEach(function(root) {
                var helpers = helpersByRootSnapshot.get(root);
                if (helpers === undefined) throw new Error('Could not find helpers for a root. This is a bug in React Refresh.');
                failedRoots.has(root);
                if (rootElements === null) return;
                if (!rootElements.has(root)) return;
                var element = rootElements.get(root);
                try {
                    helpers.scheduleRoot(root, element);
                } catch (err) {
                    if (!didError) {
                        didError = true;
                        firstError = err;
                    } // Keep trying other roots.
                }
            });
            mountedRootsSnapshot.forEach(function(root) {
                var helpers = helpersByRootSnapshot.get(root);
                if (helpers === undefined) throw new Error('Could not find helpers for a root. This is a bug in React Refresh.');
                mountedRoots.has(root);
                try {
                    helpers.scheduleRefresh(root, update);
                } catch (err) {
                    if (!didError) {
                        didError = true;
                        firstError = err;
                    } // Keep trying other roots.
                }
            });
            if (didError) throw firstError;
            return update;
        } finally{
            isPerformingRefresh = false;
        }
    }
    function register(type, id) {
        if (type === null) return;
        if (typeof type !== 'function' && typeof type !== 'object') return;
         // This can happen in an edge case, e.g. if we register
        // return value of a HOC but it returns a cached component.
        // Ignore anything but the first registration for each type.
        if (allFamiliesByType.has(type)) return;
         // Create family or remember to update it.
        // None of this bookkeeping affects reconciliation
        // until the first performReactRefresh() call above.
        var family = allFamiliesByID.get(id);
        if (family === undefined) {
            family = {
                current: type
            };
            allFamiliesByID.set(id, family);
        } else pendingUpdates.push([
            family,
            type
        ]);
        allFamiliesByType.set(type, family); // Visit inner types because we might not have registered them.
        if (typeof type === 'object' && type !== null) switch(type.$$typeof){
            case REACT_FORWARD_REF_TYPE:
                register(type.render, id + '$render');
                break;
            case REACT_MEMO_TYPE:
                register(type.type, id + '$type');
                break;
        }
    }
    function setSignature(type, key) {
        var forceReset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var getCustomHooks = arguments.length > 3 ? arguments[3] : undefined;
        allSignaturesByType.set(type, {
            forceReset: forceReset,
            ownKey: key,
            fullKey: null,
            getCustomHooks: getCustomHooks || function() {
                return [];
            }
        });
    } // This is lazily called during first render for a type.
    // It captures Hook list at that time so inline requires don't break comparisons.
    function collectCustomHooksForSignature(type) {
        var signature = allSignaturesByType.get(type);
        if (signature !== undefined) computeFullKey(signature);
    }
    function getFamilyByID(id) {
        return allFamiliesByID.get(id);
    }
    function getFamilyByType(type) {
        return allFamiliesByType.get(type);
    }
    function findAffectedHostInstances(families) {
        var affectedInstances = new Set();
        mountedRoots.forEach(function(root) {
            var helpers = helpersByRoot.get(root);
            if (helpers === undefined) throw new Error('Could not find helpers for a root. This is a bug in React Refresh.');
            var instancesForRoot = helpers.findHostInstancesForRefresh(root, families);
            instancesForRoot.forEach(function(inst) {
                affectedInstances.add(inst);
            });
        });
        return affectedInstances;
    }
    function injectIntoGlobalHook(globalObject) {
        // For React Native, the global hook will be set up by require('react-devtools-core').
        // That code will run before us. So we need to monkeypatch functions on existing hook.
        // For React Web, the global hook will be set up by the extension.
        // This will also run before us.
        var hook = globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (hook === undefined) {
            // However, if there is no DevTools extension, we'll need to set up the global hook ourselves.
            // Note that in this case it's important that renderer code runs *after* this method call.
            // Otherwise, the renderer will think that there is no global hook, and won't do the injection.
            var nextID = 0;
            globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__ = hook = {
                renderers: new Map(),
                supportsFiber: true,
                inject: function(injected) {
                    return nextID++;
                },
                onScheduleFiberRoot: function(id, root, children) {
                },
                onCommitFiberRoot: function(id, root, maybePriorityLevel, didError) {
                },
                onCommitFiberUnmount: function() {
                }
            };
        } // Here, we just want to get a reference to scheduleRefresh.
        var oldInject = hook.inject;
        hook.inject = function(injected) {
            var id = oldInject.apply(this, arguments);
            if (typeof injected.scheduleRefresh === 'function' && typeof injected.setRefreshHandler === 'function') // This version supports React Refresh.
            helpersByRendererID.set(id, injected);
            return id;
        }; // Do the same for any already injected roots.
        // This is useful if ReactDOM has already been initialized.
        // https://github.com/facebook/react/issues/17626
        hook.renderers.forEach(function(injected, id) {
            if (typeof injected.scheduleRefresh === 'function' && typeof injected.setRefreshHandler === 'function') // This version supports React Refresh.
            helpersByRendererID.set(id, injected);
        }); // We also want to track currently mounted roots.
        var oldOnCommitFiberRoot = hook.onCommitFiberRoot;
        var oldOnScheduleFiberRoot = hook.onScheduleFiberRoot || function() {
        };
        hook.onScheduleFiberRoot = function(id, root, children) {
            if (!isPerformingRefresh) {
                // If it was intentionally scheduled, don't attempt to restore.
                // This includes intentionally scheduled unmounts.
                failedRoots.delete(root);
                if (rootElements !== null) rootElements.set(root, children);
            }
            return oldOnScheduleFiberRoot.apply(this, arguments);
        };
        hook.onCommitFiberRoot = function(id, root, maybePriorityLevel, didError) {
            var helpers = helpersByRendererID.get(id);
            if (helpers === undefined) return;
            helpersByRoot.set(root, helpers);
            var current = root.current;
            var alternate = current.alternate; // We need to determine whether this root has just (un)mounted.
            // This logic is copy-pasted from similar logic in the DevTools backend.
            // If this breaks with some refactoring, you'll want to update DevTools too.
            if (alternate !== null) {
                var wasMounted = alternate.memoizedState != null && alternate.memoizedState.element != null;
                var isMounted = current.memoizedState != null && current.memoizedState.element != null;
                if (!wasMounted && isMounted) {
                    // Mount a new root.
                    mountedRoots.add(root);
                    failedRoots.delete(root);
                } else if (wasMounted && isMounted) ;
                else if (wasMounted && !isMounted) {
                    // Unmount an existing root.
                    mountedRoots.delete(root);
                    if (didError) // We'll remount it on future edits.
                    failedRoots.add(root);
                    else helpersByRoot.delete(root);
                } else if (!wasMounted && !isMounted) {
                    if (didError) // We'll remount it on future edits.
                    failedRoots.add(root);
                }
            } else // Mount a new root.
            mountedRoots.add(root);
            return oldOnCommitFiberRoot.apply(this, arguments);
        };
    }
    function hasUnrecoverableErrors() {
        // TODO: delete this after removing dependency in RN.
        return false;
    } // Exposed for testing.
    function _getMountedRootCount() {
        return mountedRoots.size;
    } // This is a wrapper over more primitive functions for setting signature.
    // Signatures let us decide whether the Hook order has changed on refresh.
    //
    // This function is intended to be used as a transform target, e.g.:
    // var _s = createSignatureFunctionForTransform()
    //
    // function Hello() {
    //   const [foo, setFoo] = useState(0);
    //   const value = useCustomHook();
    //   _s(); /* Second call triggers collecting the custom Hook list.
    //          * This doesn't happen during the module evaluation because we
    //          * don't want to change the module order with inline requires.
    //          * Next calls are noops. */
    //   return <h1>Hi</h1>;
    // }
    //
    // /* First call specifies the signature: */
    // _s(
    //   Hello,
    //   'useState{[foo, setFoo]}(0)',
    //   () => [useCustomHook], /* Lazy to avoid triggering inline requires */
    // );
    function createSignatureFunctionForTransform() {
        // We'll fill in the signature in two steps.
        // First, we'll know the signature itself. This happens outside the component.
        // Then, we'll know the references to custom Hooks. This happens inside the component.
        // After that, the returned function will be a fast path no-op.
        var status = 'needsSignature';
        var savedType;
        var hasCustomHooks;
        return function(type, key, forceReset, getCustomHooks) {
            switch(status){
                case 'needsSignature':
                    if (type !== undefined) {
                        // If we received an argument, this is the initial registration call.
                        savedType = type;
                        hasCustomHooks = typeof getCustomHooks === 'function';
                        setSignature(type, key, forceReset, getCustomHooks); // The next call we expect is from inside a function, to fill in the custom Hooks.
                        status = 'needsCustomHooks';
                    }
                    break;
                case 'needsCustomHooks':
                    if (hasCustomHooks) collectCustomHooksForSignature(savedType);
                    status = 'resolved';
                    break;
            }
            return type;
        };
    }
    function isLikelyComponentType(type) {
        switch(typeof type){
            case 'function':
                // First, deal with classes.
                if (type.prototype != null) {
                    if (type.prototype.isReactComponent) // React class.
                    return true;
                    var ownNames = Object.getOwnPropertyNames(type.prototype);
                    if (ownNames.length > 1 || ownNames[0] !== 'constructor') // This looks like a class.
                    return false;
                     // eslint-disable-next-line no-proto
                    if (type.prototype.__proto__ !== Object.prototype) // It has a superclass.
                    return false;
                     // Pass through.
                // This looks like a regular function with empty prototype.
                } // For plain functions and arrows, use name as a heuristic.
                var name = type.name || type.displayName;
                return typeof name === 'string' && /^[A-Z]/.test(name);
            case 'object':
                if (type != null) switch(type.$$typeof){
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_MEMO_TYPE:
                        // Definitely React components.
                        return true;
                    default:
                        return false;
                }
                return false;
            default:
                return false;
        }
    }
    exports._getMountedRootCount = _getMountedRootCount;
    exports.collectCustomHooksForSignature = collectCustomHooksForSignature;
    exports.createSignatureFunctionForTransform = createSignatureFunctionForTransform;
    exports.findAffectedHostInstances = findAffectedHostInstances;
    exports.getFamilyByID = getFamilyByID;
    exports.getFamilyByType = getFamilyByType;
    exports.hasUnrecoverableErrors = hasUnrecoverableErrors;
    exports.injectIntoGlobalHook = injectIntoGlobalHook;
    exports.isLikelyComponentType = isLikelyComponentType;
    exports.performReactRefresh = performReactRefresh;
    exports.register = register;
    exports.setSignature = setSignature;
})();

},{}],"7n563":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "459e0da62f65df2bb3cd4cef19f45c02"; // @flow
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets/*: {|[string]: boolean|} */ , acceptedAssets/*: {|[string]: boolean|} */ , assetsToAccept/*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    // $FlowFixMe
    ws.onmessage = function(event/*: {data: string, ...} */ ) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH
            );
            // Handle HMR Update
            var handled = false;
            assets.forEach((asset)=>{
                var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
                if (didAccept) handled = true;
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function(e) {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
        errorHTML += `\n      <div>\n        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">\n          🚨 ${diagnostic.message}\n        </div>\n        <pre>\n          ${stack}\n        </pre>\n        <div>\n          ${diagnostic.hints.map((hint)=>'<div>' + hint + '</div>'
        ).join('')}\n        </div>\n      </div>\n    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    link.getAttribute('href').split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle/*: ParcelRequire */ , asset/*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle/*: ParcelRequire */ , id/*: string */ , depsByBundle/*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle/*: ParcelRequire */ , id/*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"7GqX2":[function(require,module,exports) {
"use strict";
var _animejs = _interopRequireDefault(require("animejs"));
var _core = _interopRequireDefault(require("@barba/core"));
require("./main/helpers/Dreams");
var _Page = _interopRequireDefault(require("./main/Page"));
var _Preloader = _interopRequireDefault(require("./main/Preloader"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Import Modules
// Import Modules
// Define Module Global Variables
let slide, page; // Insert Slide In Page
const insertSlide = ()=>{
    // Create Slide Element
    slide = $.html('<div class="page-transition-slide"><div class="preloader__content"><svg><use href="/img/icons.svg#logo"></use></svg><span class="preloader__spinner"></span></div></div>'); // Append Slide Element
    page.elements.body.append(slide);
}; // Define Function to refresh page
const refreshPageEvents = (_ref)=>{
    let { next  } = _ref;
    page.destroy();
    page = new _Page.default({
        barba: _core.default,
        container: next.container
    }).init();
}; // Start Page Functions
const startPage = (data)=>{
    // Start Page Events
    page.start(); // Get Video Backgrounds
    const videos = $(data ? data.next.container : 'main').children('.bg-video'); // Return if no videos on the page
    if (!videos.length) return; //Autoplay Videos After transition
    videos.children('video[autoplay]').forEach((video)=>video.play()
    ); // Add Ready Class To Videos
    videos.addClass('ready');
}; // Start Load Page
window.addEventListener('DOMContentLoaded', ()=>{
    // Create New Page
    page = new _Page.default({
        barba: _core.default
    }).init(); // Create Preloader
    new _Preloader.default().after(startPage).init(); // Initialize Barba.JS
    _core.default.init({
        // Define Page Transition
        transitions: [
            {
                name: 'default-transition',
                // Animate Slide Into Place
                async leave () {
                    const tl = _animejs.default.timeline({
                        easing: 'easeOutQuad',
                        autoplay: false
                    }).add({
                        targets: slide.e(),
                        translateY: [
                            '100vh',
                            '0vh'
                        ],
                        duration: 500
                    });
                    await page.navbar.closeMenu();
                    tl.play();
                    await tl.finished;
                },
                // Animate Slide Away to reveal new page
                enter () {
                    const tl = _animejs.default.timeline({
                        easing: 'easeOutQuad'
                    }).add({
                        targets: slide.children('.preloader__content').e(),
                        opacity: 0,
                        duration: 500
                    }).add({
                        targets: slide.e(),
                        translateY: '-100vh',
                        duration: 500
                    });
                    return tl.finished;
                }
            }
        ],
        // Register JavaScript Components For Different Pages
        views: [
            {
                namespace: 'home',
                beforeEnter () {
                    page.addComponent('Typewriter', {
                        name: 'ReviewsApp',
                        data: {
                            page,
                            selector: '#reviews-react-app'
                        }
                    });
                    page.navbar.applyView('full');
                    return page.load();
                }
            },
            {
                namespace: 'about',
                beforeEnter () {
                    page.addComponent({
                        name: 'ReviewsApp',
                        data: {
                            page,
                            selector: '#reviews-react-app'
                        }
                    });
                    page.navbar.applyView('full');
                    return page.load();
                }
            },
            {
                namespace: 'fleet',
                beforeEnter () {
                    page.addComponent({
                        name: 'FleetApp',
                        data: {
                            page,
                            selector: '#fleet-react-app'
                        }
                    });
                    page.navbar.applyView('min');
                    return page.load();
                }
            },
            {
                namespace: 'login',
                beforeEnter () {
                    page.addComponent({
                        name: 'LoginApp',
                        data: {
                            page,
                            selector: '#login-react-app'
                        }
                    });
                    page.options.smooth = false;
                    page.navbar.applyView('min');
                    return page.load();
                }
            },
            {
                namespace: 'booking',
                beforeEnter () {
                    // Add Booking App Component
                    page.addComponent({
                        name: 'BookingApp',
                        data: {
                            page,
                            selector: '#booking-react-app'
                        }
                    });
                    page.options.smooth = false;
                    page.navbar.applyView('min');
                    return page.load();
                }
            }
        ],
        // Prevent Double Clicking Links
        preventRunning: true,
        // Prevent Defalut Link Actions
        prevent: (_ref2)=>{
            let { el  } = _ref2;
            return el.classList && el.classList.contains('prevent');
        },
        // Enable Debug Mode
        debug: true
    }); // Attach Global Barba Hooks
    _core.default.hooks.beforeLeave(insertSlide);
    _core.default.hooks.afterLeave(refreshPageEvents);
    _core.default.hooks.after(startPage);
});

},{"animejs":"1GvRs","@barba/core":"55kOZ","./main/helpers/Dreams":"lsZ2q","./main/Page":"2l4d1","./main/Preloader":"7cKho"}],"1GvRs":[function(require,module,exports) {
/*
 * anime.js v3.2.1
 * (c) 2020 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */ 'use strict';
// Defaults
var defaultInstanceSettings = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: 'normal',
    autoplay: true,
    timelineOffset: 0
};
var defaultTweenSettings = {
    duration: 1000,
    delay: 0,
    endDelay: 0,
    easing: 'easeOutElastic(1, .5)',
    round: 0
};
var validTransforms = [
    'translateX',
    'translateY',
    'translateZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'scale',
    'scaleX',
    'scaleY',
    'scaleZ',
    'skew',
    'skewX',
    'skewY',
    'perspective',
    'matrix',
    'matrix3d'
];
// Caching
var cache = {
    CSS: {
    },
    springs: {
    }
};
// Utils
function minMax(val, min, max) {
    return Math.min(Math.max(val, min), max);
}
function stringContains(str, text) {
    return str.indexOf(text) > -1;
}
function applyArguments(func, args) {
    return func.apply(null, args);
}
var is = {
    arr: function(a) {
        return Array.isArray(a);
    },
    obj: function(a) {
        return stringContains(Object.prototype.toString.call(a), 'Object');
    },
    pth: function(a) {
        return is.obj(a) && a.hasOwnProperty('totalLength');
    },
    svg: function(a) {
        return a instanceof SVGElement;
    },
    inp: function(a) {
        return a instanceof HTMLInputElement;
    },
    dom: function(a) {
        return a.nodeType || is.svg(a);
    },
    str: function(a) {
        return typeof a === 'string';
    },
    fnc: function(a) {
        return typeof a === 'function';
    },
    und: function(a) {
        return typeof a === 'undefined';
    },
    nil: function(a) {
        return is.und(a) || a === null;
    },
    hex: function(a) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
    },
    rgb: function(a) {
        return /^rgb/.test(a);
    },
    hsl: function(a) {
        return /^hsl/.test(a);
    },
    col: function(a) {
        return is.hex(a) || is.rgb(a) || is.hsl(a);
    },
    key: function(a) {
        return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes';
    }
};
// Easings
function parseEasingParameters(string) {
    var match = /\(([^)]+)\)/.exec(string);
    return match ? match[1].split(',').map(function(p) {
        return parseFloat(p);
    }) : [];
}
// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js
function spring(string, duration) {
    var params = parseEasingParameters(string);
    var mass = minMax(is.und(params[0]) ? 1 : params[0], 0.1, 100);
    var stiffness = minMax(is.und(params[1]) ? 100 : params[1], 0.1, 100);
    var damping = minMax(is.und(params[2]) ? 10 : params[2], 0.1, 100);
    var velocity = minMax(is.und(params[3]) ? 0 : params[3], 0.1, 100);
    var w0 = Math.sqrt(stiffness / mass);
    var zeta = damping / (2 * Math.sqrt(stiffness * mass));
    var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
    var a = 1;
    var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
    function solver(t) {
        var progress = duration ? duration * t / 1000 : t;
        if (zeta < 1) progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
        else progress = (a + b * progress) * Math.exp(-progress * w0);
        if (t === 0 || t === 1) return t;
        return 1 - progress;
    }
    function getDuration() {
        var cached = cache.springs[string];
        if (cached) return cached;
        var frame = 1 / 6;
        var elapsed = 0;
        var rest = 0;
        while(true){
            elapsed += frame;
            if (solver(elapsed) === 1) {
                rest++;
                if (rest >= 16) break;
            } else rest = 0;
        }
        var duration1 = elapsed * frame * 1000;
        cache.springs[string] = duration1;
        return duration1;
    }
    return duration ? solver : getDuration;
}
// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function
function steps(steps1) {
    if (steps1 === void 0) steps1 = 10;
    return function(t) {
        return Math.ceil(minMax(t, 0.000001, 1) * steps1) * (1 / steps1);
    };
}
// BezierEasing https://github.com/gre/bezier-easing
var bezier = function() {
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
    }
    function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
    }
    function C(aA1) {
        return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX, currentT, i = 0;
        do {
            currentT = aA + (aB - aA) / 2;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0) aB = currentT;
            else aA = currentT;
        }while (Math.abs(currentX) > 0.0000001 && (++i) < 10)
        return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for(var i = 0; i < 4; ++i){
            var currentSlope = getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0) return aGuessT;
            var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }
    function bezier1(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) return;
        var sampleValues = new Float32Array(kSplineTableSize);
        if (mX1 !== mY1 || mX2 !== mY2) for(var i = 0; i < kSplineTableSize; ++i)sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        function getTForX(aX) {
            var intervalStart = 0;
            var currentSample = 1;
            var lastSample = kSplineTableSize - 1;
            for(; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample)intervalStart += kSampleStepSize;
            --currentSample;
            var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
            var guessForT = intervalStart + dist * kSampleStepSize;
            var initialSlope = getSlope(guessForT, mX1, mX2);
            if (initialSlope >= 0.001) return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
            else if (initialSlope === 0) return guessForT;
            else return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
        return function(x) {
            if (mX1 === mY1 && mX2 === mY2) return x;
            if (x === 0 || x === 1) return x;
            return calcBezier(getTForX(x), mY1, mY2);
        };
    }
    return bezier1;
}();
var penner = function() {
    // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)
    var eases = {
        linear: function() {
            return function(t) {
                return t;
            };
        }
    };
    var functionEasings = {
        Sine: function() {
            return function(t) {
                return 1 - Math.cos(t * Math.PI / 2);
            };
        },
        Circ: function() {
            return function(t) {
                return 1 - Math.sqrt(1 - t * t);
            };
        },
        Back: function() {
            return function(t) {
                return t * t * (3 * t - 2);
            };
        },
        Bounce: function() {
            return function(t) {
                var pow2, b = 4;
                while(t < ((pow2 = Math.pow(2, --b)) - 1) / 11);
                return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
            };
        },
        Elastic: function(amplitude, period) {
            if (amplitude === void 0) amplitude = 1;
            if (period === void 0) period = 0.5;
            var a = minMax(amplitude, 1, 10);
            var p = minMax(period, 0.1, 2);
            return function(t) {
                return t === 0 || t === 1 ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
            };
        }
    };
    var baseEasings = [
        'Quad',
        'Cubic',
        'Quart',
        'Quint',
        'Expo'
    ];
    baseEasings.forEach(function(name, i) {
        functionEasings[name] = function() {
            return function(t) {
                return Math.pow(t, i + 2);
            };
        };
    });
    Object.keys(functionEasings).forEach(function(name) {
        var easeIn = functionEasings[name];
        eases['easeIn' + name] = easeIn;
        eases['easeOut' + name] = function(a, b) {
            return function(t) {
                return 1 - easeIn(a, b)(1 - t);
            };
        };
        eases['easeInOut' + name] = function(a, b) {
            return function(t) {
                return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
            };
        };
        eases['easeOutIn' + name] = function(a, b) {
            return function(t) {
                return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
            };
        };
    });
    return eases;
}();
function parseEasings(easing, duration) {
    if (is.fnc(easing)) return easing;
    var name = easing.split('(')[0];
    var ease = penner[name];
    var args = parseEasingParameters(easing);
    switch(name){
        case 'spring':
            return spring(easing, duration);
        case 'cubicBezier':
            return applyArguments(bezier, args);
        case 'steps':
            return applyArguments(steps, args);
        default:
            return applyArguments(ease, args);
    }
}
// Strings
function selectString(str) {
    try {
        var nodes = document.querySelectorAll(str);
        return nodes;
    } catch (e) {
        return;
    }
}
// Arrays
function filterArray(arr, callback) {
    var len = arr.length;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    var result = [];
    for(var i = 0; i < len; i++)if (i in arr) {
        var val = arr[i];
        if (callback.call(thisArg, val, i, arr)) result.push(val);
    }
    return result;
}
function flattenArray(arr) {
    return arr.reduce(function(a, b) {
        return a.concat(is.arr(b) ? flattenArray(b) : b);
    }, []);
}
function toArray(o) {
    if (is.arr(o)) return o;
    if (is.str(o)) o = selectString(o) || o;
    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
    return [
        o
    ];
}
function arrayContains(arr, val) {
    return arr.some(function(a) {
        return a === val;
    });
}
// Objects
function cloneObject(o) {
    var clone = {
    };
    for(var p in o)clone[p] = o[p];
    return clone;
}
function replaceObjectProps(o1, o2) {
    var o = cloneObject(o1);
    for(var p in o1)o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
    return o;
}
function mergeObjects(o1, o2) {
    var o = cloneObject(o1);
    for(var p in o2)o[p] = is.und(o1[p]) ? o2[p] : o1[p];
    return o;
}
// Colors
function rgbToRgba(rgbValue) {
    var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
    return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
}
function hexToRgba(hexValue) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hexValue.replace(rgx, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return "rgba(" + r + "," + g + "," + b + ",1)";
}
function hslToRgba(hslValue) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
    var h = parseInt(hsl[1], 10) / 360;
    var s = parseInt(hsl[2], 10) / 100;
    var l = parseInt(hsl[3], 10) / 100;
    var a = hsl[4] || 1;
    function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 0.5) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    var r, g, b;
    if (s == 0) r = g = b = l;
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
}
function colorToRgb(val) {
    if (is.rgb(val)) return rgbToRgba(val);
    if (is.hex(val)) return hexToRgba(val);
    if (is.hsl(val)) return hslToRgba(val);
}
// Units
function getUnit(val) {
    var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    if (split) return split[1];
}
function getTransformUnit(propName) {
    if (stringContains(propName, 'translate') || propName === 'perspective') return 'px';
    if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) return 'deg';
}
// Values
function getFunctionValue(val, animatable) {
    if (!is.fnc(val)) return val;
    return val(animatable.target, animatable.id, animatable.total);
}
function getAttribute(el, prop) {
    return el.getAttribute(prop);
}
function convertPxToUnit(el, value, unit) {
    var valueUnit = getUnit(value);
    if (arrayContains([
        unit,
        'deg',
        'rad',
        'turn'
    ], valueUnit)) return value;
    var cached = cache.CSS[value + unit];
    if (!is.und(cached)) return cached;
    var baseline = 100;
    var tempEl = document.createElement(el.tagName);
    var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
    parentEl.appendChild(tempEl);
    tempEl.style.position = 'absolute';
    tempEl.style.width = baseline + unit;
    var factor = baseline / tempEl.offsetWidth;
    parentEl.removeChild(tempEl);
    var convertedUnit = factor * parseFloat(value);
    cache.CSS[value + unit] = convertedUnit;
    return convertedUnit;
}
function getCSSValue(el, prop, unit) {
    if (prop in el.style) {
        var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
        return unit ? convertPxToUnit(el, value, unit) : value;
    }
}
function getAnimationType(el, prop) {
    if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) return 'attribute';
    if (is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
    if (is.dom(el) && prop !== 'transform' && getCSSValue(el, prop)) return 'css';
    if (el[prop] != null) return 'object';
}
function getElementTransforms(el) {
    if (!is.dom(el)) return;
    var str = el.style.transform || '';
    var reg = /(\w+)\(([^)]*)\)/g;
    var transforms = new Map();
    var m;
    while(m = reg.exec(str))transforms.set(m[1], m[2]);
    return transforms;
}
function getTransformValue(el, propName, animatable, unit) {
    var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
    var value = getElementTransforms(el).get(propName) || defaultVal;
    if (animatable) {
        animatable.transforms.list.set(propName, value);
        animatable.transforms['last'] = propName;
    }
    return unit ? convertPxToUnit(el, value, unit) : value;
}
function getOriginalTargetValue(target, propName, unit, animatable) {
    switch(getAnimationType(target, propName)){
        case 'transform':
            return getTransformValue(target, propName, animatable, unit);
        case 'css':
            return getCSSValue(target, propName, unit);
        case 'attribute':
            return getAttribute(target, propName);
        default:
            return target[propName] || 0;
    }
}
function getRelativeValue(to, from) {
    var operator = /^(\*=|\+=|-=)/.exec(to);
    if (!operator) return to;
    var u = getUnit(to) || 0;
    var x = parseFloat(from);
    var y = parseFloat(to.replace(operator[0], ''));
    switch(operator[0][0]){
        case '+':
            return x + y + u;
        case '-':
            return x - y + u;
        case '*':
            return x * y + u;
    }
}
function validateValue(val, unit) {
    if (is.col(val)) return colorToRgb(val);
    if (/\s/g.test(val)) return val;
    var originalUnit = getUnit(val);
    var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
    if (unit) return unitLess + unit;
    return unitLess;
}
// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744
function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function getCircleLength(el) {
    return Math.PI * 2 * getAttribute(el, 'r');
}
function getRectLength(el) {
    return getAttribute(el, 'width') * 2 + getAttribute(el, 'height') * 2;
}
function getLineLength(el) {
    return getDistance({
        x: getAttribute(el, 'x1'),
        y: getAttribute(el, 'y1')
    }, {
        x: getAttribute(el, 'x2'),
        y: getAttribute(el, 'y2')
    });
}
function getPolylineLength(el) {
    var points = el.points;
    var totalLength = 0;
    var previousPos;
    for(var i = 0; i < points.numberOfItems; i++){
        var currentPos = points.getItem(i);
        if (i > 0) totalLength += getDistance(previousPos, currentPos);
        previousPos = currentPos;
    }
    return totalLength;
}
function getPolygonLength(el) {
    var points = el.points;
    return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}
// Path animation
function getTotalLength(el) {
    if (el.getTotalLength) return el.getTotalLength();
    switch(el.tagName.toLowerCase()){
        case 'circle':
            return getCircleLength(el);
        case 'rect':
            return getRectLength(el);
        case 'line':
            return getLineLength(el);
        case 'polyline':
            return getPolylineLength(el);
        case 'polygon':
            return getPolygonLength(el);
    }
}
function setDashoffset(el) {
    var pathLength = getTotalLength(el);
    el.setAttribute('stroke-dasharray', pathLength);
    return pathLength;
}
// Motion path
function getParentSvgEl(el) {
    var parentEl = el.parentNode;
    while(is.svg(parentEl)){
        if (!is.svg(parentEl.parentNode)) break;
        parentEl = parentEl.parentNode;
    }
    return parentEl;
}
function getParentSvg(pathEl, svgData) {
    var svg = svgData || {
    };
    var parentSvgEl = svg.el || getParentSvgEl(pathEl);
    var rect = parentSvgEl.getBoundingClientRect();
    var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
    var width = rect.width;
    var height = rect.height;
    var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [
        0,
        0,
        width,
        height
    ]);
    return {
        el: parentSvgEl,
        viewBox: viewBox,
        x: viewBox[0] / 1,
        y: viewBox[1] / 1,
        w: width,
        h: height,
        vW: viewBox[2],
        vH: viewBox[3]
    };
}
function getPath(path, percent) {
    var pathEl = is.str(path) ? selectString(path)[0] : path;
    var p = percent || 100;
    return function(property) {
        return {
            property: property,
            el: pathEl,
            svg: getParentSvg(pathEl),
            totalLength: getTotalLength(pathEl) * (p / 100)
        };
    };
}
function getPathProgress(path, progress, isPathTargetInsideSVG) {
    function point(offset) {
        if (offset === void 0) offset = 0;
        var l = progress + offset >= 1 ? progress + offset : 0;
        return path.el.getPointAtLength(l);
    }
    var svg = getParentSvg(path.el, path.svg);
    var p = point();
    var p0 = point(-1);
    var p1 = point(1);
    var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
    var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
    switch(path.property){
        case 'x':
            return (p.x - svg.x) * scaleX;
        case 'y':
            return (p.y - svg.y) * scaleY;
        case 'angle':
            return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
}
// Decompose value
function decomposeValue(val, unit) {
    // const rgx = /-?\d*\.?\d+/g; // handles basic numbers
    // const rgx = /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
    var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
    var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + '';
    return {
        original: value,
        numbers: value.match(rgx) ? value.match(rgx).map(Number) : [
            0
        ],
        strings: is.str(val) || unit ? value.split(rgx) : []
    };
}
// Animatables
function parseTargets(targets) {
    var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
    return filterArray(targetsArray, function(item, pos, self) {
        return self.indexOf(item) === pos;
    });
}
function getAnimatables(targets) {
    var parsed = parseTargets(targets);
    return parsed.map(function(t, i) {
        return {
            target: t,
            id: i,
            total: parsed.length,
            transforms: {
                list: getElementTransforms(t)
            }
        };
    });
}
// Properties
function normalizePropertyTweens(prop, tweenSettings) {
    var settings = cloneObject(tweenSettings);
    // Override duration if easing is a spring
    if (/^spring/.test(settings.easing)) settings.duration = spring(settings.easing);
    if (is.arr(prop)) {
        var l = prop.length;
        var isFromTo = l === 2 && !is.obj(prop[0]);
        if (!isFromTo) // Duration divided by the number of tweens
        {
            if (!is.fnc(tweenSettings.duration)) settings.duration = tweenSettings.duration / l;
        } else // Transform [from, to] values shorthand to a valid tween value
        prop = {
            value: prop
        };
    }
    var propArray = is.arr(prop) ? prop : [
        prop
    ];
    return propArray.map(function(v, i) {
        var obj = is.obj(v) && !is.pth(v) ? v : {
            value: v
        };
        // Default delay value should only be applied to the first tween
        if (is.und(obj.delay)) obj.delay = !i ? tweenSettings.delay : 0;
        // Default endDelay value should only be applied to the last tween
        if (is.und(obj.endDelay)) obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
        return obj;
    }).map(function(k) {
        return mergeObjects(k, settings);
    });
}
function flattenKeyframes(keyframes) {
    var propertyNames = filterArray(flattenArray(keyframes.map(function(key) {
        return Object.keys(key);
    })), function(p) {
        return is.key(p);
    }).reduce(function(a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);
    var properties = {
    };
    var loop = function(i) {
        var propName = propertyNames[i];
        properties[propName] = keyframes.map(function(key) {
            var newKey = {
            };
            for(var p in key){
                if (is.key(p)) {
                    if (p == propName) newKey.value = key[p];
                } else newKey[p] = key[p];
            }
            return newKey;
        });
    };
    for(var i = 0; i < propertyNames.length; i++)loop(i);
    return properties;
}
function getProperties(tweenSettings, params) {
    var properties = [];
    var keyframes = params.keyframes;
    if (keyframes) params = mergeObjects(flattenKeyframes(keyframes), params);
    for(var p in params)if (is.key(p)) properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
    });
    return properties;
}
// Tweens
function normalizeTweenValues(tween, animatable) {
    var t = {
    };
    for(var p in tween){
        var value = getFunctionValue(tween[p], animatable);
        if (is.arr(value)) {
            value = value.map(function(v) {
                return getFunctionValue(v, animatable);
            });
            if (value.length === 1) value = value[0];
        }
        t[p] = value;
    }
    t.duration = parseFloat(t.duration);
    t.delay = parseFloat(t.delay);
    return t;
}
function normalizeTweens(prop, animatable) {
    var previousTween;
    return prop.tweens.map(function(t) {
        var tween = normalizeTweenValues(t, animatable);
        var tweenValue = tween.value;
        var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
        var toUnit = getUnit(to);
        var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
        var previousValue = previousTween ? previousTween.to.original : originalValue;
        var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
        var fromUnit = getUnit(from) || getUnit(originalValue);
        var unit = toUnit || fromUnit;
        if (is.und(to)) to = previousValue;
        tween.from = decomposeValue(from, unit);
        tween.to = decomposeValue(getRelativeValue(to, from), unit);
        tween.start = previousTween ? previousTween.end : 0;
        tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
        tween.easing = parseEasings(tween.easing, tween.duration);
        tween.isPath = is.pth(tweenValue);
        tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
        tween.isColor = is.col(tween.from.original);
        if (tween.isColor) tween.round = 1;
        previousTween = tween;
        return tween;
    });
}
// Tween progress
var setProgressValue = {
    css: function(t, p, v) {
        return t.style[p] = v;
    },
    attribute: function(t, p, v) {
        return t.setAttribute(p, v);
    },
    object: function(t, p, v) {
        return t[p] = v;
    },
    transform: function(t, p, v, transforms, manual) {
        transforms.list.set(p, v);
        if (p === transforms.last || manual) {
            var str = '';
            transforms.list.forEach(function(value, prop) {
                str += prop + "(" + value + ") ";
            });
            t.style.transform = str;
        }
    }
};
// Set Value helper
function setTargetsValue(targets, properties) {
    var animatables = getAnimatables(targets);
    animatables.forEach(function(animatable) {
        for(var property in properties){
            var value = getFunctionValue(properties[property], animatable);
            var target = animatable.target;
            var valueUnit = getUnit(value);
            var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
            var unit = valueUnit || getUnit(originalValue);
            var to = getRelativeValue(validateValue(value, unit), originalValue);
            var animType = getAnimationType(target, property);
            setProgressValue[animType](target, property, to, animatable.transforms, true);
        }
    });
}
// Animations
function createAnimation(animatable, prop) {
    var animType = getAnimationType(animatable.target, prop.name);
    if (animType) {
        var tweens = normalizeTweens(prop, animatable);
        var lastTween = tweens[tweens.length - 1];
        return {
            type: animType,
            property: prop.name,
            animatable: animatable,
            tweens: tweens,
            duration: lastTween.end,
            delay: tweens[0].delay,
            endDelay: lastTween.endDelay
        };
    }
}
function getAnimations(animatables, properties) {
    return filterArray(flattenArray(animatables.map(function(animatable) {
        return properties.map(function(prop) {
            return createAnimation(animatable, prop);
        });
    })), function(a) {
        return !is.und(a);
    });
}
// Create Instance
function getInstanceTimings(animations, tweenSettings) {
    var animLength = animations.length;
    var getTlOffset = function(anim) {
        return anim.timelineOffset ? anim.timelineOffset : 0;
    };
    var timings = {
    };
    timings.duration = animLength ? Math.max.apply(Math, animations.map(function(anim) {
        return getTlOffset(anim) + anim.duration;
    })) : tweenSettings.duration;
    timings.delay = animLength ? Math.min.apply(Math, animations.map(function(anim) {
        return getTlOffset(anim) + anim.delay;
    })) : tweenSettings.delay;
    timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function(anim) {
        return getTlOffset(anim) + anim.duration - anim.endDelay;
    })) : tweenSettings.endDelay;
    return timings;
}
var instanceID = 0;
function createNewInstance(params) {
    var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
    var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
    var properties = getProperties(tweenSettings, params);
    var animatables = getAnimatables(params.targets);
    var animations = getAnimations(animatables, properties);
    var timings = getInstanceTimings(animations, tweenSettings);
    var id = instanceID;
    instanceID++;
    return mergeObjects(instanceSettings, {
        id: id,
        children: [],
        animatables: animatables,
        animations: animations,
        duration: timings.duration,
        delay: timings.delay,
        endDelay: timings.endDelay
    });
}
// Core
var activeInstances = [];
var engine = function() {
    var raf;
    function play() {
        if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) raf = requestAnimationFrame(step);
    }
    function step(t) {
        // memo on algorithm issue:
        // dangerous iteration over mutable `activeInstances`
        // (that collection may be updated from within callbacks of `tick`-ed animation instances)
        var activeInstancesLength = activeInstances.length;
        var i = 0;
        while(i < activeInstancesLength){
            var activeInstance = activeInstances[i];
            if (!activeInstance.paused) {
                activeInstance.tick(t);
                i++;
            } else {
                activeInstances.splice(i, 1);
                activeInstancesLength--;
            }
        }
        raf = i > 0 ? requestAnimationFrame(step) : undefined;
    }
    function handleVisibilityChange() {
        if (!anime.suspendWhenDocumentHidden) return;
        if (isDocumentHidden()) // suspend ticks
        raf = cancelAnimationFrame(raf);
        else {
            // first adjust animations to consider the time that ticks were suspended
            activeInstances.forEach(function(instance) {
                return instance._onDocumentVisibility();
            });
            engine();
        }
    }
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', handleVisibilityChange);
    return play;
}();
function isDocumentHidden() {
    return !!document && document.hidden;
}
// Public Instance
function anime(params) {
    if (params === void 0) params = {
    };
    var startTime = 0, lastTime = 0, now = 0;
    var children, childrenLength = 0;
    var resolve = null;
    function makePromise(instance) {
        var promise = window.Promise && new Promise(function(_resolve) {
            return resolve = _resolve;
        });
        instance.finished = promise;
        return promise;
    }
    var instance = createNewInstance(params);
    var promise = makePromise(instance);
    function toggleInstanceDirection() {
        var direction = instance.direction;
        if (direction !== 'alternate') instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
        instance.reversed = !instance.reversed;
        children.forEach(function(child) {
            return child.reversed = instance.reversed;
        });
    }
    function adjustTime(time) {
        return instance.reversed ? instance.duration - time : time;
    }
    function resetTime() {
        startTime = 0;
        lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
    }
    function seekChild(time, child) {
        if (child) child.seek(time - child.timelineOffset);
    }
    function syncInstanceChildren(time) {
        if (!instance.reversePlayback) for(var i = 0; i < childrenLength; i++)seekChild(time, children[i]);
        else for(var i$1 = childrenLength; i$1--;)seekChild(time, children[i$1]);
    }
    function setAnimationsProgress(insTime) {
        var i = 0;
        var animations = instance.animations;
        var animationsLength = animations.length;
        while(i < animationsLength){
            var anim = animations[i];
            var animatable = anim.animatable;
            var tweens = anim.tweens;
            var tweenLength = tweens.length - 1;
            var tween = tweens[tweenLength];
            // Only check for keyframes if there is more than one tween
            if (tweenLength) tween = filterArray(tweens, function(t) {
                return insTime < t.end;
            })[0] || tween;
            var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
            var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
            var strings = tween.to.strings;
            var round = tween.round;
            var numbers = [];
            var toNumbersLength = tween.to.numbers.length;
            var progress = void 0;
            for(var n = 0; n < toNumbersLength; n++){
                var value = void 0;
                var toNumber = tween.to.numbers[n];
                var fromNumber = tween.from.numbers[n] || 0;
                if (!tween.isPath) value = fromNumber + eased * (toNumber - fromNumber);
                else value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
                if (round) {
                    if (!(tween.isColor && n > 2)) value = Math.round(value * round) / round;
                }
                numbers.push(value);
            }
            // Manual Array.reduce for better performances
            var stringsLength = strings.length;
            if (!stringsLength) progress = numbers[0];
            else {
                progress = strings[0];
                for(var s = 0; s < stringsLength; s++){
                    var a = strings[s];
                    var b = strings[s + 1];
                    var n$1 = numbers[s];
                    if (!isNaN(n$1)) {
                        if (!b) progress += n$1 + ' ';
                        else progress += n$1 + b;
                    }
                }
            }
            setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
            anim.currentValue = progress;
            i++;
        }
    }
    function setCallback(cb) {
        if (instance[cb] && !instance.passThrough) instance[cb](instance);
    }
    function countIteration() {
        if (instance.remaining && instance.remaining !== true) instance.remaining--;
    }
    function setInstanceProgress(engineTime) {
        var insDuration = instance.duration;
        var insDelay = instance.delay;
        var insEndDelay = insDuration - instance.endDelay;
        var insTime = adjustTime(engineTime);
        instance.progress = minMax(insTime / insDuration * 100, 0, 100);
        instance.reversePlayback = insTime < instance.currentTime;
        if (children) syncInstanceChildren(insTime);
        if (!instance.began && instance.currentTime > 0) {
            instance.began = true;
            setCallback('begin');
        }
        if (!instance.loopBegan && instance.currentTime > 0) {
            instance.loopBegan = true;
            setCallback('loopBegin');
        }
        if (insTime <= insDelay && instance.currentTime !== 0) setAnimationsProgress(0);
        if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) setAnimationsProgress(insDuration);
        if (insTime > insDelay && insTime < insEndDelay) {
            if (!instance.changeBegan) {
                instance.changeBegan = true;
                instance.changeCompleted = false;
                setCallback('changeBegin');
            }
            setCallback('change');
            setAnimationsProgress(insTime);
        } else if (instance.changeBegan) {
            instance.changeCompleted = true;
            instance.changeBegan = false;
            setCallback('changeComplete');
        }
        instance.currentTime = minMax(insTime, 0, insDuration);
        if (instance.began) setCallback('update');
        if (engineTime >= insDuration) {
            lastTime = 0;
            countIteration();
            if (!instance.remaining) {
                instance.paused = true;
                if (!instance.completed) {
                    instance.completed = true;
                    setCallback('loopComplete');
                    setCallback('complete');
                    if (!instance.passThrough && 'Promise' in window) {
                        resolve();
                        promise = makePromise(instance);
                    }
                }
            } else {
                startTime = now;
                setCallback('loopComplete');
                instance.loopBegan = false;
                if (instance.direction === 'alternate') toggleInstanceDirection();
            }
        }
    }
    instance.reset = function() {
        var direction = instance.direction;
        instance.passThrough = false;
        instance.currentTime = 0;
        instance.progress = 0;
        instance.paused = true;
        instance.began = false;
        instance.loopBegan = false;
        instance.changeBegan = false;
        instance.completed = false;
        instance.changeCompleted = false;
        instance.reversePlayback = false;
        instance.reversed = direction === 'reverse';
        instance.remaining = instance.loop;
        children = instance.children;
        childrenLength = children.length;
        for(var i = childrenLength; i--;)instance.children[i].reset();
        if (instance.reversed && instance.loop !== true || direction === 'alternate' && instance.loop === 1) instance.remaining++;
        setAnimationsProgress(instance.reversed ? instance.duration : 0);
    };
    // internal method (for engine) to adjust animation timings before restoring engine ticks (rAF)
    instance._onDocumentVisibility = resetTime;
    // Set Value helper
    instance.set = function(targets, properties) {
        setTargetsValue(targets, properties);
        return instance;
    };
    instance.tick = function(t) {
        now = t;
        if (!startTime) startTime = now;
        setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
    };
    instance.seek = function(time) {
        setInstanceProgress(adjustTime(time));
    };
    instance.pause = function() {
        instance.paused = true;
        resetTime();
    };
    instance.play = function() {
        if (!instance.paused) return;
        if (instance.completed) instance.reset();
        instance.paused = false;
        activeInstances.push(instance);
        resetTime();
        engine();
    };
    instance.reverse = function() {
        toggleInstanceDirection();
        instance.completed = instance.reversed ? false : true;
        resetTime();
    };
    instance.restart = function() {
        instance.reset();
        instance.play();
    };
    instance.remove = function(targets) {
        var targetsArray = parseTargets(targets);
        removeTargetsFromInstance(targetsArray, instance);
    };
    instance.reset();
    if (instance.autoplay) instance.play();
    return instance;
}
// Remove targets from animation
function removeTargetsFromAnimations(targetsArray, animations) {
    for(var a = animations.length; a--;)if (arrayContains(targetsArray, animations[a].animatable.target)) animations.splice(a, 1);
}
function removeTargetsFromInstance(targetsArray, instance) {
    var animations = instance.animations;
    var children = instance.children;
    removeTargetsFromAnimations(targetsArray, animations);
    for(var c = children.length; c--;){
        var child = children[c];
        var childAnimations = child.animations;
        removeTargetsFromAnimations(targetsArray, childAnimations);
        if (!childAnimations.length && !child.children.length) children.splice(c, 1);
    }
    if (!animations.length && !children.length) instance.pause();
}
function removeTargetsFromActiveInstances(targets) {
    var targetsArray = parseTargets(targets);
    for(var i = activeInstances.length; i--;){
        var instance = activeInstances[i];
        removeTargetsFromInstance(targetsArray, instance);
    }
}
// Stagger helpers
function stagger(val, params) {
    if (params === void 0) params = {
    };
    var direction = params.direction || 'normal';
    var easing = params.easing ? parseEasings(params.easing) : null;
    var grid = params.grid;
    var axis = params.axis;
    var fromIndex = params.from || 0;
    var fromFirst = fromIndex === 'first';
    var fromCenter = fromIndex === 'center';
    var fromLast = fromIndex === 'last';
    var isRange = is.arr(val);
    var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
    var val2 = isRange ? parseFloat(val[1]) : 0;
    var unit = getUnit(isRange ? val[1] : val) || 0;
    var start = params.start || 0 + (isRange ? val1 : 0);
    var values = [];
    var maxValue = 0;
    return function(el, i, t) {
        if (fromFirst) fromIndex = 0;
        if (fromCenter) fromIndex = (t - 1) / 2;
        if (fromLast) fromIndex = t - 1;
        if (!values.length) {
            for(var index = 0; index < t; index++){
                if (!grid) values.push(Math.abs(fromIndex - index));
                else {
                    var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
                    var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
                    var toX = index % grid[0];
                    var toY = Math.floor(index / grid[0]);
                    var distanceX = fromX - toX;
                    var distanceY = fromY - toY;
                    var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                    if (axis === 'x') value = -distanceX;
                    if (axis === 'y') value = -distanceY;
                    values.push(value);
                }
                maxValue = Math.max.apply(Math, values);
            }
            if (easing) values = values.map(function(val3) {
                return easing(val3 / maxValue) * maxValue;
            });
            if (direction === 'reverse') values = values.map(function(val3) {
                return axis ? val3 < 0 ? val3 * -1 : -val3 : Math.abs(maxValue - val3);
            });
        }
        var spacing = isRange ? (val2 - val1) / maxValue : val1;
        return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
    };
}
// Timeline
function timeline(params) {
    if (params === void 0) params = {
    };
    var tl = anime(params);
    tl.duration = 0;
    tl.add = function(instanceParams, timelineOffset) {
        var tlIndex = activeInstances.indexOf(tl);
        var children = tl.children;
        if (tlIndex > -1) activeInstances.splice(tlIndex, 1);
        function passThrough(ins) {
            ins.passThrough = true;
        }
        for(var i = 0; i < children.length; i++)passThrough(children[i]);
        var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
        insParams.targets = insParams.targets || params.targets;
        var tlDuration = tl.duration;
        insParams.autoplay = false;
        insParams.direction = tl.direction;
        insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
        passThrough(tl);
        tl.seek(insParams.timelineOffset);
        var ins = anime(insParams);
        passThrough(ins);
        children.push(ins);
        var timings = getInstanceTimings(children, params);
        tl.delay = timings.delay;
        tl.endDelay = timings.endDelay;
        tl.duration = timings.duration;
        tl.seek(0);
        tl.reset();
        if (tl.autoplay) tl.play();
        return tl;
    };
    return tl;
}
anime.version = '3.2.1';
anime.speed = 1;
// TODO:#review: naming, documentation
anime.suspendWhenDocumentHidden = true;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
module.exports = anime;

},{}],"55kOZ":[function(require,module,exports) {
(function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = t || self).barba = n();
})(this, function() {
    function t(t1, n) {
        for(var r = 0; r < n.length; r++){
            var e = n[r];
            e.enumerable = e.enumerable || false, e.configurable = true, "value" in e && (e.writable = true), Object.defineProperty(t1, e.key, e);
        }
    }
    function n(n1, r, e) {
        return r && t(n1.prototype, r), e && t(n1, e), n1;
    }
    function r2() {
        return (r2 = Object.assign || function(t1) {
            for(var n1 = 1; n1 < arguments.length; n1++){
                var r1 = arguments[n1];
                for(var e in r1)Object.prototype.hasOwnProperty.call(r1, e) && (t1[e] = r1[e]);
            }
            return t1;
        }).apply(this, arguments);
    }
    function e(t1, n1) {
        t1.prototype = Object.create(n1.prototype), t1.prototype.constructor = t1, t1.__proto__ = n1;
    }
    function i3(t1) {
        return (i3 = Object.setPrototypeOf ? Object.getPrototypeOf : function(t2) {
            return t2.__proto__ || Object.getPrototypeOf(t2);
        })(t1);
    }
    function o4(t1, n1) {
        return (o4 = Object.setPrototypeOf || function(t2, n2) {
            return t2.__proto__ = n2, t2;
        })(t1, n1);
    }
    function u1(t1, n1, r2) {
        return (u1 = (function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                })), true;
            } catch (t2) {
                return false;
            }
        })() ? Reflect.construct : function(t2, n2, r3) {
            var e1 = [
                null
            ];
            e1.push.apply(e1, n2);
            var i1 = new (Function.bind.apply(t2, e1));
            return r3 && o4(i1, r3.prototype), i1;
        }).apply(null, arguments);
    }
    function f1(t1) {
        var n1 = "function" == typeof Map ? new Map : void 0;
        return (f1 = function(t2) {
            if (null === t2 || -1 === Function.toString.call(t2).indexOf("[native code]")) return t2;
            if ("function" != typeof t2) throw new TypeError("Super expression must either be null or a function");
            if ((void 0) !== n1) {
                if (n1.has(t2)) return n1.get(t2);
                n1.set(t2, r3);
            }
            function r3() {
                return u1(t2, arguments, i3(this).constructor);
            }
            return r3.prototype = Object.create(t2.prototype, {
                constructor: {
                    value: r3,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            }), o4(r3, t2);
        })(t1);
    }
    function s(t1, n1) {
        try {
            var r3 = t1();
        } catch (t2) {
            return n1(t2);
        }
        return r3 && r3.then ? r3.then(void 0, n1) : r3;
    }
    "undefined" != typeof Symbol && (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))), "undefined" != typeof Symbol && (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")));
    var c, a = "2.9.7", h = function() {
    };
    (function(t1) {
        t1[t1.off = 0] = "off", t1[t1.error = 1] = "error", t1[t1.warning = 2] = "warning", t1[t1.info = 3] = "info", t1[t1.debug = 4] = "debug";
    })(c || (c = {
    }));
    var v = c.off, l = function() {
        function t1(t2) {
            this.t = t2;
        }
        t1.getLevel = function() {
            return v;
        }, t1.setLevel = function(t2) {
            return v = c[t2];
        };
        var n1 = t1.prototype;
        return n1.error = function() {
            for(var t2 = arguments.length, n2 = new Array(t2), r3 = 0; r3 < t2; r3++)n2[r3] = arguments[r3];
            this.i(console.error, c.error, n2);
        }, n1.warn = function() {
            for(var t2 = arguments.length, n2 = new Array(t2), r3 = 0; r3 < t2; r3++)n2[r3] = arguments[r3];
            this.i(console.warn, c.warning, n2);
        }, n1.info = function() {
            for(var t2 = arguments.length, n2 = new Array(t2), r3 = 0; r3 < t2; r3++)n2[r3] = arguments[r3];
            this.i(console.info, c.info, n2);
        }, n1.debug = function() {
            for(var t2 = arguments.length, n2 = new Array(t2), r3 = 0; r3 < t2; r3++)n2[r3] = arguments[r3];
            this.i(console.log, c.debug, n2);
        }, n1.i = function(n2, r3, e1) {
            r3 <= t1.getLevel() && n2.apply(console, [
                "[" + this.t + "] "
            ].concat(e1));
        }, t1;
    }(), d = O, m = E, p = g, w = x, b = T, y = "/", P = new RegExp([
        "(\\\\.)",
        "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"
    ].join("|"), "g");
    function g(t1, n1) {
        for(var r3, e1 = [], i1 = 0, o1 = 0, u1 = "", f1 = n1 && n1.delimiter || y, s1 = n1 && n1.whitelist || void 0, c1 = false; null !== (r3 = P.exec(t1));){
            var a1 = r3[0], h1 = r3[1], v1 = r3.index;
            if (u1 += t1.slice(o1, v1), o1 = v1 + a1.length, h1) u1 += h1[1], c1 = true;
            else {
                var l1 = "", d1 = r3[2], m1 = r3[3], p1 = r3[4], w1 = r3[5];
                if (!c1 && u1.length) {
                    var b1 = u1.length - 1, g1 = u1[b1];
                    (!s1 || s1.indexOf(g1) > -1) && (l1 = g1, u1 = u1.slice(0, b1));
                }
                u1 && (e1.push(u1), u1 = "", c1 = false);
                var E = m1 || p1, x = l1 || f1;
                e1.push({
                    name: d1 || i1++,
                    prefix: l1,
                    delimiter: x,
                    optional: "?" === w1 || "*" === w1,
                    repeat: "+" === w1 || "*" === w1,
                    pattern: E ? A(E) : "[^" + k(x === f1 ? x : x + f1) + "]+?"
                });
            }
        }
        return (u1 || o1 < t1.length) && e1.push(u1 + t1.substr(o1)), e1;
    }
    function E(t1, n1) {
        return function(r3, e1) {
            var i1 = t1.exec(r3);
            if (!i1) return false;
            for(var o1 = i1[0], u1 = i1.index, f1 = {
            }, s1 = e1 && e1.decode || decodeURIComponent, c1 = 1; c1 < i1.length; c1++)if ((void 0) !== i1[c1]) {
                var a2 = n1[c1 - 1];
                f1[a2.name] = a2.repeat ? i1[c1].split(a2.delimiter).map(function(t2) {
                    return s1(t2, a2);
                }) : s1(i1[c1], a2);
            }
            return {
                path: o1,
                index: u1,
                params: f1
            };
        };
    }
    function x(t1, n1) {
        for(var r3 = new Array(t1.length), e1 = 0; e1 < t1.length; e1++)"object" == typeof t1[e1] && (r3[e1] = new RegExp("^(?:" + t1[e1].pattern + ")$", R(n1)));
        return function(n2, e2) {
            for(var i1 = "", o1 = e2 && e2.encode || encodeURIComponent, u1 = !e2 || false !== e2.validate, f1 = 0; f1 < t1.length; f1++){
                var s1 = t1[f1];
                if ("string" != typeof s1) {
                    var c1, a3 = n2 ? n2[s1.name] : void 0;
                    if (Array.isArray(a3)) {
                        if (!s1.repeat) throw new TypeError('Expected "' + s1.name + '" to not repeat, but got array');
                        if (0 === a3.length) {
                            if (s1.optional) continue;
                            throw new TypeError('Expected "' + s1.name + '" to not be empty');
                        }
                        for(var h2 = 0; h2 < a3.length; h2++){
                            if (c1 = o1(a3[h2], s1), u1 && !r3[f1].test(c1)) throw new TypeError('Expected all "' + s1.name + '" to match "' + s1.pattern + '"');
                            i1 += (0 === h2 ? s1.prefix : s1.delimiter) + c1;
                        }
                    } else if ("string" != typeof a3 && "number" != typeof a3 && "boolean" != typeof a3) {
                        if (!s1.optional) throw new TypeError('Expected "' + s1.name + '" to be ' + (s1.repeat ? "an array" : "a string"));
                    } else {
                        if (c1 = o1(String(a3), s1), u1 && !r3[f1].test(c1)) throw new TypeError('Expected "' + s1.name + '" to match "' + s1.pattern + '", but got "' + c1 + '"');
                        i1 += s1.prefix + c1;
                    }
                } else i1 += s1;
            }
            return i1;
        };
    }
    function k(t1) {
        return t1.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    function A(t1) {
        return t1.replace(/([=!:$/()])/g, "\\$1");
    }
    function R(t1) {
        return t1 && t1.sensitive ? "" : "i";
    }
    function T(t1, n1, r3) {
        for(var e1 = (r3 = r3 || {
        }).strict, i1 = false !== r3.start, o1 = false !== r3.end, u1 = r3.delimiter || y, f1 = [].concat(r3.endsWith || []).map(k).concat("$").join("|"), s2 = i1 ? "^" : "", c2 = 0; c2 < t1.length; c2++){
            var a4 = t1[c2];
            if ("string" == typeof a4) s2 += k(a4);
            else {
                var h3 = a4.repeat ? "(?:" + a4.pattern + ")(?:" + k(a4.delimiter) + "(?:" + a4.pattern + "))*" : a4.pattern;
                n1 && n1.push(a4), s2 += a4.optional ? a4.prefix ? "(?:" + k(a4.prefix) + "(" + h3 + "))?" : "(" + h3 + ")?" : k(a4.prefix) + "(" + h3 + ")";
            }
        }
        if (o1) e1 || (s2 += "(?:" + k(u1) + ")?"), s2 += "$" === f1 ? "$" : "(?=" + f1 + ")";
        else {
            var v2 = t1[t1.length - 1], l2 = "string" == typeof v2 ? v2[v2.length - 1] === u1 : (void 0) === v2;
            e1 || (s2 += "(?:" + k(u1) + "(?=" + f1 + "))?"), l2 || (s2 += "(?=" + k(u1) + "|" + f1 + ")");
        }
        return new RegExp(s2, R(r3));
    }
    function O(t1, n1, r3) {
        return t1 instanceof RegExp ? (function(t2, n2) {
            if (!n2) return t2;
            var r4 = t2.source.match(/\((?!\?)/g);
            if (r4) for(var e1 = 0; e1 < r4.length; e1++)n2.push({
                name: e1,
                prefix: null,
                delimiter: null,
                optional: false,
                repeat: false,
                pattern: null
            });
            return t2;
        })(t1, n1) : Array.isArray(t1) ? (function(t2, n2, r4) {
            for(var e1 = [], i1 = 0; i1 < t2.length; i1++)e1.push(O(t2[i1], n2, r4).source);
            return new RegExp("(?:" + e1.join("|") + ")", R(r4));
        })(t1, n1, r3) : (function(t2, n2, r4) {
            return T(g(t2, r4), n2, r4);
        })(t1, n1, r3);
    }
    d.match = function(t1, n1) {
        var r3 = [];
        return E(O(t1, r3, n1), r3);
    }, d.regexpToFunction = m, d.parse = p, d.compile = function(t1, n1) {
        return x(g(t1, n1), n1);
    }, d.tokensToFunction = w, d.tokensToRegExp = b;
    var S = {
        container: "container",
        history: "history",
        namespace: "namespace",
        prefix: "data-barba",
        prevent: "prevent",
        wrapper: "wrapper"
    }, j = new (function() {
        function t1() {
            this.o = S, this.u = new DOMParser;
        }
        var n1 = t1.prototype;
        return n1.toString = function(t2) {
            return t2.outerHTML;
        }, n1.toDocument = function(t2) {
            return this.u.parseFromString(t2, "text/html");
        }, n1.toElement = function(t2) {
            var n2 = document.createElement("div");
            return n2.innerHTML = t2, n2;
        }, n1.getHtml = function(t2) {
            return (void 0) === t2 && (t2 = document), this.toString(t2.documentElement);
        }, n1.getWrapper = function(t2) {
            return (void 0) === t2 && (t2 = document), t2.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]');
        }, n1.getContainer = function(t2) {
            return (void 0) === t2 && (t2 = document), t2.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]');
        }, n1.removeContainer = function(t2) {
            document.body.contains(t2) && t2.parentNode.removeChild(t2);
        }, n1.addContainer = function(t2, n2) {
            var r3 = this.getContainer();
            r3 ? this.s(t2, r3) : n2.appendChild(t2);
        }, n1.getNamespace = function(t2) {
            (void 0) === t2 && (t2 = document);
            var n2 = t2.querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
            return n2 ? n2.getAttribute(this.o.prefix + "-" + this.o.namespace) : null;
        }, n1.getHref = function(t2) {
            if (t2.tagName && "a" === t2.tagName.toLowerCase()) {
                if ("string" == typeof t2.href) return t2.href;
                var n2 = t2.getAttribute("href") || t2.getAttribute("xlink:href");
                if (n2) return this.resolveUrl(n2.baseVal || n2);
            }
            return null;
        }, n1.resolveUrl = function() {
            for(var t2 = arguments.length, n3 = new Array(t2), r3 = 0; r3 < t2; r3++)n3[r3] = arguments[r3];
            var e1 = n3.length;
            if (0 === e1) throw new Error("resolveUrl requires at least one argument; got none.");
            var i1 = document.createElement("base");
            if (i1.href = arguments[0], 1 === e1) return i1.href;
            var o1 = document.getElementsByTagName("head")[0];
            o1.insertBefore(i1, o1.firstChild);
            for(var u1, f1 = document.createElement("a"), s2 = 1; s2 < e1; s2++)f1.href = arguments[s2], i1.href = u1 = f1.href;
            return o1.removeChild(i1), u1;
        }, n1.s = function(t2, n3) {
            n3.parentNode.insertBefore(t2, n3.nextSibling);
        }, t1;
    }()), M = new (function() {
        function t1() {
            this.h = [], this.v = -1;
        }
        var e1 = t1.prototype;
        return e1.init = function(t2, n1) {
            this.l = "barba";
            var r3 = {
                ns: n1,
                scroll: {
                    x: window.scrollX,
                    y: window.scrollY
                },
                url: t2
            };
            this.h.push(r3), this.v = 0;
            var e2 = {
                from: this.l,
                index: 0,
                states: [].concat(this.h)
            };
            window.history && window.history.replaceState(e2, "", t2);
        }, e1.change = function(t2, n1, r3) {
            if (r3 && r3.state) {
                var e2 = r3.state, i1 = e2.index;
                n1 = this.m(this.v - i1), this.replace(e2.states), this.v = i1;
            } else this.add(t2, n1);
            return n1;
        }, e1.add = function(t2, n1) {
            var r3 = this.size, e3 = this.p(n1), i2 = {
                ns: "tmp",
                scroll: {
                    x: window.scrollX,
                    y: window.scrollY
                },
                url: t2
            };
            this.h.push(i2), this.v = r3;
            var o1 = {
                from: this.l,
                index: r3,
                states: [].concat(this.h)
            };
            switch(e3){
                case "push":
                    window.history && window.history.pushState(o1, "", t2);
                    break;
                case "replace":
                    window.history && window.history.replaceState(o1, "", t2);
            }
        }, e1.update = function(t2, n1) {
            var e3 = n1 || this.v, i2 = r2({
            }, this.get(e3), {
            }, t2);
            this.set(e3, i2);
        }, e1.remove = function(t2) {
            t2 ? this.h.splice(t2, 1) : this.h.pop(), this.v--;
        }, e1.clear = function() {
            this.h = [], this.v = -1;
        }, e1.replace = function(t2) {
            this.h = t2;
        }, e1.get = function(t2) {
            return this.h[t2];
        }, e1.set = function(t2, n1) {
            return this.h[t2] = n1;
        }, e1.p = function(t2) {
            var n1 = "push", r3 = t2, e3 = S.prefix + "-" + S.history;
            return r3.hasAttribute && r3.hasAttribute(e3) && (n1 = r3.getAttribute(e3)), n1;
        }, e1.m = function(t2) {
            return Math.abs(t2) > 1 ? t2 > 0 ? "forward" : "back" : 0 === t2 ? "popstate" : t2 > 0 ? "back" : "forward";
        }, n(t1, [
            {
                key: "current",
                get: function() {
                    return this.h[this.v];
                }
            },
            {
                key: "state",
                get: function() {
                    return this.h[this.h.length - 1];
                }
            },
            {
                key: "previous",
                get: function() {
                    return this.v < 1 ? null : this.h[this.v - 1];
                }
            },
            {
                key: "size",
                get: function() {
                    return this.h.length;
                }
            }
        ]), t1;
    }()), L = function(t1, n1) {
        try {
            var r3 = function() {
                if (!n1.next.html) return Promise.resolve(t1).then(function(t2) {
                    var r4 = n1.next;
                    if (t2) {
                        var e1 = j.toElement(t2);
                        r4.namespace = j.getNamespace(e1), r4.container = j.getContainer(e1), r4.html = t2, M.update({
                            ns: r4.namespace
                        });
                        var i2 = j.toDocument(t2);
                        document.title = i2.title;
                    }
                });
            }();
            return Promise.resolve(r3 && r3.then ? r3.then(function() {
            }) : void 0);
        } catch (t2) {
            return Promise.reject(t2);
        }
    }, $ = d, _ = {
        __proto__: null,
        update: L,
        nextTick: function() {
            return new Promise(function(t1) {
                window.requestAnimationFrame(t1);
            });
        },
        pathToRegexp: $
    }, q = function() {
        return window.location.origin;
    }, B = function(t1) {
        return (void 0) === t1 && (t1 = window.location.href), U(t1).port;
    }, U = function(t1) {
        var n1, r3 = t1.match(/:\d+/);
        if (null === r3) /^http/.test(t1) && (n1 = 80), /^https/.test(t1) && (n1 = 443);
        else {
            var e3 = r3[0].substring(1);
            n1 = parseInt(e3, 10);
        }
        var i3, o1 = t1.replace(q(), ""), u1 = {
        }, f1 = o1.indexOf("#");
        f1 >= 0 && (i3 = o1.slice(f1 + 1), o1 = o1.slice(0, f1));
        var s2 = o1.indexOf("?");
        return s2 >= 0 && (u1 = D(o1.slice(s2 + 1)), o1 = o1.slice(0, s2)), {
            hash: i3,
            path: o1,
            port: n1,
            query: u1
        };
    }, D = function(t1) {
        return t1.split("&").reduce(function(t2, n1) {
            var r3 = n1.split("=");
            return t2[r3[0]] = r3[1], t2;
        }, {
        });
    }, F = function(t1) {
        return (void 0) === t1 && (t1 = window.location.href), t1.replace(/(\/#.*|\/|#.*)$/, "");
    }, H = {
        __proto__: null,
        getHref: function() {
            return window.location.href;
        },
        getOrigin: q,
        getPort: B,
        getPath: function(t1) {
            return (void 0) === t1 && (t1 = window.location.href), U(t1).path;
        },
        parse: U,
        parseQuery: D,
        clean: F
    };
    function I(t1, n1, r3) {
        return (void 0) === n1 && (n1 = 2000), new Promise(function(e4, i3) {
            var o1 = new XMLHttpRequest;
            o1.onreadystatechange = function() {
                if (o1.readyState === XMLHttpRequest.DONE) {
                    if (200 === o1.status) e4(o1.responseText);
                    else if (o1.status) {
                        var n3 = {
                            status: o1.status,
                            statusText: o1.statusText
                        };
                        r3(t1, n3), i3(n3);
                    }
                }
            }, o1.ontimeout = function() {
                var e5 = new Error("Timeout error [" + n1 + "]");
                r3(t1, e5), i3(e5);
            }, o1.onerror = function() {
                var n4 = new Error("Fetch error");
                r3(t1, n4), i3(n4);
            }, o1.open("GET", t1), o1.timeout = n1, o1.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"), o1.setRequestHeader("x-barba", "yes"), o1.send();
        });
    }
    var C = function(t1) {
        return !!t1 && ("object" == typeof t1 || "function" == typeof t1) && "function" == typeof t1.then;
    };
    function N(t1, n1) {
        return (void 0) === n1 && (n1 = {
        }), function() {
            for(var r3 = arguments.length, e4 = new Array(r3), i3 = 0; i3 < r3; i3++)e4[i3] = arguments[i3];
            var o1 = false, u1 = new Promise(function(r4, i4) {
                n1.async = function() {
                    return o1 = true, function(t2, n4) {
                        t2 ? i4(t2) : r4(n4);
                    };
                };
                var u2 = t1.apply(n1, e4);
                o1 || (C(u2) ? u2.then(r4, i4) : r4(u2));
            });
            return u1;
        };
    }
    var X = new (function(t1) {
        function n1() {
            var n4;
            return (n4 = t1.call(this) || this).logger = new l("@barba/core"), n4.all = [
                "ready",
                "page",
                "reset",
                "currentAdded",
                "currentRemoved",
                "nextAdded",
                "nextRemoved",
                "beforeOnce",
                "once",
                "afterOnce",
                "before",
                "beforeLeave",
                "leave",
                "afterLeave",
                "beforeEnter",
                "enter",
                "afterEnter",
                "after"
            ], n4.registered = new Map, n4.init(), n4;
        }
        e(n1, t1);
        var r3 = n1.prototype;
        return r3.init = function() {
            var t2 = this;
            this.registered.clear(), this.all.forEach(function(n4) {
                t2[n4] || (t2[n4] = function(r4, e4) {
                    t2.registered.has(n4) || t2.registered.set(n4, new Set), t2.registered.get(n4).add({
                        ctx: e4 || {
                        },
                        fn: r4
                    });
                });
            });
        }, r3.do = function(t2) {
            for(var n4 = this, r4 = arguments.length, e4 = new Array(r4 > 1 ? r4 - 1 : 0), i3 = 1; i3 < r4; i3++)e4[i3 - 1] = arguments[i3];
            if (this.registered.has(t2)) {
                var o1 = Promise.resolve();
                return this.registered.get(t2).forEach(function(t3) {
                    o1 = o1.then(function() {
                        return N(t3.fn, t3.ctx).apply(void 0, e4);
                    });
                }), o1.catch(function(r5) {
                    n4.logger.debug("Hook error [" + t2 + "]"), n4.logger.error(r5);
                });
            }
            return Promise.resolve();
        }, r3.clear = function() {
            var t2 = this;
            this.all.forEach(function(n4) {
                delete t2[n4];
            }), this.init();
        }, r3.help = function() {
            this.logger.info("Available hooks: " + this.all.join(","));
            var t2 = [];
            this.registered.forEach(function(n4, r4) {
                return t2.push(r4);
            }), this.logger.info("Registered hooks: " + t2.join(","));
        }, n1;
    }(h)), z = function() {
        function t1(t2) {
            if (this.P = [], "boolean" == typeof t2) this.g = t2;
            else {
                var n1 = Array.isArray(t2) ? t2 : [
                    t2
                ];
                this.P = n1.map(function(t3) {
                    return $(t3);
                });
            }
        }
        return t1.prototype.checkHref = function(t2) {
            if ("boolean" == typeof this.g) return this.g;
            var n4 = U(t2).path;
            return this.P.some(function(t3) {
                return null !== t3.exec(n4);
            });
        }, t1;
    }(), G = function(t1) {
        function n4(n5) {
            var r3;
            return (r3 = t1.call(this, n5) || this).k = new Map, r3;
        }
        e(n4, t1);
        var i3 = n4.prototype;
        return i3.set = function(t2, n5, r3) {
            return this.k.set(t2, {
                action: r3,
                request: n5
            }), {
                action: r3,
                request: n5
            };
        }, i3.get = function(t2) {
            return this.k.get(t2);
        }, i3.getRequest = function(t2) {
            return this.k.get(t2).request;
        }, i3.getAction = function(t2) {
            return this.k.get(t2).action;
        }, i3.has = function(t2) {
            return !this.checkHref(t2) && this.k.has(t2);
        }, i3.delete = function(t2) {
            return this.k.delete(t2);
        }, i3.update = function(t2, n5) {
            var e4 = r2({
            }, this.k.get(t2), {
            }, n5);
            return this.k.set(t2, e4), e4;
        }, n4;
    }(z), Q = function() {
        return !window.history.pushState;
    }, W = function(t1) {
        return !t1.el || !t1.href;
    }, J = function(t1) {
        var n4 = t1.event;
        return n4.which > 1 || n4.metaKey || n4.ctrlKey || n4.shiftKey || n4.altKey;
    }, K = function(t1) {
        var n4 = t1.el;
        return n4.hasAttribute("target") && "_blank" === n4.target;
    }, V = function(t1) {
        var n4 = t1.el;
        return (void 0) !== n4.protocol && window.location.protocol !== n4.protocol || (void 0) !== n4.hostname && window.location.hostname !== n4.hostname;
    }, Y = function(t1) {
        var n4 = t1.el;
        return (void 0) !== n4.port && B() !== B(n4.href);
    }, Z = function(t1) {
        var n4 = t1.el;
        return n4.getAttribute && "string" == typeof n4.getAttribute("download");
    }, tt = function(t1) {
        return t1.el.hasAttribute(S.prefix + "-" + S.prevent);
    }, nt = function(t1) {
        return Boolean(t1.el.closest("[" + S.prefix + "-" + S.prevent + '="all"]'));
    }, rt = function(t1) {
        var n4 = t1.href;
        return F(n4) === F() && B(n4) === B();
    }, et = function(t1) {
        function n4(n5) {
            var r3;
            return (r3 = t1.call(this, n5) || this).suite = [], r3.tests = new Map, r3.init(), r3;
        }
        e(n4, t1);
        var r3 = n4.prototype;
        return r3.init = function() {
            this.add("pushState", Q), this.add("exists", W), this.add("newTab", J), this.add("blank", K), this.add("corsDomain", V), this.add("corsPort", Y), this.add("download", Z), this.add("preventSelf", tt), this.add("preventAll", nt), this.add("sameUrl", rt, false);
        }, r3.add = function(t2, n5, r4) {
            (void 0) === r4 && (r4 = true), this.tests.set(t2, n5), r4 && this.suite.push(t2);
        }, r3.run = function(t2, n5, r4, e4) {
            return this.tests.get(t2)({
                el: n5,
                event: r4,
                href: e4
            });
        }, r3.checkLink = function(t2, n5, r4) {
            var e4 = this;
            return this.suite.some(function(i3) {
                return e4.run(i3, t2, n5, r4);
            });
        }, n4;
    }(z), it = function(t1) {
        function n4(r3, e4) {
            var i3;
            (void 0) === e4 && (e4 = "Barba error");
            for(var o2 = arguments.length, u1 = new Array(o2 > 2 ? o2 - 2 : 0), f1 = 2; f1 < o2; f1++)u1[f1 - 2] = arguments[f1];
            return (i3 = t1.call.apply(t1, [
                this
            ].concat(u1)) || this).error = r3, i3.label = e4, Error.captureStackTrace && Error.captureStackTrace(function(t2) {
                if ((void 0) === t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t2;
            }(i3), n4), i3.name = "BarbaError", i3;
        }
        return e(n4, t1), n4;
    }(f1(Error)), ot = function() {
        function t1(t2) {
            (void 0) === t2 && (t2 = []), this.logger = new l("@barba/core"), this.all = [], this.page = [], this.once = [], this.A = [
                {
                    name: "namespace",
                    type: "strings"
                },
                {
                    name: "custom",
                    type: "function"
                }
            ], t2 && (this.all = this.all.concat(t2)), this.update();
        }
        var n4 = t1.prototype;
        return n4.add = function(t2, n5) {
            switch(t2){
                case "rule":
                    this.A.splice(n5.position || 0, 0, n5.value);
                    break;
                case "transition":
                default:
                    this.all.push(n5);
            }
            this.update();
        }, n4.resolve = function(t2, n5) {
            var r3 = this;
            (void 0) === n5 && (n5 = {
            });
            var e4 = n5.once ? this.once : this.page;
            e4 = e4.filter(n5.self ? function(t3) {
                return t3.name && "self" === t3.name;
            } : function(t3) {
                return !t3.name || "self" !== t3.name;
            });
            var i3 = new Map, o2 = e4.find(function(e5) {
                var o3 = true, u1 = {
                };
                return !(!n5.self || "self" !== e5.name) || (r3.A.reverse().forEach(function(n6) {
                    o3 && (o3 = r3.R(e5, n6, t2, u1), e5.from && e5.to && (o3 = r3.R(e5, n6, t2, u1, "from") && r3.R(e5, n6, t2, u1, "to")), e5.from && !e5.to && (o3 = r3.R(e5, n6, t2, u1, "from")), !e5.from && e5.to && (o3 = r3.R(e5, n6, t2, u1, "to")));
                }), i3.set(e5, u1), o3);
            }), u1 = i3.get(o2), f1 = [];
            if (f1.push(n5.once ? "once" : "page"), n5.self && f1.push("self"), u1) {
                var s2, c2 = [
                    o2
                ];
                Object.keys(u1).length > 0 && c2.push(u1), (s2 = this.logger).info.apply(s2, [
                    "Transition found [" + f1.join(",") + "]"
                ].concat(c2));
            } else this.logger.info("No transition found [" + f1.join(",") + "]");
            return o2;
        }, n4.update = function() {
            var t2 = this;
            this.all = this.all.map(function(n5) {
                return t2.T(n5);
            }).sort(function(t3, n5) {
                return t3.priority - n5.priority;
            }).reverse().map(function(t3) {
                return delete t3.priority, t3;
            }), this.page = this.all.filter(function(t3) {
                return (void 0) !== t3.leave || (void 0) !== t3.enter;
            }), this.once = this.all.filter(function(t3) {
                return (void 0) !== t3.once;
            });
        }, n4.R = function(t2, n5, r3, e4, i3) {
            var o2 = true, u1 = false, f1 = t2, s3 = n5.name, c3 = s3, a5 = s3, h4 = s3, v3 = i3 ? f1[i3] : f1, l3 = "to" === i3 ? r3.next : r3.current;
            if (i3 ? v3 && v3[s3] : v3[s3]) {
                switch(n5.type){
                    case "strings":
                    default:
                        var d2 = Array.isArray(v3[c3]) ? v3[c3] : [
                            v3[c3]
                        ];
                        l3[c3] && -1 !== d2.indexOf(l3[c3]) && (u1 = true), -1 === d2.indexOf(l3[c3]) && (o2 = false);
                        break;
                    case "object":
                        var m2 = Array.isArray(v3[a5]) ? v3[a5] : [
                            v3[a5]
                        ];
                        l3[a5] ? (l3[a5].name && -1 !== m2.indexOf(l3[a5].name) && (u1 = true), -1 === m2.indexOf(l3[a5].name) && (o2 = false)) : o2 = false;
                        break;
                    case "function":
                        v3[h4](r3) ? u1 = true : o2 = false;
                }
                u1 && (i3 ? (e4[i3] = e4[i3] || {
                }, e4[i3][s3] = f1[i3][s3]) : e4[s3] = f1[s3]);
            }
            return o2;
        }, n4.O = function(t2, n5, r3) {
            var e4 = 0;
            return (t2[n5] || t2.from && t2.from[n5] || t2.to && t2.to[n5]) && (e4 += Math.pow(10, r3), t2.from && t2.from[n5] && (e4 += 1), t2.to && t2.to[n5] && (e4 += 2)), e4;
        }, n4.T = function(t2) {
            var n5 = this;
            t2.priority = 0;
            var r3 = 0;
            return this.A.forEach(function(e4, i3) {
                r3 += n5.O(t2, e4.name, i3 + 1);
            }), t2.priority = r3, t2;
        }, t1;
    }(), ut = function() {
        function t1(t2) {
            (void 0) === t2 && (t2 = []), this.logger = new l("@barba/core"), this.S = false, this.store = new ot(t2);
        }
        var r3 = t1.prototype;
        return r3.get = function(t2, n4) {
            return this.store.resolve(t2, n4);
        }, r3.doOnce = function(t2) {
            var n4 = t2.data, r4 = t2.transition;
            try {
                var e4 = function() {
                    i4.S = false;
                }, i4 = this, o2 = r4 || {
                };
                i4.S = true;
                var u1 = s(function() {
                    return Promise.resolve(i4.j("beforeOnce", n4, o2)).then(function() {
                        return Promise.resolve(i4.once(n4, o2)).then(function() {
                            return Promise.resolve(i4.j("afterOnce", n4, o2)).then(function() {
                            });
                        });
                    });
                }, function(t3) {
                    i4.S = false, i4.logger.debug("Transition error [before/after/once]"), i4.logger.error(t3);
                });
                return Promise.resolve(u1 && u1.then ? u1.then(e4) : e4());
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, r3.doPage = function(t2) {
            var n4 = t2.data, r4 = t2.transition, e4 = t2.page, i4 = t2.wrapper;
            try {
                var o2 = function(t3) {
                    if (u2) return t3;
                    f2.S = false;
                }, u2 = false, f2 = this, c3 = r4 || {
                }, a5 = true === c3.sync || false;
                f2.S = true;
                var h4 = s(function() {
                    function t3() {
                        return Promise.resolve(f2.j("before", n4, c3)).then(function() {
                            var t4 = false;
                            function r5(r6) {
                                return t4 ? r6 : Promise.resolve(f2.remove(n4)).then(function() {
                                    return Promise.resolve(f2.j("after", n4, c3)).then(function() {
                                    });
                                });
                            }
                            var o3 = function() {
                                if (a5) return s(function() {
                                    return Promise.resolve(f2.add(n4, i4)).then(function() {
                                        return Promise.resolve(f2.j("beforeLeave", n4, c3)).then(function() {
                                            return Promise.resolve(f2.j("beforeEnter", n4, c3)).then(function() {
                                                return Promise.resolve(Promise.all([
                                                    f2.leave(n4, c3),
                                                    f2.enter(n4, c3)
                                                ])).then(function() {
                                                    return Promise.resolve(f2.j("afterLeave", n4, c3)).then(function() {
                                                        return Promise.resolve(f2.j("afterEnter", n4, c3)).then(function() {
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                }, function(t5) {
                                    if (f2.M(t5)) throw new it(t5, "Transition error [sync]");
                                });
                                var r6 = function(r7) {
                                    return t4 ? r7 : s(function() {
                                        var t5 = function() {
                                            if (false !== o5) return Promise.resolve(f2.add(n4, i4)).then(function() {
                                                return Promise.resolve(f2.j("beforeEnter", n4, c3)).then(function() {
                                                    return Promise.resolve(f2.enter(n4, c3, o5)).then(function() {
                                                        return Promise.resolve(f2.j("afterEnter", n4, c3)).then(function() {
                                                        });
                                                    });
                                                });
                                            });
                                        }();
                                        if (t5 && t5.then) return t5.then(function() {
                                        });
                                    }, function(t5) {
                                        if (f2.M(t5)) throw new it(t5, "Transition error [before/after/enter]");
                                    });
                                }, o5 = false, u3 = s(function() {
                                    return Promise.resolve(f2.j("beforeLeave", n4, c3)).then(function() {
                                        return Promise.resolve(Promise.all([
                                            f2.leave(n4, c3),
                                            L(e4, n4)
                                        ]).then(function(t5) {
                                            return t5[0];
                                        })).then(function(t5) {
                                            return o5 = t5, Promise.resolve(f2.j("afterLeave", n4, c3)).then(function() {
                                            });
                                        });
                                    });
                                }, function(t5) {
                                    if (f2.M(t5)) throw new it(t5, "Transition error [before/after/leave]");
                                });
                                return u3 && u3.then ? u3.then(r6) : r6(u3);
                            }();
                            return o3 && o3.then ? o3.then(r5) : r5(o3);
                        });
                    }
                    var r5 = function() {
                        if (a5) return Promise.resolve(L(e4, n4)).then(function() {
                        });
                    }();
                    return r5 && r5.then ? r5.then(t3) : t3();
                }, function(t3) {
                    if (f2.S = false, t3.name && "BarbaError" === t3.name) throw f2.logger.debug(t3.label), f2.logger.error(t3.error), t3;
                    throw f2.logger.debug("Transition error [page]"), f2.logger.error(t3), t3;
                });
                return Promise.resolve(h4 && h4.then ? h4.then(o2) : o2(h4));
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, r3.once = function(t2, n4) {
            try {
                return Promise.resolve(X.do("once", t2, n4)).then(function() {
                    return n4.once ? N(n4.once, n4)(t2) : Promise.resolve();
                });
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, r3.leave = function(t2, n4) {
            try {
                return Promise.resolve(X.do("leave", t2, n4)).then(function() {
                    return n4.leave ? N(n4.leave, n4)(t2) : Promise.resolve();
                });
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, r3.enter = function(t2, n4, r4) {
            try {
                return Promise.resolve(X.do("enter", t2, n4)).then(function() {
                    return n4.enter ? N(n4.enter, n4)(t2, r4) : Promise.resolve();
                });
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, r3.add = function(t2, n4) {
            try {
                return j.addContainer(t2.next.container, n4), X.do("nextAdded", t2), Promise.resolve();
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, r3.remove = function(t2) {
            try {
                return j.removeContainer(t2.current.container), X.do("currentRemoved", t2), Promise.resolve();
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, r3.M = function(t2) {
            return t2.message ? !/Timeout error|Fetch error/.test(t2.message) : !t2.status;
        }, r3.j = function(t2, n4, r4) {
            try {
                return Promise.resolve(X.do(t2, n4, r4)).then(function() {
                    return r4[t2] ? N(r4[t2], r4)(n4) : Promise.resolve();
                });
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, n(t1, [
            {
                key: "isRunning",
                get: function() {
                    return this.S;
                },
                set: function(t2) {
                    this.S = t2;
                }
            },
            {
                key: "hasOnce",
                get: function() {
                    return this.store.once.length > 0;
                }
            },
            {
                key: "hasSelf",
                get: function() {
                    return this.store.all.some(function(t2) {
                        return "self" === t2.name;
                    });
                }
            },
            {
                key: "shouldWait",
                get: function() {
                    return this.store.all.some(function(t2) {
                        return t2.to && !t2.to.route || t2.sync;
                    });
                }
            }
        ]), t1;
    }(), ft = function() {
        function t1(t2) {
            var n4 = this;
            this.names = [
                "beforeLeave",
                "afterLeave",
                "beforeEnter",
                "afterEnter"
            ], this.byNamespace = new Map, 0 !== t2.length && (t2.forEach(function(t3) {
                n4.byNamespace.set(t3.namespace, t3);
            }), this.names.forEach(function(t3) {
                X[t3](n4.L(t3));
            }));
        }
        return t1.prototype.L = function(t2) {
            var n4 = this;
            return function(r3) {
                var e4 = t2.match(/enter/i) ? r3.next : r3.current, i4 = n4.byNamespace.get(e4.namespace);
                return i4 && i4[t2] ? N(i4[t2], i4)(r3) : Promise.resolve();
            };
        }, t1;
    }();
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(t1) {
        var n4 = this;
        do {
            if (n4.matches(t1)) return n4;
            n4 = n4.parentElement || n4.parentNode;
        }while (null !== n4 && 1 === n4.nodeType)
        return null;
    });
    var st = {
        container: null,
        html: "",
        namespace: "",
        url: {
            hash: "",
            href: "",
            path: "",
            port: null,
            query: {
            }
        }
    };
    return new (function() {
        function t1() {
            this.version = a, this.schemaPage = st, this.Logger = l, this.logger = new l("@barba/core"), this.plugins = [], this.hooks = X, this.dom = j, this.helpers = _, this.history = M, this.request = I, this.url = H;
        }
        var e4 = t1.prototype;
        return e4.use = function(t2, n4) {
            var r3 = this.plugins;
            r3.indexOf(t2) > -1 ? this.logger.warn("Plugin [" + t2.name + "] already installed.") : "function" == typeof t2.install ? (t2.install(this, n4), r3.push(t2)) : this.logger.warn("Plugin [" + t2.name + '] has no "install" method.');
        }, e4.init = function(t2) {
            var n4 = (void 0) === t2 ? {
            } : t2, e5 = n4.transitions, i4 = (void 0) === e5 ? [] : e5, o2 = n4.views, u2 = (void 0) === o2 ? [] : o2, f2 = n4.schema, s3 = (void 0) === f2 ? S : f2, c3 = n4.requestError, a5 = n4.timeout, h4 = (void 0) === a5 ? 2000 : a5, v3 = n4.cacheIgnore, d3 = (void 0) !== v3 && v3, m3 = n4.prefetchIgnore, p2 = (void 0) !== m3 && m3, w2 = n4.preventRunning, b2 = (void 0) !== w2 && w2, y1 = n4.prevent, P1 = (void 0) === y1 ? null : y1, g2 = n4.debug, E1 = n4.logLevel;
            if (l.setLevel(true === ((void 0) !== g2 && g2) ? "debug" : (void 0) === E1 ? "off" : E1), this.logger.info(this.version), Object.keys(s3).forEach(function(t3) {
                S[t3] && (S[t3] = s3[t3]);
            }), this.$ = c3, this.timeout = h4, this.cacheIgnore = d3, this.prefetchIgnore = p2, this.preventRunning = b2, this._ = this.dom.getWrapper(), !this._) throw new Error("[@barba/core] No Barba wrapper found");
            this._.setAttribute("aria-live", "polite"), this.q();
            var x1 = this.data.current;
            if (!x1.container) throw new Error("[@barba/core] No Barba container found");
            if (this.cache = new G(d3), this.prevent = new et(p2), this.transitions = new ut(i4), this.views = new ft(u2), null !== P1) {
                if ("function" != typeof P1) throw new Error("[@barba/core] Prevent should be a function");
                this.prevent.add("preventCustom", P1);
            }
            this.history.init(x1.url.href, x1.namespace), this.B = this.B.bind(this), this.U = this.U.bind(this), this.D = this.D.bind(this), this.F(), this.plugins.forEach(function(t3) {
                return t3.init();
            });
            var k1 = this.data;
            k1.trigger = "barba", k1.next = k1.current, k1.current = r2({
            }, this.schemaPage), this.hooks.do("ready", k1), this.once(k1), this.q();
        }, e4.destroy = function() {
            this.q(), this.H(), this.history.clear(), this.hooks.clear(), this.plugins = [];
        }, e4.force = function(t2) {
            window.location.assign(t2);
        }, e4.go = function(t2, n4, r3) {
            var e5;
            if ((void 0) === n4 && (n4 = "barba"), this.transitions.isRunning) this.force(t2);
            else if (!(e5 = "popstate" === n4 ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(t2) : this.prevent.run("sameUrl", null, null, t2)) || this.transitions.hasSelf) return n4 = this.history.change(t2, n4, r3), r3 && (r3.stopPropagation(), r3.preventDefault()), this.page(t2, n4, e5);
        }, e4.once = function(t2) {
            try {
                var n4 = this;
                return Promise.resolve(n4.hooks.do("beforeEnter", t2)).then(function() {
                    function r3() {
                        return Promise.resolve(n4.hooks.do("afterEnter", t2)).then(function() {
                        });
                    }
                    var e5 = function() {
                        if (n4.transitions.hasOnce) {
                            var r4 = n4.transitions.get(t2, {
                                once: true
                            });
                            return Promise.resolve(n4.transitions.doOnce({
                                transition: r4,
                                data: t2
                            })).then(function() {
                            });
                        }
                    }();
                    return e5 && e5.then ? e5.then(r3) : r3();
                });
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, e4.page = function(t2, n4, e5) {
            try {
                var i4 = function() {
                    var t3 = o2.data;
                    return Promise.resolve(o2.hooks.do("page", t3)).then(function() {
                        var n5 = s(function() {
                            var n6 = o2.transitions.get(t3, {
                                once: false,
                                self: e5
                            });
                            return Promise.resolve(o2.transitions.doPage({
                                data: t3,
                                page: u2,
                                transition: n6,
                                wrapper: o2._
                            })).then(function() {
                                o2.q();
                            });
                        }, function() {
                            0 === l.getLevel() && o2.force(t3.current.url.href);
                        });
                        if (n5 && n5.then) return n5.then(function() {
                        });
                    });
                }, o2 = this;
                o2.data.next.url = r2({
                    href: t2
                }, o2.url.parse(t2)), o2.data.trigger = n4;
                var u2 = o2.cache.has(t2) ? o2.cache.update(t2, {
                    action: "click"
                }).request : o2.cache.set(t2, o2.request(t2, o2.timeout, o2.onRequestError.bind(o2, n4)), "click").request, f2 = function() {
                    if (o2.transitions.shouldWait) return Promise.resolve(L(u2, o2.data)).then(function() {
                    });
                }();
                return Promise.resolve(f2 && f2.then ? f2.then(i4) : i4());
            } catch (t3) {
                return Promise.reject(t3);
            }
        }, e4.onRequestError = function(t2) {
            this.transitions.isRunning = false;
            for(var n4 = arguments.length, r3 = new Array(n4 > 1 ? n4 - 1 : 0), e5 = 1; e5 < n4; e5++)r3[e5 - 1] = arguments[e5];
            var i4 = r3[0], o2 = r3[1], u2 = this.cache.getAction(i4);
            return this.cache.delete(i4), this.$, this.$(t2, u2, i4, o2), this.force(i4), false;
        }, e4.prefetch = function(t2) {
            var n4 = this;
            this.cache.has(t2) || this.cache.set(t2, this.request(t2, this.timeout, this.onRequestError.bind(this, "barba")).catch(function(t3) {
                n4.logger.error(t3);
            }), "prefetch");
        }, e4.F = function() {
            true !== this.prefetchIgnore && (document.addEventListener("mouseover", this.B), document.addEventListener("touchstart", this.B)), document.addEventListener("click", this.U), window.addEventListener("popstate", this.D);
        }, e4.H = function() {
            true !== this.prefetchIgnore && (document.removeEventListener("mouseover", this.B), document.removeEventListener("touchstart", this.B)), document.removeEventListener("click", this.U), window.removeEventListener("popstate", this.D);
        }, e4.B = function(t2) {
            var n4 = this, r3 = this.I(t2);
            if (r3) {
                var e5 = this.dom.getHref(r3);
                this.prevent.checkHref(e5) || this.cache.has(e5) || this.cache.set(e5, this.request(e5, this.timeout, this.onRequestError.bind(this, r3)).catch(function(t3) {
                    n4.logger.error(t3);
                }), "enter");
            }
        }, e4.U = function(t2) {
            var n4 = this.I(t2);
            if (n4) return this.transitions.isRunning && this.preventRunning ? (t2.preventDefault(), void t2.stopPropagation()) : void this.go(this.dom.getHref(n4), n4, t2);
        }, e4.D = function(t2) {
            this.go(this.url.getHref(), "popstate", t2);
        }, e4.I = function(t2) {
            for(var n4 = t2.target; n4 && !this.dom.getHref(n4);)n4 = n4.parentNode;
            if (n4 && !this.prevent.checkLink(n4, t2, this.dom.getHref(n4))) return n4;
        }, e4.q = function() {
            var t2 = this.url.getHref(), n4 = {
                container: this.dom.getContainer(),
                html: this.dom.getHtml(),
                namespace: this.dom.getNamespace(),
                url: r2({
                    href: t2
                }, this.url.parse(t2))
            };
            this.C = {
                current: n4,
                next: r2({
                }, this.schemaPage),
                trigger: void 0
            }, this.hooks.do("reset", this.data);
        }, n(t1, [
            {
                key: "data",
                get: function() {
                    return this.C;
                }
            },
            {
                key: "wrapper",
                get: function() {
                    return this._;
                }
            }
        ]), t1;
    }());
});

},{}],"lsZ2q":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
class Dream {
    /* -------------------------- CYCLE METHODS -------------------------- */ // Cycle Back
    cycle() {
        return new Dream({
            elements: this.elements,
            selector: this.selector,
            getAll: true,
            index: 0
        });
    }
    newCycle(elements, selector) {
        return new Dream({
            elements,
            selector: selector ? selector : this.selector,
            getAll: true,
            index: 0
        });
    }
    /* -------------------------- DOM TREE METHOEDS -------------------------- */ // Return Elements
    nodes() {
        return this.single ? this.first : this.elements;
    }
    e() {
        return this.single ? this.first : this.elements;
    }
    remove() {
        this.elements.forEach((e)=>e.parentElement.removeChild(e)
        );
    }
    clear() {
        this.elements.forEach((e)=>e.innerHTML = ""
        );
        return this;
    }
    ancestor() {
        let level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        const ancestors = [];
        this.elements.forEach((element)=>{
            let e = element.parentElement;
            for(let i = 0; i < level; i++)e = e.parentElement;
            ancestors.push(e);
        });
        return this.newCycle(ancestors, "ancestor of \"".concat(this.selector, "\""));
    }
    parent() {
        return this.ancestor(1);
    }
    siblings() {
        const family = [];
        this.elements.map((brother)=>{
            let sister = brother.parentElement.firstChild;
            while(sister){
                if (sister !== brother && sister.nodeType === Node.ELEMENT_NODE) family.push(sister);
                sister = sister.nextElementSibling || sister.nextSibling;
            }
        });
        return this.newCycle(family, "siblings of \"".concat(this.selector, "\""));
    }
    children(selector) {
        let nodes = [];
        if (selector) this.elements.forEach((element)=>{
            nodes = nodes.concat(Array.from(element.querySelectorAll(selector)));
        });
        else this.elements.forEach((element)=>{
            nodes = nodes.concat(Array.from(element.children));
        });
        return this.newCycle(nodes, selector ? selector : "children of \"".concat(this.selector, "\""));
    }
    insert(content) {
        let position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "beforeend";
        this.elements.forEach((e)=>e.insertAdjacentHTML(position, content)
        );
        return this.cycle();
    }
    append(nodes) {
        const list = nodes instanceof Dream ? nodes.elements : [
            nodes
        ]; // Loop Thorugh And Append Children
        this.elements.forEach((e, index)=>{
            list.forEach((li)=>{
                e.appendChild(list.length === 1 && !index ? li : li.cloneNode(true));
            });
        });
        return this.cycle();
    }
    pop() {
        this.elements.forEach((e)=>e.removeChild(e.lastChild)
        );
    }
    idx(idx) {
        const node = [
            this.elements[idx]
        ];
        return this.newCycle(node, this.selector);
    }
    /* -------------------------- ELEMENT PROPERTIES -------------------------- */ // Convert Shorthand Keys
    static getElementKey(value) {
        let key;
        switch(value){
            case "html":
                key = "innerHTML";
                break;
            case "text":
                key = "textContent";
                break;
            case "top":
                key = "offsetTop";
                break;
            case "height":
                key = "offsetHeight";
            default:
                key = value;
        }
        return key;
    }
    static parse(type, value) {
        switch(type.toLowerCase()){
            case "int":
            case "i":
                return parseInt(value);
            case "float":
            case "f":
                return parseFloat(value);
            case "json":
                return JSON.parse(value);
            default:
                return value;
        }
    }
    get() {
        let attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "value";
        let parse = arguments.length > 1 ? arguments[1] : undefined;
        const key = this.constructor.getElementKey(attr);
        const values = this.elements.map((e)=>parse ? this.constructor.parse(parse, e[key]) : e[key]
        );
        return this.single ? values[0] : values;
    }
    set(attr, value) {
        const key = this.constructor.getElementKey(attr);
        this.elements.forEach((e)=>e.setAttribute(key, value)
        );
        return this;
    }
    val(parse) {
        return this.get('value', parse); //return value !== undefined || value !== null ? this.set( "value", value ) : this.get( "value", parse );
    }
    setVal(value) {
        return this.set('value', value);
    }
    has(attr) {
        const retrieve = (e)=>{
            return e.hasAttribute(attr);
        };
        return this.single ? retrieve(this.first) : this.elements.map((e)=>retrieve(e)
        );
    }
    setData(attr, value) {
        this.elements.forEach((e)=>e.dataset[attr] = value
        );
        return this.cycle();
    }
    data() {
        let attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        let parse = arguments.length > 1 ? arguments[1] : undefined;
        const retrieve = (e)=>{
            const data = e.dataset[attr];
            return attr ? parse && data ? this.constructor.parse(parse, data) : data : e.dataset;
        };
        return this.single ? retrieve(this.first) : this.elements.map((e)=>retrieve(e)
        );
    }
    height() {
        let unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        const heightOf = (e)=>e.offsetHeight + unit
        ;
        return this.single ? heightOf(this.first) : this.elements.map((e)=>heightOf(e)
        );
    }
    top() {
        let unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        const topOf = (e)=>e.offsetTop + unit
        ;
        return this.single ? topOf(this.first) : this.elements.map((e)=>topOf(e)
        );
    }
    position() {
        return this.single ? this.first.getBoundingClientRect() : this.elements.map((e)=>e.getBoundingClientRect()
        );
    }
    html(content, value) {
        if (!content) return this.get("innerHTML");
        if (Array.isArray(content)) this.elements.forEach((e, i)=>{
            e.innerHTML = content[i];
        });
        else this.elements.forEach((e)=>{
            e.innerHTML = content;
        });
        return this.cycle();
    }
    text(content, value) {
        if (!content) return this.get("textContent");
        if (Array.isArray(content)) this.elements.forEach((e, i)=>{
            e.textContent = content[i];
        });
        else this.elements.forEach((e)=>{
            e.textContent = content;
        });
        return this.cycle();
    }
    /* -------------------------- ELEMENT STYLE METHODS -------------------------- */ // Set Timeout Shortcut
    static timeout(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms)
        );
    }
    static getTransitionEndEventName() {
        const transitions = {
            "transition": "transitionend",
            "OTransition": "oTransitionEnd",
            "MozTransition": "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        };
        let bodyStyle = document.body.style;
        for(let transition in transitions){
            if (bodyStyle[transition] != undefined) return transitions[transition];
        }
    }
    clearClassList() {
        this.elements.forEach((e)=>Array.from(e.classList).forEach((className)=>e.classList.remove(className)
            )
        );
        return this;
    }
    addClass(classNames) {
        this.elements.forEach((e)=>classNames.split(' ').forEach((className)=>e.classList.add(className)
            )
        );
        return this;
    }
    removeClass(classNames) {
        this.elements.forEach((e)=>classNames.split(' ').forEach((className)=>e.classList.remove(className)
            )
        );
        return this;
    }
    toggle(name, force) {
        this.elements.forEach((e)=>e.classList.toggle(name, force)
        );
        return this.cycle();
    }
    css(properties) {
        this.elements.forEach((e)=>Object.assign(e.style, properties)
        );
        return this.cycle();
    }
    clearInlineStyles() {
        this.elements.forEach((e)=>e.removeAttribute('style')
        );
        return this;
    }
    async transition(style) {
        // 1. Get Transitionend Event Name
        const endEvent = this.constructor.getTransitionEndEventName(); // 2. Get Length Of Element Lists
        let length = this.elements.length; // 3. Await All Transitions To Complete
        await new Promise((resolve)=>{
            // Count Number Of Completed Animations
            let t = 0; // Function That Resolves Promise When Complete
            const trackEvents = ()=>{
                t++;
                if (t === length) resolve();
            }; // Loop Through Elements And Listen From Transitions
            this.elements.forEach((element)=>{
                // Convert Transition Duration To Number
                const duration = parseFloat(window.getComputedStyle(element).getPropertyValue('transition-duration').replace("s", "")); // If No Transition Shorten Length Of Elements
                if (!duration) return length--; // Devine Event Listener
                const finished = (e)=>{
                    element.removeEventListener('transitionend', finished);
                    trackEvents();
                }; // Attach Event Listener
                element.addEventListener('transitionend', finished);
            }); // Apply Desired CSS Properties
            this.css(style); // If No Elements Have Transitions Then Immediately Resolve
            if (!length) resolve();
        }); // For Debugging Purposes
        //console.log('all animations completed');
        // 4. Return Cycle
        return this.cycle();
    }
    hide() {
        let wait = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (!this.length) return Promise.resolve();
        const style = {
            "opacity": "0"
        };
        return wait ? this.transition(style) : this.css(style);
    }
    show() {
        let wait = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (!this.length) return Promise.resolve();
        const style = {
            "opacity": "1"
        };
        return wait ? this.transition(style) : this.css(style);
    }
    /* -------------------------- EVENT LISTENER METHODS -------------------------- */ // Attach Event Listeners
    on(eventType, eventAction) {
        this.elements.forEach((element)=>{
            eventType.split(" ").forEach((event)=>{
                element.addEventListener(event, eventAction);
            });
        });
        return this.cycle();
    }
    kill() {
        this.elements = this.elements.map((el)=>{
            const clone = el.cloneNode(true);
            el.parentNode.replaceChild(clone, el);
            return clone;
        });
        this.first = this.elements[0];
        return this;
    }
    off(shallow) {
        this.elements.forEach((element)=>element.removeEventListener(eventType, eventAction)
        ); // this.elements.forEach(element => {
        //     let clone;
        //     if (!shallow) {
        //         clone = element.cloneNode(true);
        //     }
        //     else {
        //         clone = element.cloneNode(false);
        //         while (element.hasChildNodes()) clone.appendChild(element.firstChild);
        //     }
        //     element.parentNode.replaceChild(clone, element);
        // });
        return this;
    }
    prevent(event, eventAction) {
        const action = eventAction ? (e)=>{
            e.preventDefault();
            eventAction(e);
        } : (e)=>e.preventDefault()
        ;
        return this.on(event, action);
    }
    click(action) {
        return this.on("click", action);
    }
    listenFor(eventTypes, selector, eventAction) {
        // Potential use of closest method. more research is needed
        // Loop Through And Delegate Events
        this.elements.forEach((parent)=>{
            // Filter Event Targets
            const delegate = (event)=>{
                // Get Potential Target Nodes
                const nodes = parent.querySelectorAll(selector);
                const target = event.target;
                nodes.forEach((node)=>{
                    let current = target;
                    while(current && current !== parent){
                        if (current === node) {
                            if (event.stopPropogation) event.stopPropogation();
                            return eventAction.call(node, event);
                        }
                        current = current.parentNode;
                    }
                });
            };
            eventTypes.split(' ').forEach((event)=>parent.addEventListener(event, delegate)
            );
        }); // Return Function To Be Chained
        return this.cycle();
    }
    dispatch(event) {
        this.elements.forEach((element)=>element.dispatchEvent(event)
        );
        return this;
    }
    fire(event) {
        return this.dispatch(new Event(event));
    }
    onresize(callback, bind) {
        const observer = new ResizeObserver(bind ? callback : ()=>callback()
        );
        this.elements.forEach((element)=>{
            observer.observe(element);
        });
        return this;
    }
    /* -------------------------- ELEMENT ARRAY METHODS -------------------------- */ // Iterate Over Function
    forEach(fn) {
        this.elements.forEach(fn);
        return this;
    }
    map(fn) {
        return this.elements.map(fn);
    }
    filter(test) {
        this.elements = Array.from(this.elements).filter(test);
        this.length = this.elements.length;
        return this;
    }
    concat(otherDream) {
        const elements = [
            ...this.elements,
            ...otherDream.elements
        ];
        return this.newCycle(elements, "".concat(this.selector || '').concat(this.selector ? ', ' : ' ').concat(otherDream.selector || ''));
    }
    /* -------------------------- OTHER METHODS -------------------------- */ // Delay Events
    async delay(time) {
        await this.constructor.timeout(time);
        return this.cycle();
    }
    static select(selector) {
        return Array.from(document.querySelectorAll(selector));
    }
    /* -------------------------- CLASS CONSTRUCTOR -------------------------- */ constructor(props){
        this.elements = props.getAll ? props.elements : [
            props.elements[props.index]
        ];
        this.selector = props.selector;
        this.root = props.elements[0] === window || props.elements[0] === document ? true : false;
        this.length = props.length;
        this.length = props.elements.length;
        this.single = props.elements.length === 1;
        this.first = props.elements[0];
    }
} // Create Timer class
class Timer {
    start(callback) {
        this.initial = new Date();
        if (!callback) return this;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(callback, this.threshold);
        return this;
    }
    stop() {
        this.final = new Date();
        this.elapsed = this.final - this.initial;
        this.remaining = this.elapsed >= this.threshold ? 0 : this.threshold - this.elapsed;
    }
    async hold() {
        this.stop();
        if (this.remaining) await Dream.timeout(this.remaining);
        return true;
    }
    reset() {
        this.elapsed = 0;
        this.remaining = 0;
    }
    constructor(){
        let threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;
        this.threshold = threshold;
        this.timeout = null;
    }
} // Initialize New Dom Class
const $ = (selector, index)=>{
    const isElement = typeof selector === 'object';
    return new Dream({
        elements: isElement ? selector.length ? selector : [
            selector
        ] : Dream.select(selector),
        selector: isElement ? null : selector,
        getAll: isElement ? true : index || index === 0 ? false : true,
        index: index
    });
}; // Export Async Delay Function
$.delay = async function(time) {
    let content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    await Dream.timeout(time);
    return content;
}; // Convert HTML String To Dream Class
$.html = (markup)=>{
    const html = markup.trim();
    const template = document.createElement('template');
    template.innerHTML = html;
    return new Dream({
        elements: Array.from(template.content.children),
        selector: null,
        getAll: true,
        index: null
    });
}; // Link Timer Class To Dreams
$.timer = (threshold1)=>new Timer(threshold1)
; // Check For Instance Of Dream
$.dreaming = (obj)=>obj instanceof Dream
; // Loop Through Opject
$.each = (obj, fx)=>{
    for (const [key, value] of Object.entries(obj))fx(key, value);
};
$.join = function() {
    for(var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++)items[_key] = arguments[_key];
    return items.map((i)=>{
        switch(typeof i){
            case 'string':
                return i;
            case 'object':
                if (i[0] && i[1]) return i[1];
                else if (i[0]) return i[0];
                else return null;
            default:
                return null;
        }
    }).filter((i)=>i
    ).join(' ') || null;
};
window.$ = $;
var _default = $;
exports.default = _default;

},{}],"2l4d1":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _Scroll = _interopRequireDefault(require("./Scroll"));
var _Navbar = _interopRequireDefault(require("./Navbar"));
var _Typewriter2 = _interopRequireDefault(require("./Typewriter"));
var _AppLoader = _interopRequireDefault(require("./helpers/AppLoader"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache1() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
        else newObj[key] = obj[key];
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
// Register Components
const componentsRegistry = {
    Typewriter: (dta, ctn)=>new _Typewriter2.default(dta !== null && dta !== void 0 ? dta : '#typewrite', ctn)
    ,
    FleetApp: (dta, ctn)=>new _AppLoader.default(dta, ctn, Promise.resolve().then(function() {
            return require('../apps/Fleet');
        }).then((res)=>_interopRequireWildcard(res)
        ))
    ,
    LoginApp: (dta, ctn)=>new _AppLoader.default(dta, ctn, Promise.resolve().then(function() {
            return require('../apps/Login');
        }).then((res)=>_interopRequireWildcard(res)
        ))
    ,
    BookingApp: (dta, ctn)=>new _AppLoader.default(dta, ctn, Promise.resolve().then(function() {
            return require('../apps/Booking');
        }).then((res)=>_interopRequireWildcard(res)
        ))
    ,
    ReviewsApp: (dta, ctn)=>new _AppLoader.default(dta, ctn, Promise.resolve().then(function() {
            return require('../apps/Reviews');
        }).then((res)=>_interopRequireWildcard(res)
        ))
}; // Create Page Class
class Page {
    init() {
        // Add Namespace Class to body
        this.elements.body.addClass("".concat(this.state.namespace, "-page")); // Initialize Crucial Modules
        this.scroll = new _Scroll.default(this);
        this.navbar = new _Navbar.default(this); // Return Class Instance
        return this;
    }
    async destroy() {
        // Hide Page
        $(this.elements.container).css({
            display: 'none'
        }); // Remove Page Class From Body
        this.elements.body.removeClass(Array.from(this.elements.body.e().classList).filter((name)=>name.includes('page')
        ).join(' ')); // Add Fixed Class
        this.elements.body.addClass('fixed'); // Destroy Scroll Instance
        this.scroll.destroy(); // Destroy Navbar Instance
        this.navbar.destroy(); // Return From Async Function
        return;
    }
    start() {
        this.scroll.init();
        this.navbar.init(); // Mount Remaining Components
        this.components.registrar.forEach((component)=>{
            this.components.mounted[component.name].init();
        });
        this.scroll.update();
    }
    async load() {
        await Promise.all(this.promises.map((c)=>c.load()
        ));
    }
    async loginRefresh() {
        // Destroy Navbar
        await this.navbar.refresh(); // Destroy Instances
        this.scroll.destroy(); // Create New Instances
        this.scroll = new _Scroll.default(this);
        this.navbar = new _Navbar.default(this); // Reinitialize Components
        this.scroll.init();
        this.navbar.init();
    }
    addComponent() {
        for(var _len = arguments.length, components = new Array(_len), _key = 0; _key < _len; _key++)components[_key] = arguments[_key];
        components.forEach((component)=>{
            const comp = typeof component == 'string' ? {
                name: component
            } : component; // Add Component to Registry
            this.components.registrar.push({
                name: comp.name,
                data: comp.data
            });
            const Component = componentsRegistry[comp.name](comp.data, this.elements.container); // Mount Component
            this.components.mounted[comp.name] = Component; // Push Components with Promises
            if (Component.load) this.promises.push(Component);
        });
    }
    constructor(_ref){
        var _barba$url$clean;
        let { barba , container  } = _ref;
        this.options = {
            smooth: true
        };
        this.elements = {
            container: container !== null && container !== void 0 ? container : $('main').e(),
            body: $('body')
        };
        this.state = {
            namespace: this.elements.container.dataset.barbaNamespace,
            isMobile: null,
            menuIsOpen: false,
            url: (_barba$url$clean = barba.url.clean()) !== null && _barba$url$clean !== void 0 ? _barba$url$clean : window.location.href
        };
        this.components = {
            registrar: [],
            mounted: {
            }
        };
        this.barba = barba;
        this.promises = [];
    }
}
exports.default = Page;

},{"./Scroll":"2MJU8","./Navbar":"3g1LQ","./Typewriter":"3dS2T","./helpers/AppLoader":"1m6OV","../apps/Fleet":"5vzVZ","../apps/Login":"51t1y","../apps/Booking":"10Hxt","../apps/Reviews":"6ZVLU"}],"2MJU8":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _locomotiveScroll = _interopRequireDefault(require("locomotive-scroll"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class Scroll {
    init() {
        // Define Elements
        this.body = this.page.elements.body;
        this.container = this.page.elements.container; // Attach Scroll Events
        this.attachEvents();
        this.locomotive.on('scroll', (e)=>this.onScroll(~~e.scroll.y)
        ); // Define Initial Values
        this.hidden = false;
        this.opacity = 0;
        this.position = window.pageXOffset; // Define Scroll Limits
        this.limits = {
            top: 0,
            bottom: this.locomotive.scroll.instance.limit
        }; // Update Values
        this.position = this.locomotive.scroll.instance.scroll.y; // Determine If Mobile
        this.isMobile = this.page.state.isMobile = this.locomotive.scroll.isMobile; // Remove Fixed Class If Mobile
        if (this.isMobile || !this.page.options.smooth) this.body.removeClass('fixed');
    }
    destroy() {
        this.locomotive.destroy();
    }
    attachEvents() {
        // Create New Locomotive Scroll Instance
        this.locomotive = new _locomotiveScroll.default({
            el: this.container,
            smooth: this.page.options.smooth,
            multiplier: this.scrollMultiplier,
            lerp: this.lerp,
            scrollFromAnywhere: true
        }); // Define Links
        this.links = $(this.container).children('a[href]').concat($('#navbar a, #nav-menu a').kill()); // Filter Out Relative Links
        this.links.filter((link)=>{
            // Remove Prevent Class From All Links
            link.classList.remove('prevent'); // Get Href and strip off ending Slash
            let href = link.href;
            if (href.endsWith('/')) href = href.slice(0, -1); // Determine if href matches url
            const match = {
                exact: this.page.state.url == href,
                hash: href.includes('#') && !href.split('#')[1]
            }; // If There is no match then filter out link
            if (!match.exact && !match.hash) return null; // Add Prevent class to remaining links
            link.classList.add('prevent'); // Add Event Listener To Link
            link.addEventListener('click', async (e)=>{
                e.preventDefault();
                this.to('top');
            }); // Return Link To Filtered array
            return link;
        });
    }
    onScroll(y) {
        if (y === this.position) return;
        this.position = y;
    }
    update() {
        this.locomotive.update();
    }
    pause() {
        this.locomotive.stop();
        if (this.isMobile) this.body.addClass('fixed');
    }
    resume() {
        this.locomotive.start();
        if (this.isMobile) this.body.removeClass('fixed');
    }
    async to(target) {
        var _options$duration, _options$offset, _Math$floor;
        let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        };
        let callback = arguments.length > 2 ? arguments[2] : undefined;
        let t = target;
        let duration = (_options$duration = options.duration) !== null && _options$duration !== void 0 ? _options$duration : 1000; //const easing = this.scrollEase;
        const offset = (_options$offset = options.offset) !== null && _options$offset !== void 0 ? _options$offset : 0;
        if (typeof t == 'string') {
            var _$$position$top;
            if (t === 'top') t = 0;
            else if (t === 'bottom') t = this.limits.bottom;
            else t = (_$$position$top = $(t).position().top) !== null && _$$position$top !== void 0 ? _$$position$top : 0;
        } else if (typeof t == 'object') {
            if ($.dreaming(t)) t = t.position().top;
            else t = $(t).position().top;
        } else if (typeof t == 'number') {
            if (t < 0) t = 0;
            else if (t > this.limits.bottom) t = this.limits.bottom;
        }
        duration = (_Math$floor = Math.floor(Math.abs(this.position - t) * this.smoothScrollMultiplier)) !== null && _Math$floor !== void 0 ? _Math$floor : 1000;
        await this.page.navbar.closeMenu();
        this.locomotive.scrollTo(t, {
            offset,
            duration,
            callback
        });
        await $.delay(duration);
        return 'Scrolling Complete';
    }
    constructor(page){
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        this.scrollMultiplier = isMac && isFirefox ? 4.8 : 1.2;
        this.smoothScrollMultiplier = 0.18;
        this.scrollEase = [
            0,
            0.28,
            1,
            0.69
        ];
        this.lerp = 0.2;
        this.page = page;
    }
}
exports.default = Scroll;

},{"locomotive-scroll":"kDWT5"}],"kDWT5":[function(require,module,exports) {
var global = arguments[3];
(function(global1, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global1 = typeof globalThis !== 'undefined' ? globalThis : global1 || self, global1.LocomotiveScroll = factory());
})(this, function() {
    'use strict';
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(target, props) {
        for(var i = 0; i < props.length; i++){
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function _defineProperty(obj, key, value) {
        if (key in obj) Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        else obj[key] = value;
        return obj;
    }
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread2(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i] != null ? arguments[i] : {
            };
            if (i % 2) ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
            else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            else ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
        return target;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf1(o1) {
            return o1.__proto__ || Object.getPrototypeOf(o1);
        };
        return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf1(o1, p1) {
            o1.__proto__ = p1;
            return o1;
        };
        return _setPrototypeOf(o, p);
    }
    function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
            Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            }));
            return true;
        } catch (e) {
            return false;
        }
    }
    function _assertThisInitialized(self) {
        if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return self;
    }
    function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) return call;
        return _assertThisInitialized(self);
    }
    function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
            var Super = _getPrototypeOf(Derived), result;
            if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else result = Super.apply(this, arguments);
            return _possibleConstructorReturn(this, result);
        };
    }
    function _superPropBase(object, property) {
        while(!Object.prototype.hasOwnProperty.call(object, property)){
            object = _getPrototypeOf(object);
            if (object === null) break;
        }
        return object;
    }
    function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) _get = Reflect.get;
        else _get = function _get1(target1, property1, receiver1) {
            var base = _superPropBase(target1, property1);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property1);
            if (desc.get) return desc.get.call(receiver1);
            return desc.value;
        };
        return _get(target, property, receiver || target);
    }
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }
    function _iterableToArrayLimit(arr, i) {
        if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally{
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
        return arr2;
    }
    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var defaults = {
        el: document,
        name: 'scroll',
        offset: [
            0,
            0
        ],
        repeat: false,
        smooth: false,
        initPosition: {
            x: 0,
            y: 0
        },
        direction: 'vertical',
        gestureDirection: 'vertical',
        reloadOnContextChange: false,
        lerp: 0.1,
        "class": 'is-inview',
        scrollbarContainer: false,
        scrollbarClass: 'c-scrollbar',
        scrollingClass: 'has-scroll-scrolling',
        draggingClass: 'has-scroll-dragging',
        smoothClass: 'has-scroll-smooth',
        initClass: 'has-scroll-init',
        getSpeed: false,
        getDirection: false,
        scrollFromAnywhere: false,
        multiplier: 1,
        firefoxMultiplier: 50,
        touchMultiplier: 2,
        resetNativeScroll: true,
        tablet: {
            smooth: false,
            direction: 'vertical',
            gestureDirection: 'vertical',
            breakpoint: 1024
        },
        smartphone: {
            smooth: false,
            direction: 'vertical',
            gestureDirection: 'vertical'
        }
    };
    var _default1 = /*#__PURE__*/ function() {
        function _default1() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            };
            _classCallCheck(this, _default1);
            Object.assign(this, defaults, options);
            this.smartphone = defaults.smartphone;
            if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
            this.tablet = defaults.tablet;
            if (options.tablet) Object.assign(this.tablet, options.tablet);
            this.namespace = 'locomotive';
            this.html = document.documentElement;
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
            this.windowMiddle = {
                x: this.windowWidth / 2,
                y: this.windowHeight / 2
            };
            this.els = {
            };
            this.currentElements = {
            };
            this.listeners = {
            };
            this.hasScrollTicking = false;
            this.hasCallEventSet = false;
            this.checkScroll = this.checkScroll.bind(this);
            this.checkResize = this.checkResize.bind(this);
            this.checkEvent = this.checkEvent.bind(this);
            this.instance = {
                scroll: {
                    x: 0,
                    y: 0
                },
                limit: {
                    x: this.html.offsetWidth,
                    y: this.html.offsetHeight
                },
                currentElements: this.currentElements
            };
            if (this.isMobile) {
                if (this.isTablet) this.context = 'tablet';
                else this.context = 'smartphone';
            } else this.context = 'desktop';
            if (this.isMobile) this.direction = this[this.context].direction;
            if (this.direction === 'horizontal') this.directionAxis = 'x';
            else this.directionAxis = 'y';
            if (this.getDirection) this.instance.direction = null;
            if (this.getDirection) this.instance.speed = 0;
            this.html.classList.add(this.initClass);
            window.addEventListener('resize', this.checkResize, false);
        }
        _createClass(_default1, [
            {
                key: "init",
                value: function init() {
                    this.initEvents();
                }
            },
            {
                key: "checkScroll",
                value: function checkScroll() {
                    this.dispatchScroll();
                }
            },
            {
                key: "checkResize",
                value: function checkResize() {
                    var _this = this;
                    if (!this.resizeTick) {
                        this.resizeTick = true;
                        requestAnimationFrame(function() {
                            _this.resize();
                            _this.resizeTick = false;
                        });
                    }
                }
            },
            {
                key: "resize",
                value: function resize() {
                }
            },
            {
                key: "checkContext",
                value: function checkContext() {
                    if (!this.reloadOnContextChange) return;
                    this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint;
                    this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint;
                    var oldContext = this.context;
                    if (this.isMobile) {
                        if (this.isTablet) this.context = 'tablet';
                        else this.context = 'smartphone';
                    } else this.context = 'desktop';
                    if (oldContext != this.context) {
                        var oldSmooth = oldContext == 'desktop' ? this.smooth : this[oldContext].smooth;
                        var newSmooth = this.context == 'desktop' ? this.smooth : this[this.context].smooth;
                        if (oldSmooth != newSmooth) window.location.reload();
                    }
                }
            },
            {
                key: "initEvents",
                value: function initEvents() {
                    var _this2 = this;
                    this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]"));
                    this.setScrollTo = this.setScrollTo.bind(this);
                    this.scrollToEls.forEach(function(el) {
                        el.addEventListener('click', _this2.setScrollTo, false);
                    });
                }
            },
            {
                key: "setScrollTo",
                value: function setScrollTo(event) {
                    event.preventDefault();
                    this.scrollTo(event.currentTarget.getAttribute("data-".concat(this.name, "-href")) || event.currentTarget.getAttribute('href'), {
                        offset: event.currentTarget.getAttribute("data-".concat(this.name, "-offset"))
                    });
                }
            },
            {
                key: "addElements",
                value: function addElements() {
                }
            },
            {
                key: "detectElements",
                value: function detectElements(hasCallEventSet) {
                    var _this3 = this;
                    var scrollTop = this.instance.scroll.y;
                    var scrollBottom = scrollTop + this.windowHeight;
                    var scrollLeft = this.instance.scroll.x;
                    var scrollRight = scrollLeft + this.windowWidth;
                    Object.entries(this.els).forEach(function(_ref) {
                        var _ref2 = _slicedToArray(_ref, 2), i = _ref2[0], el = _ref2[1];
                        if (el && (!el.inView || hasCallEventSet)) {
                            if (_this3.direction === 'horizontal') {
                                if (scrollRight >= el.left && scrollLeft < el.right) _this3.setInView(el, i);
                            } else if (scrollBottom >= el.top && scrollTop < el.bottom) _this3.setInView(el, i);
                        }
                        if (el && el.inView) {
                            if (_this3.direction === 'horizontal') {
                                var width = el.right - el.left;
                                el.progress = (_this3.instance.scroll.x - (el.left - _this3.windowWidth)) / (width + _this3.windowWidth);
                                if (scrollRight < el.left || scrollLeft > el.right) _this3.setOutOfView(el, i);
                            } else {
                                var height = el.bottom - el.top;
                                el.progress = (_this3.instance.scroll.y - (el.top - _this3.windowHeight)) / (height + _this3.windowHeight);
                                if (scrollBottom < el.top || scrollTop > el.bottom) _this3.setOutOfView(el, i);
                            }
                        }
                    }); // this.els = this.els.filter((current, i) => {
                    //     return current !== null;
                    // });
                    this.hasScrollTicking = false;
                }
            },
            {
                key: "setInView",
                value: function setInView(current, i) {
                    this.els[i].inView = true;
                    current.el.classList.add(current["class"]);
                    this.currentElements[i] = current;
                    if (current.call && this.hasCallEventSet) {
                        this.dispatchCall(current, 'enter');
                        if (!current.repeat) this.els[i].call = false;
                    } // if (!current.repeat && !current.speed && !current.sticky) {
                //     if (!current.call || current.call && this.hasCallEventSet) {
                //        this.els[i] = null
                //     }
                // }
                }
            },
            {
                key: "setOutOfView",
                value: function setOutOfView(current, i) {
                    var _this4 = this;
                    // if (current.repeat || current.speed !== undefined) {
                    this.els[i].inView = false; // }
                    Object.keys(this.currentElements).forEach(function(el) {
                        el === i && delete _this4.currentElements[el];
                    });
                    if (current.call && this.hasCallEventSet) this.dispatchCall(current, 'exit');
                    if (current.repeat) current.el.classList.remove(current["class"]);
                }
            },
            {
                key: "dispatchCall",
                value: function dispatchCall(current, way) {
                    this.callWay = way;
                    this.callValue = current.call.split(',').map(function(item) {
                        return item.trim();
                    });
                    this.callObj = current;
                    if (this.callValue.length == 1) this.callValue = this.callValue[0];
                    var callEvent = new Event(this.namespace + 'call');
                    this.el.dispatchEvent(callEvent);
                }
            },
            {
                key: "dispatchScroll",
                value: function dispatchScroll() {
                    var scrollEvent = new Event(this.namespace + 'scroll');
                    this.el.dispatchEvent(scrollEvent);
                }
            },
            {
                key: "setEvents",
                value: function setEvents(event, func) {
                    if (!this.listeners[event]) this.listeners[event] = [];
                    var list = this.listeners[event];
                    list.push(func);
                    if (list.length === 1) this.el.addEventListener(this.namespace + event, this.checkEvent, false);
                    if (event === 'call') {
                        this.hasCallEventSet = true;
                        this.detectElements(true);
                    }
                }
            },
            {
                key: "unsetEvents",
                value: function unsetEvents(event, func) {
                    if (!this.listeners[event]) return;
                    var list = this.listeners[event];
                    var index = list.indexOf(func);
                    if (index < 0) return;
                    list.splice(index, 1);
                    if (list.index === 0) this.el.removeEventListener(this.namespace + event, this.checkEvent, false);
                }
            },
            {
                key: "checkEvent",
                value: function checkEvent(event) {
                    var _this5 = this;
                    var name = event.type.replace(this.namespace, '');
                    var list = this.listeners[name];
                    if (!list || list.length === 0) return;
                    list.forEach(function(func) {
                        switch(name){
                            case 'scroll':
                                return func(_this5.instance);
                            case 'call':
                                return func(_this5.callValue, _this5.callWay, _this5.callObj);
                            default:
                                return func();
                        }
                    });
                }
            },
            {
                key: "startScroll",
                value: function startScroll() {
                }
            },
            {
                key: "stopScroll",
                value: function stopScroll() {
                }
            },
            {
                key: "setScroll",
                value: function setScroll(x, y) {
                    this.instance.scroll = {
                        x: 0,
                        y: 0
                    };
                }
            },
            {
                key: "destroy",
                value: function destroy() {
                    var _this6 = this;
                    window.removeEventListener('resize', this.checkResize, false);
                    Object.keys(this.listeners).forEach(function(event) {
                        _this6.el.removeEventListener(_this6.namespace + event, _this6.checkEvent, false);
                    });
                    this.listeners = {
                    };
                    this.scrollToEls.forEach(function(el) {
                        el.removeEventListener('click', _this6.setScrollTo, false);
                    });
                    this.html.classList.remove(this.initClass);
                }
            }
        ]);
        return _default1;
    }();
    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {
    };
    function createCommonjsModule(fn, module) {
        return module = {
            exports: {
            }
        }, fn(module, module.exports), module.exports;
    }
    var smoothscroll = createCommonjsModule(function(module, exports) {
        (function() {
            // polyfill
            function polyfill() {
                // aliases
                var w = window;
                var d = document;
                // return if scroll behavior is supported and polyfill is not forced
                if ('scrollBehavior' in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) return;
                // globals
                var Element1 = w.HTMLElement || w.Element;
                var SCROLL_TIME = 468;
                // object gathering original scroll methods
                var original = {
                    scroll: w.scroll || w.scrollTo,
                    scrollBy: w.scrollBy,
                    elementScroll: Element1.prototype.scroll || scrollElement,
                    scrollIntoView: Element1.prototype.scrollIntoView
                };
                // define timing method
                var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;
                /**
       * indicates if a the current browser is made by Microsoft
       * @method isMicrosoftBrowser
       * @param {String} userAgent
       * @returns {Boolean}
       */ function isMicrosoftBrowser(userAgent) {
                    var userAgentPatterns = [
                        'MSIE ',
                        'Trident/',
                        'Edge/'
                    ];
                    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
                }
                /*
       * IE has rounding bug rounding down clientHeight and clientWidth and
       * rounding up scrollHeight and scrollWidth causing false positives
       * on hasScrollableSpace
       */ var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;
                /**
       * changes scroll position inside an element
       * @method scrollElement
       * @param {Number} x
       * @param {Number} y
       * @returns {undefined}
       */ function scrollElement(x, y) {
                    this.scrollLeft = x;
                    this.scrollTop = y;
                }
                /**
       * returns result of applying ease math function to a number
       * @method ease
       * @param {Number} k
       * @returns {Number}
       */ function ease(k) {
                    return 0.5 * (1 - Math.cos(Math.PI * k));
                }
                /**
       * indicates if a smooth behavior should be applied
       * @method shouldBailOut
       * @param {Number|Object} firstArg
       * @returns {Boolean}
       */ function shouldBailOut(firstArg) {
                    if (firstArg === null || typeof firstArg !== 'object' || firstArg.behavior === undefined || firstArg.behavior === 'auto' || firstArg.behavior === 'instant') // first argument is not an object/null
                    // or behavior is auto, instant or undefined
                    return true;
                    if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') // first argument is an object and behavior is smooth
                    return false;
                    // throw error when behavior is not supported
                    throw new TypeError('behavior member of ScrollOptions ' + firstArg.behavior + ' is not a valid value for enumeration ScrollBehavior.');
                }
                /**
       * indicates if an element has scrollable space in the provided axis
       * @method hasScrollableSpace
       * @param {Node} el
       * @param {String} axis
       * @returns {Boolean}
       */ function hasScrollableSpace(el, axis) {
                    if (axis === 'Y') return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
                    if (axis === 'X') return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
                }
                /**
       * indicates if an element has a scrollable overflow property in the axis
       * @method canOverflow
       * @param {Node} el
       * @param {String} axis
       * @returns {Boolean}
       */ function canOverflow(el, axis) {
                    var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];
                    return overflowValue === 'auto' || overflowValue === 'scroll';
                }
                /**
       * indicates if an element can be scrolled in either axis
       * @method isScrollable
       * @param {Node} el
       * @param {String} axis
       * @returns {Boolean}
       */ function isScrollable(el) {
                    var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
                    var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');
                    return isScrollableY || isScrollableX;
                }
                /**
       * finds scrollable parent of an element
       * @method findScrollableParent
       * @param {Node} el
       * @returns {Node} el
       */ function findScrollableParent(el) {
                    while(el !== d.body && isScrollable(el) === false)el = el.parentNode || el.host;
                    return el;
                }
                /**
       * self invoked function that, given a context, steps through scrolling
       * @method step
       * @param {Object} context
       * @returns {undefined}
       */ function step(context) {
                    var time = now();
                    var value;
                    var currentX;
                    var currentY;
                    var elapsed = (time - context.startTime) / SCROLL_TIME;
                    // avoid elapsed times higher than one
                    elapsed = elapsed > 1 ? 1 : elapsed;
                    // apply easing to elapsed time
                    value = ease(elapsed);
                    currentX = context.startX + (context.x - context.startX) * value;
                    currentY = context.startY + (context.y - context.startY) * value;
                    context.method.call(context.scrollable, currentX, currentY);
                    // scroll more if we have not reached our destination
                    if (currentX !== context.x || currentY !== context.y) w.requestAnimationFrame(step.bind(w, context));
                }
                /**
       * scrolls window or element with a smooth behavior
       * @method smoothScroll
       * @param {Object|Node} el
       * @param {Number} x
       * @param {Number} y
       * @returns {undefined}
       */ function smoothScroll(el, x, y) {
                    var scrollable;
                    var startX;
                    var startY;
                    var method;
                    var startTime = now();
                    // define scroll context
                    if (el === d.body) {
                        scrollable = w;
                        startX = w.scrollX || w.pageXOffset;
                        startY = w.scrollY || w.pageYOffset;
                        method = original.scroll;
                    } else {
                        scrollable = el;
                        startX = el.scrollLeft;
                        startY = el.scrollTop;
                        method = scrollElement;
                    }
                    // scroll looping over a frame
                    step({
                        scrollable: scrollable,
                        method: method,
                        startTime: startTime,
                        startX: startX,
                        startY: startY,
                        x: x,
                        y: y
                    });
                }
                // ORIGINAL METHODS OVERRIDES
                // w.scroll and w.scrollTo
                w.scroll = w.scrollTo = function() {
                    // avoid action when no arguments are passed
                    if (arguments[0] === undefined) return;
                    // avoid smooth behavior if not required
                    if (shouldBailOut(arguments[0]) === true) {
                        original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : typeof arguments[0] !== 'object' ? arguments[0] : w.scrollX || w.pageXOffset, // use top prop, second argument if present or fallback to scrollY
                        arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);
                        return;
                    }
                    // LET THE SMOOTHNESS BEGIN!
                    smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
                };
                // w.scrollBy
                w.scrollBy = function() {
                    // avoid action when no arguments are passed
                    if (arguments[0] === undefined) return;
                    // avoid smooth behavior if not required
                    if (shouldBailOut(arguments[0])) {
                        original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : typeof arguments[0] !== 'object' ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);
                        return;
                    }
                    // LET THE SMOOTHNESS BEGIN!
                    smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
                };
                // Element.prototype.scroll and Element.prototype.scrollTo
                Element1.prototype.scroll = Element1.prototype.scrollTo = function() {
                    // avoid action when no arguments are passed
                    if (arguments[0] === undefined) return;
                    // avoid smooth behavior if not required
                    if (shouldBailOut(arguments[0]) === true) {
                        // if one number is passed, throw error to match Firefox implementation
                        if (typeof arguments[0] === 'number' && arguments[1] === undefined) throw new SyntaxError('Value could not be converted');
                        original.elementScroll.call(this, // use left prop, first number argument or fallback to scrollLeft
                        arguments[0].left !== undefined ? ~~arguments[0].left : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft, // use top prop, second argument or fallback to scrollTop
                        arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);
                        return;
                    }
                    var left = arguments[0].left;
                    var top = arguments[0].top;
                    // LET THE SMOOTHNESS BEGIN!
                    smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);
                };
                // Element.prototype.scrollBy
                Element1.prototype.scrollBy = function() {
                    // avoid action when no arguments are passed
                    if (arguments[0] === undefined) return;
                    // avoid smooth behavior if not required
                    if (shouldBailOut(arguments[0]) === true) {
                        original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
                        return;
                    }
                    this.scroll({
                        left: ~~arguments[0].left + this.scrollLeft,
                        top: ~~arguments[0].top + this.scrollTop,
                        behavior: arguments[0].behavior
                    });
                };
                // Element.prototype.scrollIntoView
                Element1.prototype.scrollIntoView = function() {
                    // avoid smooth behavior if not required
                    if (shouldBailOut(arguments[0]) === true) {
                        original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);
                        return;
                    }
                    // LET THE SMOOTHNESS BEGIN!
                    var scrollableParent = findScrollableParent(this);
                    var parentRects = scrollableParent.getBoundingClientRect();
                    var clientRects = this.getBoundingClientRect();
                    if (scrollableParent !== d.body) {
                        // reveal element inside parent
                        smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);
                        // reveal parent in viewport unless is fixed
                        if (w.getComputedStyle(scrollableParent).position !== 'fixed') w.scrollBy({
                            left: parentRects.left,
                            top: parentRects.top,
                            behavior: 'smooth'
                        });
                    } else // reveal element in viewport
                    w.scrollBy({
                        left: clientRects.left,
                        top: clientRects.top,
                        behavior: 'smooth'
                    });
                };
            }
            // commonjs
            module.exports = {
                polyfill: polyfill
            };
        })();
    });
    var smoothscroll_1 = smoothscroll.polyfill;
    var _default$1 = /*#__PURE__*/ function(_Core) {
        _inherits(_default2, _Core);
        var _super = _createSuper(_default2);
        function _default2() {
            var _this;
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            };
            _classCallCheck(this, _default2);
            _this = _super.call(this, options);
            if (_this.resetNativeScroll) {
                if (history.scrollRestoration) history.scrollRestoration = 'manual';
                window.scrollTo(0, 0);
            }
            window.addEventListener('scroll', _this.checkScroll, false);
            if (window.smoothscrollPolyfill === undefined) {
                window.smoothscrollPolyfill = smoothscroll;
                window.smoothscrollPolyfill.polyfill();
            }
            return _this;
        }
        _createClass(_default2, [
            {
                key: "init",
                value: function init() {
                    this.instance.scroll.y = window.pageYOffset;
                    this.addElements();
                    this.detectElements();
                    _get(_getPrototypeOf(_default2.prototype), "init", this).call(this);
                }
            },
            {
                key: "checkScroll",
                value: function checkScroll() {
                    var _this2 = this;
                    _get(_getPrototypeOf(_default2.prototype), "checkScroll", this).call(this);
                    if (this.getDirection) this.addDirection();
                    if (this.getSpeed) {
                        this.addSpeed();
                        this.speedTs = Date.now();
                    }
                    this.instance.scroll.y = window.pageYOffset;
                    if (Object.entries(this.els).length) {
                        if (!this.hasScrollTicking) {
                            requestAnimationFrame(function() {
                                _this2.detectElements();
                            });
                            this.hasScrollTicking = true;
                        }
                    }
                }
            },
            {
                key: "addDirection",
                value: function addDirection() {
                    if (window.pageYOffset > this.instance.scroll.y) {
                        if (this.instance.direction !== 'down') this.instance.direction = 'down';
                    } else if (window.pageYOffset < this.instance.scroll.y) {
                        if (this.instance.direction !== 'up') this.instance.direction = 'up';
                    }
                }
            },
            {
                key: "addSpeed",
                value: function addSpeed() {
                    if (window.pageYOffset != this.instance.scroll.y) this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs);
                    else this.instance.speed = 0;
                }
            },
            {
                key: "resize",
                value: function resize() {
                    if (Object.entries(this.els).length) {
                        this.windowHeight = window.innerHeight;
                        this.updateElements();
                    }
                }
            },
            {
                key: "addElements",
                value: function addElements() {
                    var _this3 = this;
                    this.els = {
                    };
                    var els = this.el.querySelectorAll('[data-' + this.name + ']');
                    els.forEach(function(el, index) {
                        var BCR = el.getBoundingClientRect();
                        var cl = el.dataset[_this3.name + 'Class'] || _this3["class"];
                        var id = typeof el.dataset[_this3.name + 'Id'] === 'string' ? el.dataset[_this3.name + 'Id'] : index;
                        var top;
                        var left;
                        var offset = typeof el.dataset[_this3.name + 'Offset'] === 'string' ? el.dataset[_this3.name + 'Offset'].split(',') : _this3.offset;
                        var repeat = el.dataset[_this3.name + 'Repeat'];
                        var call = el.dataset[_this3.name + 'Call'];
                        var target = el.dataset[_this3.name + 'Target'];
                        var targetEl;
                        if (target !== undefined) targetEl = document.querySelector("".concat(target));
                        else targetEl = el;
                        var targetElBCR = targetEl.getBoundingClientRect();
                        top = targetElBCR.top + _this3.instance.scroll.y;
                        left = targetElBCR.left + _this3.instance.scroll.x;
                        var bottom = top + targetEl.offsetHeight;
                        var right = left + targetEl.offsetWidth;
                        if (repeat == 'false') repeat = false;
                        else if (repeat != undefined) repeat = true;
                        else repeat = _this3.repeat;
                        var relativeOffset = _this3.getRelativeOffset(offset);
                        top = top + relativeOffset[0];
                        bottom = bottom - relativeOffset[1];
                        var mappedEl = {
                            el: el,
                            targetEl: targetEl,
                            id: id,
                            "class": cl,
                            top: top,
                            bottom: bottom,
                            left: left,
                            right: right,
                            offset: offset,
                            progress: 0,
                            repeat: repeat,
                            inView: false,
                            call: call
                        };
                        _this3.els[id] = mappedEl;
                        if (el.classList.contains(cl)) _this3.setInView(_this3.els[id], id);
                    });
                }
            },
            {
                key: "updateElements",
                value: function updateElements() {
                    var _this4 = this;
                    Object.entries(this.els).forEach(function(_ref) {
                        var _ref2 = _slicedToArray(_ref, 2), i = _ref2[0], el = _ref2[1];
                        var top = el.targetEl.getBoundingClientRect().top + _this4.instance.scroll.y;
                        var bottom = top + el.targetEl.offsetHeight;
                        var relativeOffset = _this4.getRelativeOffset(el.offset);
                        _this4.els[i].top = top + relativeOffset[0];
                        _this4.els[i].bottom = bottom - relativeOffset[1];
                    });
                    this.hasScrollTicking = false;
                }
            },
            {
                key: "getRelativeOffset",
                value: function getRelativeOffset(offset) {
                    var relativeOffset = [
                        0,
                        0
                    ];
                    if (offset) {
                        for(var i = 0; i < offset.length; i++)if (typeof offset[i] == 'string') {
                            if (offset[i].includes('%')) relativeOffset[i] = parseInt(offset[i].replace('%', '') * this.windowHeight / 100);
                            else relativeOffset[i] = parseInt(offset[i]);
                        } else relativeOffset[i] = offset[i];
                    }
                    return relativeOffset;
                }
            },
            {
                key: "scrollTo",
                value: function scrollTo(target) {
                    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                    };
                    // Parse options
                    var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target
                    var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)
                    if (typeof target === 'string') {
                        // Selector or boundaries
                        if (target === 'top') target = this.html;
                        else if (target === 'bottom') target = this.html.offsetHeight - window.innerHeight;
                        else {
                            target = document.querySelector(target); // If the query fails, abort
                            if (!target) return;
                        }
                    } else if (typeof target === 'number') // Absolute coordinate
                    target = parseInt(target);
                    else if (target && target.tagName) ;
                    else {
                        console.warn('`target` parameter is not valid');
                        return;
                    } // We have a target that is not a coordinate yet, get it
                    if (typeof target !== 'number') offset = target.getBoundingClientRect().top + offset + this.instance.scroll.y;
                    else offset = target + offset;
                    var isTargetReached = function isTargetReached1() {
                        return parseInt(window.pageYOffset) === parseInt(offset);
                    };
                    if (callback) {
                        if (isTargetReached()) {
                            callback();
                            return;
                        } else {
                            var onScroll = function onScroll1() {
                                if (isTargetReached()) {
                                    window.removeEventListener('scroll', onScroll1);
                                    callback();
                                }
                            };
                            window.addEventListener('scroll', onScroll);
                        }
                    }
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                }
            },
            {
                key: "update",
                value: function update() {
                    this.addElements();
                    this.detectElements();
                }
            },
            {
                key: "destroy",
                value: function destroy() {
                    _get(_getPrototypeOf(_default2.prototype), "destroy", this).call(this);
                    window.removeEventListener('scroll', this.checkScroll, false);
                }
            }
        ]);
        return _default2;
    }(_default1);
    /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */ /* eslint-disable no-unused-vars */ var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
        if (val === null || val === undefined) throw new TypeError('Object.assign cannot be called with null or undefined');
        return Object(val);
    }
    function shouldUseNative() {
        try {
            if (!Object.assign) return false;
            // Detect buggy property enumeration order in older V8 versions.
            // https://bugs.chromium.org/p/v8/issues/detail?id=4118
            var test1 = "abc"; // eslint-disable-line no-new-wrappers
            test1[5] = 'de';
            if (Object.getOwnPropertyNames(test1)[0] === '5') return false;
            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test2 = {
            };
            for(var i = 0; i < 10; i++)test2['_' + String.fromCharCode(i)] = i;
            var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
                return test2[n];
            });
            if (order2.join('') !== '0123456789') return false;
            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test3 = {
            };
            'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
                test3[letter] = letter;
            });
            if (Object.keys(Object.assign({
            }, test3)).join('') !== 'abcdefghijklmnopqrst') return false;
            return true;
        } catch (err) {
            // We don't expect any of the above to throw, but better to be safe.
            return false;
        }
    }
    var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for(var s = 1; s < arguments.length; s++){
            from = Object(arguments[s]);
            for(var key in from)if (hasOwnProperty.call(from, key)) to[key] = from[key];
            if (getOwnPropertySymbols) {
                symbols = getOwnPropertySymbols(from);
                for(var i = 0; i < symbols.length; i++)if (propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
            }
        }
        return to;
    };
    function E() {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
    }
    E.prototype = {
        on: function(name, callback, ctx) {
            var e = this.e || (this.e = {
            });
            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx: ctx
            });
            return this;
        },
        once: function(name, callback, ctx) {
            var self = this;
            function listener() {
                self.off(name, listener);
                callback.apply(ctx, arguments);
            }
            listener._ = callback;
            return this.on(name, listener, ctx);
        },
        emit: function(name) {
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this.e || (this.e = {
            }))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;
            for(; i < len; i++)evtArr[i].fn.apply(evtArr[i].ctx, data);
            return this;
        },
        off: function(name, callback) {
            var e = this.e || (this.e = {
            });
            var evts = e[name];
            var liveEvents = [];
            if (evts && callback) {
                for(var i = 0, len = evts.length; i < len; i++)if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
            }
            // Remove event from queue to prevent memory leak
            // Suggested by https://github.com/lazd
            // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
            liveEvents.length ? e[name] = liveEvents : delete e[name];
            return this;
        }
    };
    var tinyEmitter = E;
    var lethargy = createCommonjsModule(function(module, exports) {
        // Generated by CoffeeScript 1.9.2
        (function() {
            var root;
            root = exports !== null ? exports : this;
            root.Lethargy = (function() {
                function Lethargy(stability, sensitivity, tolerance, delay) {
                    this.stability = stability != null ? Math.abs(stability) : 8;
                    this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
                    this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
                    this.delay = delay != null ? delay : 150;
                    this.lastUpDeltas = (function() {
                        var i, ref, results;
                        results = [];
                        for(i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--)results.push(null);
                        return results;
                    }).call(this);
                    this.lastDownDeltas = (function() {
                        var i, ref, results;
                        results = [];
                        for(i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--)results.push(null);
                        return results;
                    }).call(this);
                    this.deltasTimestamp = (function() {
                        var i, ref, results;
                        results = [];
                        for(i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--)results.push(null);
                        return results;
                    }).call(this);
                }
                Lethargy.prototype.check = function(e) {
                    var lastDelta;
                    e = e.originalEvent || e;
                    if (e.wheelDelta != null) lastDelta = e.wheelDelta;
                    else if (e.deltaY != null) lastDelta = e.deltaY * -40;
                    else if (e.detail != null || e.detail === 0) lastDelta = e.detail * -40;
                    this.deltasTimestamp.push(Date.now());
                    this.deltasTimestamp.shift();
                    if (lastDelta > 0) {
                        this.lastUpDeltas.push(lastDelta);
                        this.lastUpDeltas.shift();
                        return this.isInertia(1);
                    } else {
                        this.lastDownDeltas.push(lastDelta);
                        this.lastDownDeltas.shift();
                        return this.isInertia(-1);
                    }
                };
                Lethargy.prototype.isInertia = function(direction) {
                    var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
                    lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
                    if (lastDeltas[0] === null) return direction;
                    if (this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[this.stability * 2 - 1]) return false;
                    lastDeltasOld = lastDeltas.slice(0, this.stability);
                    lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
                    oldSum = lastDeltasOld.reduce(function(t, s) {
                        return t + s;
                    });
                    newSum = lastDeltasNew.reduce(function(t, s) {
                        return t + s;
                    });
                    oldAverage = oldSum / lastDeltasOld.length;
                    newAverage = newSum / lastDeltasNew.length;
                    if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && this.sensitivity < Math.abs(newAverage)) return direction;
                    else return false;
                };
                Lethargy.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas;
                };
                Lethargy.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas;
                };
                return Lethargy;
            })();
        }).call(commonjsGlobal);
    });
    var support = function getSupport() {
        return {
            hasWheelEvent: 'onwheel' in document,
            hasMouseWheelEvent: 'onmousewheel' in document,
            hasTouch: 'ontouchstart' in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
            hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
            hasPointer: !!window.navigator.msPointerEnabled,
            hasKeyDown: 'onkeydown' in document,
            isFirefox: navigator.userAgent.indexOf('Firefox') > -1
        };
    }();
    var toString = Object.prototype.toString, hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    var bindallStandalone = function(object) {
        if (!object) return console.warn('bindAll requires at least one argument.');
        var functions = Array.prototype.slice.call(arguments, 1);
        if (functions.length === 0) for(var method in object){
            if (hasOwnProperty$1.call(object, method)) {
                if (typeof object[method] == 'function' && toString.call(object[method]) == "[object Function]") functions.push(method);
            }
        }
        for(var i = 0; i < functions.length; i++){
            var f = functions[i];
            object[f] = bind(object[f], object);
        }
    };
    /*
      Faster bind without specific-case checking. (see https://coderwall.com/p/oi3j3w).
      bindAll is only needed for events binding so no need to make slow fixes for constructor
      or partial application.
  */ function bind(func, context) {
        return function() {
            return func.apply(context, arguments);
        };
    }
    var Lethargy = lethargy.Lethargy;
    var EVT_ID = 'virtualscroll';
    var src = VirtualScroll;
    var keyCodes = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32
    };
    function VirtualScroll(options) {
        bindallStandalone(this, '_onWheel', '_onMouseWheel', '_onTouchStart', '_onTouchMove', '_onKeyDown');
        this.el = window;
        if (options && options.el) {
            this.el = options.el;
            delete options.el;
        }
        this.options = objectAssign({
            mouseMultiplier: 1,
            touchMultiplier: 2,
            firefoxMultiplier: 15,
            keyStep: 120,
            preventTouch: false,
            unpreventTouchClass: 'vs-touchmove-allowed',
            limitInertia: false,
            useKeyboard: true,
            useTouch: true
        }, options);
        if (this.options.limitInertia) this._lethargy = new Lethargy();
        this._emitter = new tinyEmitter();
        this._event = {
            y: 0,
            x: 0,
            deltaX: 0,
            deltaY: 0
        };
        this.touchStartX = null;
        this.touchStartY = null;
        this.bodyTouchAction = null;
        if (this.options.passive !== undefined) this.listenerOptions = {
            passive: this.options.passive
        };
    }
    VirtualScroll.prototype._notify = function(e) {
        var evt = this._event;
        evt.x += evt.deltaX;
        evt.y += evt.deltaY;
        this._emitter.emit(EVT_ID, {
            x: evt.x,
            y: evt.y,
            deltaX: evt.deltaX,
            deltaY: evt.deltaY,
            originalEvent: e
        });
    };
    VirtualScroll.prototype._onWheel = function(e) {
        var options = this.options;
        if (this._lethargy && this._lethargy.check(e) === false) return;
        var evt = this._event;
        // In Chrome and in Firefox (at least the new one)
        evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
        evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
        // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
        // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
        if (support.isFirefox && e.deltaMode == 1) {
            evt.deltaX *= options.firefoxMultiplier;
            evt.deltaY *= options.firefoxMultiplier;
        }
        evt.deltaX *= options.mouseMultiplier;
        evt.deltaY *= options.mouseMultiplier;
        this._notify(e);
    };
    VirtualScroll.prototype._onMouseWheel = function(e) {
        if (this.options.limitInertia && this._lethargy.check(e) === false) return;
        var evt = this._event;
        // In Safari, IE and in Chrome if 'wheel' isn't defined
        evt.deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0;
        evt.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;
        this._notify(e);
    };
    VirtualScroll.prototype._onTouchStart = function(e) {
        var t = e.targetTouches ? e.targetTouches[0] : e;
        this.touchStartX = t.pageX;
        this.touchStartY = t.pageY;
    };
    VirtualScroll.prototype._onTouchMove = function(e) {
        var options = this.options;
        if (options.preventTouch && !e.target.classList.contains(options.unpreventTouchClass)) e.preventDefault();
        var evt = this._event;
        var t = e.targetTouches ? e.targetTouches[0] : e;
        evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
        evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;
        this.touchStartX = t.pageX;
        this.touchStartY = t.pageY;
        this._notify(e);
    };
    VirtualScroll.prototype._onKeyDown = function(e) {
        var evt = this._event;
        evt.deltaX = evt.deltaY = 0;
        var windowHeight = window.innerHeight - 40;
        switch(e.keyCode){
            case keyCodes.LEFT:
            case keyCodes.UP:
                evt.deltaY = this.options.keyStep;
                break;
            case keyCodes.RIGHT:
            case keyCodes.DOWN:
                evt.deltaY = -this.options.keyStep;
                break;
            case e.shiftKey:
                evt.deltaY = windowHeight;
                break;
            case keyCodes.SPACE:
                evt.deltaY = -windowHeight;
                break;
            default:
                return;
        }
        this._notify(e);
    };
    VirtualScroll.prototype._bind = function() {
        if (support.hasWheelEvent) this.el.addEventListener('wheel', this._onWheel, this.listenerOptions);
        if (support.hasMouseWheelEvent) this.el.addEventListener('mousewheel', this._onMouseWheel, this.listenerOptions);
        if (support.hasTouch && this.options.useTouch) {
            this.el.addEventListener('touchstart', this._onTouchStart, this.listenerOptions);
            this.el.addEventListener('touchmove', this._onTouchMove, this.listenerOptions);
        }
        if (support.hasPointer && support.hasTouchWin) {
            this.bodyTouchAction = document.body.style.msTouchAction;
            document.body.style.msTouchAction = 'none';
            this.el.addEventListener('MSPointerDown', this._onTouchStart, true);
            this.el.addEventListener('MSPointerMove', this._onTouchMove, true);
        }
        if (support.hasKeyDown && this.options.useKeyboard) document.addEventListener('keydown', this._onKeyDown);
    };
    VirtualScroll.prototype._unbind = function() {
        if (support.hasWheelEvent) this.el.removeEventListener('wheel', this._onWheel);
        if (support.hasMouseWheelEvent) this.el.removeEventListener('mousewheel', this._onMouseWheel);
        if (support.hasTouch) {
            this.el.removeEventListener('touchstart', this._onTouchStart);
            this.el.removeEventListener('touchmove', this._onTouchMove);
        }
        if (support.hasPointer && support.hasTouchWin) {
            document.body.style.msTouchAction = this.bodyTouchAction;
            this.el.removeEventListener('MSPointerDown', this._onTouchStart, true);
            this.el.removeEventListener('MSPointerMove', this._onTouchMove, true);
        }
        if (support.hasKeyDown && this.options.useKeyboard) document.removeEventListener('keydown', this._onKeyDown);
    };
    VirtualScroll.prototype.on = function(cb, ctx) {
        this._emitter.on(EVT_ID, cb, ctx);
        var events = this._emitter.e;
        if (events && events[EVT_ID] && events[EVT_ID].length === 1) this._bind();
    };
    VirtualScroll.prototype.off = function(cb, ctx) {
        this._emitter.off(EVT_ID, cb, ctx);
        var events = this._emitter.e;
        if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
    };
    VirtualScroll.prototype.reset = function() {
        var evt = this._event;
        evt.x = 0;
        evt.y = 0;
    };
    VirtualScroll.prototype.destroy = function() {
        this._emitter.off();
        this._unbind();
    };
    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }
    function getTranslate(el) {
        var translate = {
        };
        if (!window.getComputedStyle) return;
        var style = getComputedStyle(el);
        var transform = style.transform || style.webkitTransform || style.mozTransform;
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        if (mat) {
            translate.x = mat ? parseFloat(mat[1].split(', ')[12]) : 0;
            translate.y = mat ? parseFloat(mat[1].split(', ')[13]) : 0;
        } else {
            mat = transform.match(/^matrix\((.+)\)$/);
            translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
            translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
        }
        return translate;
    }
    /**
   * Returns an array containing all the parent nodes of the given node
   * @param  {object} node
   * @return {array} parent nodes
   */ function getParents(elem) {
        // Set up a parent array
        var parents = []; // Push each parent element to the array
        for(; elem && elem !== document; elem = elem.parentNode)parents.push(elem);
         // Return our parent array
        return parents;
    } // https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
    /**
   * https://github.com/gre/bezier-easing
   * BezierEasing - use bezier curve for transition easing function
   * by Gaëtan Renaudeau 2014 - 2015 – MIT License
   */ // These values are established by empiricism with tests (tradeoff: performance VS precision)
    var NEWTON_ITERATIONS = 4;
    var NEWTON_MIN_SLOPE = 0.001;
    var SUBDIVISION_PRECISION = 0.0000001;
    var SUBDIVISION_MAX_ITERATIONS = 10;
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    var float32ArraySupported = typeof Float32Array === 'function';
    function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
    }
    function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
    }
    function C(aA1) {
        return 3 * aA1;
    }
    // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
    function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
    function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX, currentT, i = 0;
        do {
            currentT = aA + (aB - aA) / 2;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0) aB = currentT;
            else aA = currentT;
        }while (Math.abs(currentX) > SUBDIVISION_PRECISION && (++i) < SUBDIVISION_MAX_ITERATIONS)
        return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for(var i = 0; i < NEWTON_ITERATIONS; ++i){
            var currentSlope = getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0) return aGuessT;
            var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }
    function LinearEasing(x) {
        return x;
    }
    var src$1 = function bezier(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) throw new Error('bezier x values must be in [0, 1] range');
        if (mX1 === mY1 && mX2 === mY2) return LinearEasing;
        // Precompute samples table
        var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
        for(var i = 0; i < kSplineTableSize; ++i)sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        function getTForX(aX) {
            var intervalStart = 0;
            var currentSample = 1;
            var lastSample = kSplineTableSize - 1;
            for(; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample)intervalStart += kSampleStepSize;
            --currentSample;
            // Interpolate to provide an initial guess for t
            var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
            var guessForT = intervalStart + dist * kSampleStepSize;
            var initialSlope = getSlope(guessForT, mX1, mX2);
            if (initialSlope >= NEWTON_MIN_SLOPE) return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
            else if (initialSlope === 0) return guessForT;
            else return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
        return function BezierEasing(x) {
            // Because JavaScript number are imprecise, we should guarantee the extremes are right.
            if (x === 0) return 0;
            if (x === 1) return 1;
            return calcBezier(getTForX(x), mY1, mY2);
        };
    };
    var keyCodes$1 = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32,
        TAB: 9,
        PAGEUP: 33,
        PAGEDOWN: 34,
        HOME: 36,
        END: 35
    };
    var _default$2 = /*#__PURE__*/ function(_Core) {
        _inherits(_default2, _Core);
        var _super = _createSuper(_default2);
        function _default2() {
            var _this;
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            };
            _classCallCheck(this, _default2);
            if (history.scrollRestoration) history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
            _this = _super.call(this, options);
            if (_this.inertia) _this.lerp = _this.inertia * 0.1;
            _this.isScrolling = false;
            _this.isDraggingScrollbar = false;
            _this.isTicking = false;
            _this.hasScrollTicking = false;
            _this.parallaxElements = {
            };
            _this.stop = false;
            _this.scrollbarContainer = options.scrollbarContainer;
            _this.checkKey = _this.checkKey.bind(_assertThisInitialized(_this));
            window.addEventListener('keydown', _this.checkKey, false);
            return _this;
        }
        _createClass(_default2, [
            {
                key: "init",
                value: function init() {
                    var _this2 = this;
                    this.html.classList.add(this.smoothClass);
                    this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction);
                    this.instance = _objectSpread2({
                        delta: {
                            x: this.initPosition.x,
                            y: this.initPosition.y
                        },
                        scroll: {
                            x: this.initPosition.x,
                            y: this.initPosition.y
                        }
                    }, this.instance);
                    this.vs = new src({
                        el: this.scrollFromAnywhere ? document : this.el,
                        mouseMultiplier: navigator.platform.indexOf('Win') > -1 ? 1 : 0.4,
                        firefoxMultiplier: this.firefoxMultiplier,
                        touchMultiplier: this.touchMultiplier,
                        useKeyboard: false,
                        passive: true
                    });
                    this.vs.on(function(e) {
                        if (_this2.stop) return;
                        if (!_this2.isDraggingScrollbar) requestAnimationFrame(function() {
                            _this2.updateDelta(e);
                            if (!_this2.isScrolling) _this2.startScrolling();
                        });
                    });
                    this.setScrollLimit();
                    this.initScrollBar();
                    this.addSections();
                    this.addElements();
                    this.checkScroll(true);
                    this.transformElements(true, true);
                    _get(_getPrototypeOf(_default2.prototype), "init", this).call(this);
                }
            },
            {
                key: "setScrollLimit",
                value: function setScrollLimit() {
                    this.instance.limit.y = this.el.offsetHeight - this.windowHeight;
                    if (this.direction === 'horizontal') {
                        var totalWidth = 0;
                        var nodes = this.el.children;
                        for(var i = 0; i < nodes.length; i++)totalWidth += nodes[i].offsetWidth;
                        this.instance.limit.x = totalWidth - this.windowWidth;
                    }
                }
            },
            {
                key: "startScrolling",
                value: function startScrolling() {
                    this.startScrollTs = Date.now(); // Record timestamp
                    this.isScrolling = true;
                    this.checkScroll();
                    this.html.classList.add(this.scrollingClass);
                }
            },
            {
                key: "stopScrolling",
                value: function stopScrolling() {
                    cancelAnimationFrame(this.checkScrollRaf); // Prevent checkScroll to continue looping
                    if (this.scrollToRaf) {
                        cancelAnimationFrame(this.scrollToRaf);
                        this.scrollToRaf = null;
                    }
                    this.isScrolling = false;
                    this.instance.scroll.y = Math.round(this.instance.scroll.y);
                    this.html.classList.remove(this.scrollingClass);
                }
            },
            {
                key: "checkKey",
                value: function checkKey(e) {
                    var _this3 = this;
                    if (this.stop) {
                        // If we are stopped, we don't want any scroll to occur because of a keypress
                        // Prevent tab to scroll to activeElement
                        if (e.keyCode == keyCodes$1.TAB) requestAnimationFrame(function() {
                            // Make sure native scroll is always at top of page
                            _this3.html.scrollTop = 0;
                            document.body.scrollTop = 0;
                            _this3.html.scrollLeft = 0;
                            document.body.scrollLeft = 0;
                        });
                        return;
                    }
                    switch(e.keyCode){
                        case keyCodes$1.TAB:
                            // Do not remove the RAF
                            // It allows to override the browser's native scrollTo, which is essential
                            requestAnimationFrame(function() {
                                // Make sure native scroll is always at top of page
                                _this3.html.scrollTop = 0;
                                document.body.scrollTop = 0;
                                _this3.html.scrollLeft = 0;
                                document.body.scrollLeft = 0; // Request scrollTo on the focusedElement, putting it at the center of the screen
                                _this3.scrollTo(document.activeElement, {
                                    offset: -window.innerHeight / 2
                                });
                            });
                            break;
                        case keyCodes$1.UP:
                            this.instance.delta[this.directionAxis] -= 240;
                            break;
                        case keyCodes$1.DOWN:
                            this.instance.delta[this.directionAxis] += 240;
                            break;
                        case keyCodes$1.PAGEUP:
                            this.instance.delta[this.directionAxis] -= window.innerHeight;
                            break;
                        case keyCodes$1.PAGEDOWN:
                            this.instance.delta[this.directionAxis] += window.innerHeight;
                            break;
                        case keyCodes$1.HOME:
                            this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
                            break;
                        case keyCodes$1.END:
                            this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
                            break;
                        case keyCodes$1.SPACE:
                            if (!(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) {
                                if (e.shiftKey) this.instance.delta[this.directionAxis] -= window.innerHeight;
                                else this.instance.delta[this.directionAxis] += window.innerHeight;
                            }
                            break;
                        default:
                            return;
                    }
                    if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
                    if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
                    this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening
                    this.isScrolling = true;
                    this.checkScroll();
                    this.html.classList.add(this.scrollingClass);
                }
            },
            {
                key: "checkScroll",
                value: function checkScroll() {
                    var _this4 = this;
                    var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                    if (forced || this.isScrolling || this.isDraggingScrollbar) {
                        if (!this.hasScrollTicking) {
                            this.checkScrollRaf = requestAnimationFrame(function() {
                                return _this4.checkScroll();
                            });
                            this.hasScrollTicking = true;
                        }
                        this.updateScroll();
                        var distance = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]);
                        var timeSinceStart = Date.now() - this.startScrollTs; // Get the time since the scroll was started: the scroll can be stopped again only past 100ms
                        if (!this.animatingScroll && timeSinceStart > 100 && (distance < 0.5 && this.instance.delta[this.directionAxis] != 0 || distance < 0.5 && this.instance.delta[this.directionAxis] == 0)) this.stopScrolling();
                        Object.entries(this.sections).forEach(function(_ref) {
                            var _ref2 = _slicedToArray(_ref, 2), i = _ref2[0], section = _ref2[1];
                            if (section.persistent || _this4.instance.scroll[_this4.directionAxis] > section.offset[_this4.directionAxis] && _this4.instance.scroll[_this4.directionAxis] < section.limit[_this4.directionAxis]) {
                                if (_this4.direction === 'horizontal') _this4.transform(section.el, -_this4.instance.scroll[_this4.directionAxis], 0);
                                else _this4.transform(section.el, 0, -_this4.instance.scroll[_this4.directionAxis]);
                                if (!section.inView) {
                                    section.inView = true;
                                    section.el.style.opacity = 1;
                                    section.el.style.pointerEvents = 'all';
                                    section.el.setAttribute("data-".concat(_this4.name, "-section-inview"), '');
                                }
                            } else {
                                if (section.inView || forced) {
                                    section.inView = false;
                                    section.el.style.opacity = 0;
                                    section.el.style.pointerEvents = 'none';
                                    section.el.removeAttribute("data-".concat(_this4.name, "-section-inview"));
                                }
                                _this4.transform(section.el, 0, 0);
                            }
                        });
                        if (this.getDirection) this.addDirection();
                        if (this.getSpeed) {
                            this.addSpeed();
                            this.speedTs = Date.now();
                        }
                        this.detectElements();
                        this.transformElements();
                        if (this.hasScrollbar) {
                            var scrollBarTranslation = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis];
                            if (this.direction === 'horizontal') this.transform(this.scrollbarThumb, scrollBarTranslation, 0);
                            else this.transform(this.scrollbarThumb, 0, scrollBarTranslation);
                        }
                        _get(_getPrototypeOf(_default2.prototype), "checkScroll", this).call(this);
                        this.hasScrollTicking = false;
                    }
                }
            },
            {
                key: "resize",
                value: function resize() {
                    this.windowHeight = window.innerHeight;
                    this.windowWidth = window.innerWidth;
                    this.checkContext();
                    this.windowMiddle = {
                        x: this.windowWidth / 2,
                        y: this.windowHeight / 2
                    };
                    this.update();
                }
            },
            {
                key: "updateDelta",
                value: function updateDelta(e) {
                    var delta;
                    var gestureDirection = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
                    if (gestureDirection === 'both') delta = e.deltaX + e.deltaY;
                    else if (gestureDirection === 'vertical') delta = e.deltaY;
                    else if (gestureDirection === 'horizontal') delta = e.deltaX;
                    else delta = e.deltaY;
                    this.instance.delta[this.directionAxis] -= delta * this.multiplier;
                    if (this.instance.delta[this.directionAxis] < 0) this.instance.delta[this.directionAxis] = 0;
                    if (this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis]) this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis];
                }
            },
            {
                key: "updateScroll",
                value: function updateScroll(e) {
                    if (this.isScrolling || this.isDraggingScrollbar) this.instance.scroll[this.directionAxis] = lerp(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp);
                    else {
                        if (this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis]) this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]);
                        else if (this.instance.scroll.y < 0) this.setScroll(this.instance.scroll[this.directionAxis], 0);
                        else this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]);
                    }
                }
            },
            {
                key: "addDirection",
                value: function addDirection() {
                    if (this.instance.delta.y > this.instance.scroll.y) {
                        if (this.instance.direction !== 'down') this.instance.direction = 'down';
                    } else if (this.instance.delta.y < this.instance.scroll.y) {
                        if (this.instance.direction !== 'up') this.instance.direction = 'up';
                    }
                    if (this.instance.delta.x > this.instance.scroll.x) {
                        if (this.instance.direction !== 'right') this.instance.direction = 'right';
                    } else if (this.instance.delta.x < this.instance.scroll.x) {
                        if (this.instance.direction !== 'left') this.instance.direction = 'left';
                    }
                }
            },
            {
                key: "addSpeed",
                value: function addSpeed() {
                    if (this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis]) this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs);
                    else this.instance.speed = 0;
                }
            },
            {
                key: "initScrollBar",
                value: function initScrollBar() {
                    this.scrollbar = document.createElement('span');
                    this.scrollbarThumb = document.createElement('span');
                    this.scrollbar.classList.add("".concat(this.scrollbarClass));
                    this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb"));
                    this.scrollbar.append(this.scrollbarThumb);
                    if (this.scrollbarContainer) this.scrollbarContainer.append(this.scrollbar);
                    else document.body.append(this.scrollbar);
                     // Scrollbar Events
                    this.getScrollBar = this.getScrollBar.bind(this);
                    this.releaseScrollBar = this.releaseScrollBar.bind(this);
                    this.moveScrollBar = this.moveScrollBar.bind(this);
                    this.scrollbarThumb.addEventListener('mousedown', this.getScrollBar);
                    window.addEventListener('mouseup', this.releaseScrollBar);
                    window.addEventListener('mousemove', this.moveScrollBar); // Set scrollbar values
                    this.hasScrollbar = false;
                    if (this.direction == 'horizontal') {
                        if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                    } else {
                        if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                    }
                    this.hasScrollbar = true;
                    this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
                    this.scrollbarHeight = this.scrollbarBCR.height;
                    this.scrollbarWidth = this.scrollbarBCR.width;
                    if (this.direction === 'horizontal') this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px");
                    else this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
                    this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
                    this.scrollBarLimit = {
                        x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                        y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                    };
                }
            },
            {
                key: "reinitScrollBar",
                value: function reinitScrollBar() {
                    this.hasScrollbar = false;
                    if (this.direction == 'horizontal') {
                        if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                    } else {
                        if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                    }
                    this.hasScrollbar = true;
                    this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
                    this.scrollbarHeight = this.scrollbarBCR.height;
                    this.scrollbarWidth = this.scrollbarBCR.width;
                    if (this.direction === 'horizontal') this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px");
                    else this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px");
                    this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
                    this.scrollBarLimit = {
                        x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
                        y: this.scrollbarHeight - this.scrollbarThumbBCR.height
                    };
                }
            },
            {
                key: "destroyScrollBar",
                value: function destroyScrollBar() {
                    this.scrollbarThumb.removeEventListener('mousedown', this.getScrollBar);
                    window.removeEventListener('mouseup', this.releaseScrollBar);
                    window.removeEventListener('mousemove', this.moveScrollBar);
                    this.scrollbar.remove();
                }
            },
            {
                key: "getScrollBar",
                value: function getScrollBar(e) {
                    this.isDraggingScrollbar = true;
                    this.checkScroll();
                    this.html.classList.remove(this.scrollingClass);
                    this.html.classList.add(this.draggingClass);
                }
            },
            {
                key: "releaseScrollBar",
                value: function releaseScrollBar(e) {
                    this.isDraggingScrollbar = false;
                    this.html.classList.add(this.scrollingClass);
                    this.html.classList.remove(this.draggingClass);
                }
            },
            {
                key: "moveScrollBar",
                value: function moveScrollBar(e) {
                    var _this5 = this;
                    if (this.isDraggingScrollbar) requestAnimationFrame(function() {
                        var x = (e.clientX - _this5.scrollbarBCR.left) * 100 / _this5.scrollbarWidth * _this5.instance.limit.x / 100;
                        var y = (e.clientY - _this5.scrollbarBCR.top) * 100 / _this5.scrollbarHeight * _this5.instance.limit.y / 100;
                        if (y > 0 && y < _this5.instance.limit.y) _this5.instance.delta.y = y;
                        if (x > 0 && x < _this5.instance.limit.x) _this5.instance.delta.x = x;
                    });
                }
            },
            {
                key: "addElements",
                value: function addElements() {
                    var _this6 = this;
                    this.els = {
                    };
                    this.parallaxElements = {
                    }; // this.sections.forEach((section, y) => {
                    var els = this.el.querySelectorAll("[data-".concat(this.name, "]"));
                    els.forEach(function(el, index) {
                        // Try and find the target's parent section
                        var targetParents = getParents(el);
                        var section = Object.entries(_this6.sections).map(function(_ref3) {
                            var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], section1 = _ref4[1];
                            return section1;
                        }).find(function(section1) {
                            return targetParents.includes(section1.el);
                        });
                        var cl = el.dataset[_this6.name + 'Class'] || _this6["class"];
                        var id = typeof el.dataset[_this6.name + 'Id'] === 'string' ? el.dataset[_this6.name + 'Id'] : 'el' + index;
                        var top;
                        var left;
                        var repeat = el.dataset[_this6.name + 'Repeat'];
                        var call = el.dataset[_this6.name + 'Call'];
                        var position = el.dataset[_this6.name + 'Position'];
                        var delay = el.dataset[_this6.name + 'Delay'];
                        var direction = el.dataset[_this6.name + 'Direction'];
                        var sticky = typeof el.dataset[_this6.name + 'Sticky'] === 'string';
                        var speed = el.dataset[_this6.name + 'Speed'] ? parseFloat(el.dataset[_this6.name + 'Speed']) / 10 : false;
                        var offset = typeof el.dataset[_this6.name + 'Offset'] === 'string' ? el.dataset[_this6.name + 'Offset'].split(',') : _this6.offset;
                        var target = el.dataset[_this6.name + 'Target'];
                        var targetEl;
                        if (target !== undefined) targetEl = document.querySelector("".concat(target));
                        else targetEl = el;
                        var targetElBCR = targetEl.getBoundingClientRect();
                        if (section === null) {
                            top = targetElBCR.top + _this6.instance.scroll.y - getTranslate(targetEl).y;
                            left = targetElBCR.left + _this6.instance.scroll.x - getTranslate(targetEl).x;
                        } else if (!section.inView) {
                            top = targetElBCR.top - getTranslate(section.el).y - getTranslate(targetEl).y;
                            left = targetElBCR.left - getTranslate(section.el).x - getTranslate(targetEl).x;
                        } else {
                            top = targetElBCR.top + _this6.instance.scroll.y - getTranslate(targetEl).y;
                            left = targetElBCR.left + _this6.instance.scroll.x - getTranslate(targetEl).x;
                        }
                        var bottom = top + targetEl.offsetHeight;
                        var right = left + targetEl.offsetWidth;
                        var middle = {
                            x: (right - left) / 2 + left,
                            y: (bottom - top) / 2 + top
                        };
                        if (sticky) {
                            var elBCR = el.getBoundingClientRect();
                            var elTop = elBCR.top;
                            var elLeft = elBCR.left;
                            var elDistance = {
                                x: elLeft - left,
                                y: elTop - top
                            };
                            top += window.innerHeight;
                            left += window.innerWidth;
                            bottom = elTop + targetEl.offsetHeight - el.offsetHeight - elDistance[_this6.directionAxis];
                            right = elLeft + targetEl.offsetWidth - el.offsetWidth - elDistance[_this6.directionAxis];
                            middle = {
                                x: (right - left) / 2 + left,
                                y: (bottom - top) / 2 + top
                            };
                        }
                        if (repeat == 'false') repeat = false;
                        else if (repeat != undefined) repeat = true;
                        else repeat = _this6.repeat;
                        var relativeOffset = [
                            0,
                            0
                        ];
                        if (offset) {
                            if (_this6.direction === 'horizontal') {
                                for(var i = 0; i < offset.length; i++)if (typeof offset[i] == 'string') {
                                    if (offset[i].includes('%')) relativeOffset[i] = parseInt(offset[i].replace('%', '') * _this6.windowWidth / 100);
                                    else relativeOffset[i] = parseInt(offset[i]);
                                } else relativeOffset[i] = offset[i];
                                left = left + relativeOffset[0];
                                right = right - relativeOffset[1];
                            } else {
                                for(var i = 0; i < offset.length; i++)if (typeof offset[i] == 'string') {
                                    if (offset[i].includes('%')) relativeOffset[i] = parseInt(offset[i].replace('%', '') * _this6.windowHeight / 100);
                                    else relativeOffset[i] = parseInt(offset[i]);
                                } else relativeOffset[i] = offset[i];
                                top = top + relativeOffset[0];
                                bottom = bottom - relativeOffset[1];
                            }
                        }
                        var mappedEl = {
                            el: el,
                            id: id,
                            "class": cl,
                            section: section,
                            top: top,
                            middle: middle,
                            bottom: bottom,
                            left: left,
                            right: right,
                            offset: offset,
                            progress: 0,
                            repeat: repeat,
                            inView: false,
                            call: call,
                            speed: speed,
                            delay: delay,
                            position: position,
                            target: targetEl,
                            direction: direction,
                            sticky: sticky
                        };
                        _this6.els[id] = mappedEl;
                        if (el.classList.contains(cl)) _this6.setInView(_this6.els[id], id);
                        if (speed !== false || sticky) _this6.parallaxElements[id] = mappedEl;
                    }); // });
                }
            },
            {
                key: "addSections",
                value: function addSections() {
                    var _this7 = this;
                    this.sections = {
                    };
                    var sections = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                    if (sections.length === 0) sections = [
                        this.el
                    ];
                    sections.forEach(function(section, index) {
                        var id = typeof section.dataset[_this7.name + 'Id'] === 'string' ? section.dataset[_this7.name + 'Id'] : 'section' + index;
                        var sectionBCR = section.getBoundingClientRect();
                        var offset = {
                            x: sectionBCR.left - window.innerWidth * 1.5 - getTranslate(section).x,
                            y: sectionBCR.top - window.innerHeight * 1.5 - getTranslate(section).y
                        };
                        var limit = {
                            x: offset.x + sectionBCR.width + window.innerWidth * 2,
                            y: offset.y + sectionBCR.height + window.innerHeight * 2
                        };
                        var persistent = typeof section.dataset[_this7.name + 'Persistent'] === 'string';
                        section.setAttribute('data-scroll-section-id', id);
                        var mappedSection = {
                            el: section,
                            offset: offset,
                            limit: limit,
                            inView: false,
                            persistent: persistent,
                            id: id
                        };
                        _this7.sections[id] = mappedSection;
                    });
                }
            },
            {
                key: "transform",
                value: function transform(element, x, y, delay) {
                    var transform;
                    if (!delay) transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(x, ",").concat(y, ",0,1)");
                    else {
                        var start = getTranslate(element);
                        var lerpX = lerp(start.x, x, delay);
                        var lerpY = lerp(start.y, y, delay);
                        transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(lerpX, ",").concat(lerpY, ",0,1)");
                    }
                    element.style.webkitTransform = transform;
                    element.style.msTransform = transform;
                    element.style.transform = transform;
                }
            },
            {
                key: "transformElements",
                value: function transformElements(isForced) {
                    var _this8 = this;
                    var setAllElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                    var scrollRight = this.instance.scroll.x + this.windowWidth;
                    var scrollBottom = this.instance.scroll.y + this.windowHeight;
                    var scrollMiddle = {
                        x: this.instance.scroll.x + this.windowMiddle.x,
                        y: this.instance.scroll.y + this.windowMiddle.y
                    };
                    Object.entries(this.parallaxElements).forEach(function(_ref5) {
                        var _ref6 = _slicedToArray(_ref5, 2), i = _ref6[0], current = _ref6[1];
                        var transformDistance = false;
                        if (isForced) transformDistance = 0;
                        if (current.inView || setAllElements) switch(current.position){
                            case 'top':
                                transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
                                break;
                            case 'elementTop':
                                transformDistance = (scrollBottom - current.top) * -current.speed;
                                break;
                            case 'bottom':
                                transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollBottom + _this8.windowHeight) * current.speed;
                                break;
                            case 'left':
                                transformDistance = _this8.instance.scroll[_this8.directionAxis] * -current.speed;
                                break;
                            case 'elementLeft':
                                transformDistance = (scrollRight - current.left) * -current.speed;
                                break;
                            case 'right':
                                transformDistance = (_this8.instance.limit[_this8.directionAxis] - scrollRight + _this8.windowHeight) * current.speed;
                                break;
                            default:
                                transformDistance = (scrollMiddle[_this8.directionAxis] - current.middle[_this8.directionAxis]) * -current.speed;
                                break;
                        }
                        if (current.sticky) {
                            if (current.inView) {
                                if (_this8.direction === 'horizontal') transformDistance = _this8.instance.scroll.x - current.left + window.innerWidth;
                                else transformDistance = _this8.instance.scroll.y - current.top + window.innerHeight;
                            } else if (_this8.direction === 'horizontal') {
                                if (_this8.instance.scroll.x < current.left - window.innerWidth && _this8.instance.scroll.x < current.left - window.innerWidth / 2) transformDistance = 0;
                                else if (_this8.instance.scroll.x > current.right && _this8.instance.scroll.x > current.right + 100) transformDistance = current.right - current.left + window.innerWidth;
                                else transformDistance = false;
                            } else {
                                if (_this8.instance.scroll.y < current.top - window.innerHeight && _this8.instance.scroll.y < current.top - window.innerHeight / 2) transformDistance = 0;
                                else if (_this8.instance.scroll.y > current.bottom && _this8.instance.scroll.y > current.bottom + 100) transformDistance = current.bottom - current.top + window.innerHeight;
                                else transformDistance = false;
                            }
                        }
                        if (transformDistance !== false) {
                            if (current.direction === 'horizontal' || _this8.direction === 'horizontal' && current.direction !== 'vertical') _this8.transform(current.el, transformDistance, 0, isForced ? false : current.delay);
                            else _this8.transform(current.el, 0, transformDistance, isForced ? false : current.delay);
                        }
                    });
                }
            },
            {
                key: "scrollTo",
                value: function scrollTo(target) {
                    var _this9 = this;
                    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                    };
                    // Parse options
                    var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target
                    var duration = !isNaN(parseInt(options.duration)) ? parseInt(options.duration) : 1000; // Duration of the scroll animation in milliseconds
                    var easing = options.easing || [
                        0.25,
                        0,
                        0.35,
                        1
                    ]; // An array of 4 floats between 0 and 1 defining the bezier curve for the animation's easing. See http://greweb.me/bezier-easing-editor/example/
                    var disableLerp = options.disableLerp ? true : false; // Lerp effect won't be applied if set to true
                    var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)
                    easing = src$1.apply(void 0, _toConsumableArray(easing));
                    if (typeof target === 'string') {
                        // Selector or boundaries
                        if (target === 'top') target = 0;
                        else if (target === 'bottom') target = this.instance.limit.y;
                        else if (target === 'left') target = 0;
                        else if (target === 'right') target = this.instance.limit.x;
                        else {
                            target = document.querySelector(target); // If the query fails, abort
                            if (!target) return;
                        }
                    } else if (typeof target === 'number') // Absolute coordinate
                    target = parseInt(target);
                    else if (target && target.tagName) ;
                    else {
                        console.warn('`target` parameter is not valid');
                        return;
                    } // We have a target that is not a coordinate yet, get it
                    if (typeof target !== 'number') {
                        // Verify the given target belongs to this scroll scope
                        var targetInScope = getParents(target).includes(this.el);
                        if (!targetInScope) // If the target isn't inside our main element, abort any action
                        return;
                         // Get target offset from top
                        var targetBCR = target.getBoundingClientRect();
                        var offsetTop = targetBCR.top;
                        var offsetLeft = targetBCR.left; // Try and find the target's parent section
                        var targetParents = getParents(target);
                        var parentSection = targetParents.find(function(candidate) {
                            return Object.entries(_this9.sections).map(function(_ref7) {
                                var _ref8 = _slicedToArray(_ref7, 2), key = _ref8[0], section = _ref8[1];
                                return section;
                            }).find(function(section) {
                                return section.el == candidate;
                            }); // finally find the section that matches the candidate
                        });
                        var parentSectionOffset = 0;
                        if (parentSection) parentSectionOffset = getTranslate(parentSection)[this.directionAxis]; // We got a parent section, store it's current offset to remove it later
                        else // if no parent section is found we need to use instance scroll directly
                        parentSectionOffset = -this.instance.scroll[this.directionAxis];
                         // Final value of scroll destination : offsetTop + (optional offset given in options) - (parent's section translate)
                        if (this.direction === 'horizontal') offset = offsetLeft + offset - parentSectionOffset;
                        else offset = offsetTop + offset - parentSectionOffset;
                    } else offset = target + offset;
                     // Actual scrollto
                    // ==========================================================================
                    // Setup
                    var scrollStart = parseFloat(this.instance.delta[this.directionAxis]);
                    var scrollTarget = Math.max(0, Math.min(offset, this.instance.limit[this.directionAxis])); // Make sure our target is in the scroll boundaries
                    var scrollDiff = scrollTarget - scrollStart;
                    var render = function render1(p) {
                        if (disableLerp) {
                            if (_this9.direction === 'horizontal') _this9.setScroll(scrollStart + scrollDiff * p, _this9.instance.delta.y);
                            else _this9.setScroll(_this9.instance.delta.x, scrollStart + scrollDiff * p);
                        } else _this9.instance.delta[_this9.directionAxis] = scrollStart + scrollDiff * p;
                    }; // Prepare the scroll
                    this.animatingScroll = true; // This boolean allows to prevent `checkScroll()` from calling `stopScrolling` when the animation is slow (i.e. at the beginning of an EaseIn)
                    this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening
                    this.startScrolling(); // Restart the scroll
                    // Start the animation loop
                    var start = Date.now();
                    var loop = function loop1() {
                        var p = (Date.now() - start) / duration; // Animation progress
                        if (p > 1) {
                            // Animation ends
                            render(1);
                            _this9.animatingScroll = false;
                            if (duration == 0) _this9.update();
                            if (callback) callback();
                        } else {
                            _this9.scrollToRaf = requestAnimationFrame(loop1);
                            render(easing(p));
                        }
                    };
                    loop();
                }
            },
            {
                key: "update",
                value: function update() {
                    this.setScrollLimit();
                    this.addSections();
                    this.addElements();
                    this.detectElements();
                    this.updateScroll();
                    this.transformElements(true);
                    this.reinitScrollBar();
                    this.checkScroll(true);
                }
            },
            {
                key: "startScroll",
                value: function startScroll() {
                    this.stop = false;
                }
            },
            {
                key: "stopScroll",
                value: function stopScroll() {
                    this.stop = true;
                }
            },
            {
                key: "setScroll",
                value: function setScroll(x, y) {
                    this.instance = _objectSpread2(_objectSpread2({
                    }, this.instance), {
                    }, {
                        scroll: {
                            x: x,
                            y: y
                        },
                        delta: {
                            x: x,
                            y: y
                        },
                        speed: 0
                    });
                }
            },
            {
                key: "destroy",
                value: function destroy() {
                    _get(_getPrototypeOf(_default2.prototype), "destroy", this).call(this);
                    this.stopScrolling();
                    this.html.classList.remove(this.smoothClass);
                    this.vs.destroy();
                    this.destroyScrollBar();
                    window.removeEventListener('keydown', this.checkKey, false);
                }
            }
        ]);
        return _default2;
    }(_default1);
    var Smooth = /*#__PURE__*/ function() {
        function Smooth1() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            };
            _classCallCheck(this, Smooth1);
            this.options = options; // Override default options with given ones
            Object.assign(this, defaults, options);
            this.smartphone = defaults.smartphone;
            if (options.smartphone) Object.assign(this.smartphone, options.smartphone);
            this.tablet = defaults.tablet;
            if (options.tablet) Object.assign(this.tablet, options.tablet);
            if (!this.smooth && this.direction == 'horizontal') console.warn('🚨 `smooth:false` & `horizontal` direction are not yet compatible');
            if (!this.tablet.smooth && this.tablet.direction == 'horizontal') console.warn('🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)');
            if (!this.smartphone.smooth && this.smartphone.direction == 'horizontal') console.warn('🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)');
            this.init();
        }
        _createClass(Smooth1, [
            {
                key: "init",
                value: function init() {
                    this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint;
                    this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint;
                    if (this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet) this.scroll = new _default$2(this.options);
                    else this.scroll = new _default$1(this.options);
                    this.scroll.init();
                    if (window.location.hash) {
                        // Get the hash without the '#' and find the matching element
                        var id = window.location.hash.slice(1, window.location.hash.length);
                        var target = document.getElementById(id); // If found, scroll to the element
                        if (target) this.scroll.scrollTo(target);
                    }
                }
            },
            {
                key: "update",
                value: function update() {
                    this.scroll.update();
                }
            },
            {
                key: "start",
                value: function start() {
                    this.scroll.startScroll();
                }
            },
            {
                key: "stop",
                value: function stop() {
                    this.scroll.stopScroll();
                }
            },
            {
                key: "scrollTo",
                value: function scrollTo(target, options) {
                    this.scroll.scrollTo(target, options);
                }
            },
            {
                key: "setScroll",
                value: function setScroll(x, y) {
                    this.scroll.setScroll(x, y);
                }
            },
            {
                key: "on",
                value: function on(event, func) {
                    this.scroll.setEvents(event, func);
                }
            },
            {
                key: "off",
                value: function off(event, func) {
                    this.scroll.unsetEvents(event, func);
                }
            },
            {
                key: "destroy",
                value: function destroy() {
                    this.scroll.destroy();
                }
            }
        ]);
        return Smooth1;
    }();
    return Smooth;
});

},{}],"3g1LQ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _animejs = _interopRequireDefault(require("animejs"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
class Navbar {
    init() {
        this.loggedIn = !!window.currentUser._id;
        this.main.children('[data-nav-namespace]').concat(this.menu.children('[data-nav-namespace]')).forEach((l)=>{
            const link = $(l);
            const ns = link.data('navNamespace');
            link.removeClass('active');
            if (ns == this.namespace) link.addClass('active');
        }); // Update Selectors
        this.selectors = {
            account: ".navbar__profile .navbar__profile-menu",
            lang: '.navbar__lang-menu'
        }; // Handle Menu Open/Close
        this.menuBtn = this.main.children('.navbar__min');
        this.menuBtn.click(()=>this.toggleMenu()
        );
        this.main.children('.nb-clt').click(()=>this.toggleDesktopMenu(this.selectors.account, 'user')
        );
        this.main.children('.nb-lng').click(()=>this.toggleDesktopMenu(this.selectors.lang, 'lang')
        );
        this.escape = this.main.children('.nb-esc');
        this.escape.click(()=>this.handleEscapeClick()
        ); // Update Active Language
        this.main.children('.navbar__lang-menu li').concat(this.menu.children('.nav-menu__lang li')).forEach((l)=>{
            const link = $(l);
            const lang = link.data('navLang');
            link.click(()=>this.changeLocale(lang)
            );
        });
        $('.app-logout').click(()=>this.logout()
        );
    }
    changeLocale(lang) {
        if (lang == window.locale) return this.toggleDesktopMenu(this.selectors.lang, 'lang');
        const path = window.location.pathname.split('/');
        const { origin , search  } = window.location;
        if (lang === 'en') path.splice(1, 1);
        else if (lang === 'es') path.splice(1, 0, 'es');
        window.location.href = "".concat(origin).concat(path.join('/')).concat(search);
    }
    async handleEscapeClick() {
        let animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (this.state.user) this.toggleDesktopMenu(this.selectors.account, 'user', animate);
        if (this.state.lang) this.toggleDesktopMenu(this.selectors.lang, 'lang', animate);
    }
    async toggleDesktopMenu(selector, target) {
        let animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        // Close Menu
        const menu = this.main.children(selector); // Create Timeline
        const tl = _animejs.default.timeline({
            easing: 'easeOutQuad',
            duration: 250
        }); // Close Menu
        if (this.state[target]) {
            this.state[target] = false;
            this.escape.addClass('no-esc');
            if (animate) {
                tl.add({
                    targets: menu.e(),
                    opacity: [
                        1,
                        0
                    ]
                });
                await tl.finished;
            } else _animejs.default.set(menu.e(), {
                opacity: 0
            });
            menu.addClass('hidden');
        } else {
            await this.handleEscapeClick();
            menu.removeClass('hidden');
            this.state[target] = true;
            this.escape.removeClass('no-esc');
            if (animate) {
                tl.add({
                    targets: menu.e(),
                    opacity: [
                        0,
                        1
                    ]
                });
                await tl.finished;
            } else _animejs.default.set(menu.e(), {
                opacity: 1
            });
        }
    }
    async closeMenu() {
        if (this.state.menu) await this.toggleMenu();
    }
    async toggleMenu() {
        // Prevent Double Click
        if (this.state.isAnimating) return;
        this.state.isAnimating = true; // Pause Scroll
        this.scroll.pause(); // Select Elements
        const desktop = this.menu.children('.nav-menu__desktop');
        const mobile = this.menu.children('.nav-menu__mobile'); // Get Styles
        const styles = {
            desktop: window.getComputedStyle(desktop.e()).getPropertyValue('display'),
            mobile: window.getComputedStyle(mobile.e()).getPropertyValue('display')
        }; // Determine Which Menu To Open
        const isDesktop = styles.desktop !== 'none'; // Define Variables
        let targets = {
            lines: this.menuBtn.children('span').e()
        }; // Cretate Timeline
        const tl = _animejs.default.timeline({
            easing: 'easeOutQuad'
        }); // Assign Desktop Targets
        if (isDesktop) {
            const ref = desktop.children(".user-acct");
            ref.children('*').clearInlineStyles();
            const dt = {
                bg: ref.children(".user-acct__bg").e(),
                content: ref.children(".user-acct__content").e(),
                photo: ref.children(".user-acct__bg, .user-acct__photo, .user-acct__icon").e(),
                brand: desktop.children('.nav-menu__brand').e()
            };
            targets = _objectSpread(_objectSpread({
            }, targets), dt);
        } // Open The Menu
        if (!this.state.menu) {
            // Reveal Menu
            this.menu.removeClass('hidden'); // Animate Menu Icon
            tl.add({
                targets: targets.lines[0],
                translateY: [
                    0,
                    '0.5rem'
                ],
                duration: 200
            });
            tl.add({
                targets: targets.lines[1],
                translateY: [
                    0,
                    '-0.5rem'
                ],
                duration: 200
            }, '-=200');
            tl.add({
                targets: targets.lines[0],
                rotate: [
                    0,
                    '45deg'
                ],
                duration: 200
            });
            tl.add({
                targets: targets.lines[1],
                rotate: [
                    0,
                    '-45deg'
                ],
                duration: 200
            }, '-=200'); // Open Desktop Menu
            if (isDesktop) {
                tl.add({
                    targets: this.menu.children(".nav-menu__bg").e(),
                    scale: [
                        1,
                        200
                    ],
                    diration: 1200
                }, '-=400');
                tl.add({
                    targets: desktop.children('.nav-menu__image').e(),
                    opacity: [
                        0,
                        1
                    ],
                    duration: 250
                }, "-=300");
                tl.add({
                    targets: desktop.children('.nav-menu__image img').e(),
                    scale: [
                        1.2,
                        1
                    ],
                    duration: 900
                }, "-=250");
                tl.add({
                    targets: targets.photo,
                    scale: [
                        0,
                        1
                    ],
                    duration: 250
                }, "-=900");
                tl.add({
                    targets: targets.bg,
                    width: [
                        '10.4rem',
                        '100%'
                    ],
                    opacity: [
                        0,
                        1
                    ],
                    duration: 350
                }, "-=450");
                tl.add({
                    targets: targets.content,
                    opacity: [
                        0,
                        1
                    ],
                    translateY: [
                        15,
                        0
                    ],
                    duration: 250
                });
                tl.add({
                    targets: targets.brand,
                    opacity: [
                        0,
                        1
                    ],
                    duration: 250
                }, "-=250");
                tl.add({
                    targets: desktop.children(".animate-item").e(),
                    translateY: [
                        _animejs.default.stagger([
                            100,
                            25
                        ]),
                        0
                    ],
                    opacity: [
                        0,
                        1
                    ],
                    delay: _animejs.default.stagger([
                        0,
                        250
                    ]),
                    duration: 250
                }, "-=600");
            } else {
                tl.add({
                    targets: this.menu.children(".nav-menu__bg").e(),
                    scale: [
                        1,
                        120
                    ],
                    diration: 1200
                }, '-=400');
                tl.add({
                    targets: mobile.children(".animate-item").e(),
                    translateY: [
                        _animejs.default.stagger([
                            100,
                            25
                        ]),
                        0
                    ],
                    opacity: [
                        0,
                        1
                    ],
                    delay: _animejs.default.stagger([
                        0,
                        250
                    ]),
                    duration: 250
                }, "-=600");
            } // Wait for Animations to complete
            await tl.finished; // Update Menu State
            this.state.menu = true;
        } else {
            // Animate Menu Icon
            tl.add({
                targets: targets.lines[0],
                rotate: 0,
                duration: 200
            });
            tl.add({
                targets: targets.lines[1],
                rotate: 0,
                duration: 200
            }, '-=200');
            tl.add({
                targets: targets.lines[0],
                translateY: 0,
                duration: 200
            });
            tl.add({
                targets: targets.lines[1],
                translateY: 0,
                duration: 200
            }, '-=200'); // Close Desktop Menu
            if (isDesktop) {
                tl.add({
                    targets: targets.brand,
                    opacity: 0,
                    duration: 250
                }, "-=400");
                tl.add({
                    targets: targets.content,
                    opacity: 0,
                    translateY: 15,
                    duration: 250
                }, '-=250');
                tl.add({
                    targets: targets.bg,
                    width: '10.4rem',
                    duration: 300
                });
                tl.add({
                    targets: targets.photo,
                    scale: 0,
                    duration: 250
                });
                tl.add({
                    targets: desktop.children('.nav-menu__image img').e(),
                    scale: 1.2,
                    duration: 900
                }, "-=500");
                tl.add({
                    targets: desktop.children('.nav-menu__image').e(),
                    opacity: 0,
                    duration: 250
                }, "-=500");
                tl.add({
                    targets: desktop.children(".animate-item").e(),
                    translateY: _animejs.default.stagger([
                        -25,
                        -100
                    ]),
                    opacity: 0,
                    delay: _animejs.default.stagger([
                        0,
                        250
                    ]),
                    duration: 250
                }, "-=1000");
                tl.add({
                    targets: this.menu.children(".nav-menu__bg").e(),
                    scale: 1,
                    diration: 800,
                    easing: 'easeInQuad'
                }, '-=400');
            } else {
                tl.add({
                    targets: mobile.children(".animate-item").e(),
                    translateY: _animejs.default.stagger([
                        -25,
                        -100
                    ]),
                    opacity: 0,
                    delay: _animejs.default.stagger([
                        0,
                        250
                    ]),
                    duration: 250
                }, "-=400");
                tl.add({
                    targets: this.menu.children(".nav-menu__bg").e(),
                    scale: 1,
                    diration: 800,
                    easing: 'easeInQuad'
                }, '-=400');
            } // Wait for Animations to complete
            await tl.finished; // Update Menu State
            this.state.menu = false; // Hide Menu
            this.menu.addClass('hidden');
        }
        this.state.isAnimating = false; // Resume Scroll
        this.scroll.resume();
    }
    applyView(view) {
        this.main.removeClass("full min");
        this.main.addClass(view);
    }
    async logout() {
        await _axios.default('/auth/revoke-session');
        window.location.reload();
    }
    async refresh() {
        // Make Request
        const res = await _axios.default('/book');
        const { data  } = res; // Parse Elements
        const nav = $.html(data.split("<!--NBCTN-->")[1]);
        const navbarItems = nav.children("#navbar > *");
        const menuItems = nav.children("#nav-menu > *"); // Update Elements
        this.main.clear().append(navbarItems);
        this.menu.clear().append(menuItems);
        await this.handleEscapeClick();
    }
    destroy() {
        this.handleEscapeClick(false);
        this.main.kill();
    }
    constructor(page){
        this.scroll = page.scroll;
        this.namespace = page.state.namespace;
        this.main = $('#navbar');
        this.menu = $('#nav-menu');
        this.state = {
            menu: false,
            lang: false,
            user: false,
            isAnimating: false
        };
    }
}
exports.default = Navbar;

},{"animejs":"1GvRs","axios":"5FCRD"}],"5FCRD":[function(require,module,exports) {
module.exports = require('./lib/axios');

},{"./lib/axios":"2poYk"}],"2poYk":[function(require,module,exports) {
'use strict';
var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */ function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);
    // Copy context to instance
    utils.extend(instance, context);
    return instance;
}
// Create the default instance to be exported
var axios = createInstance(defaults);
// Expose Axios class to allow class inheritance
axios.Axios = Axios;
// Factory for creating new instances
axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
// Expose all/spread
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = require('./helpers/spread');
// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');
module.exports = axios;
// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"5vHyL","./helpers/bind":"1KLet","./core/Axios":"5zOrB","./core/mergeConfig":"55g4J","./defaults":"29rIw","./cancel/Cancel":"7BpGl","./cancel/CancelToken":"5obBc","./cancel/isCancel":"GzHa4","./helpers/spread":"2zQEi","./helpers/isAxiosError":"113Ns"}],"5vHyL":[function(require,module,exports) {
'use strict';
var bind = require('./helpers/bind');
/*global toString:true*/ // utils is a library of generic helper functions non-specific to axios
var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */ function isArray(val) {
    return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */ function isUndefined(val) {
    return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */ function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */ function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */ function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */ function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
    else result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */ function isString(val) {
    return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */ function isNumber(val) {
    return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */ function isObject(val) {
    return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */ function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') return false;
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */ function isDate(val) {
    return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */ function isFile(val) {
    return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */ function isBlob(val) {
    return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */ function isFunction(val) {
    return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */ function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */ function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */ function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */ function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) return false;
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */ function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') return;
    // Force an array if not already something iterable
    if (typeof obj !== 'object') /*eslint no-param-reassign:0*/ obj = [
        obj
    ];
    if (isArray(obj)) // Iterate over array values
    for(var i = 0, l = obj.length; i < l; i++)fn.call(null, obj[i], i, obj);
    else {
        // Iterate over object keys
        for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) fn.call(null, obj[key], key, obj);
    }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */ function merge() {
    var result = {
    };
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) result[key] = merge(result[key], val);
        else if (isPlainObject(val)) result[key] = merge({
        }, val);
        else if (isArray(val)) result[key] = val.slice();
        else result[key] = val;
    }
    for(var i = 0, l = arguments.length; i < l; i++)forEach(arguments[i], assignValue);
    return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */ function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') a[key] = bind(val, thisArg);
        else a[key] = val;
    });
    return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */ function stripBOM(content) {
    if (content.charCodeAt(0) === 65279) content = content.slice(1);
    return content;
}
module.exports = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM
};

},{"./helpers/bind":"1KLet"}],"1KLet":[function(require,module,exports) {
'use strict';
module.exports = function bind(fn, thisArg) {
    return function wrap() {
        var args = new Array(arguments.length);
        for(var i = 0; i < args.length; i++)args[i] = arguments[i];
        return fn.apply(thisArg, args);
    };
};

},{}],"5zOrB":[function(require,module,exports) {
'use strict';
var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */ function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */ Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
        config = arguments[1] || {
        };
        config.url = arguments[0];
    } else config = config || {
    };
    config = mergeConfig(this.defaults, config);
    // Set config.method
    if (config.method) config.method = config.method.toLowerCase();
    else if (this.defaults.method) config.method = this.defaults.method.toLowerCase();
    else config.method = 'get';
    // Hook up interceptors middleware
    var chain = [
        dispatchRequest,
        undefined
    ];
    var promise = Promise.resolve(config);
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    while(chain.length)promise = promise.then(chain.shift(), chain.shift());
    return promise;
};
Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};
// Provide aliases for supported request methods
utils.forEach([
    'delete',
    'get',
    'head',
    'options'
], function forEachMethodNoData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {
        }, {
            method: method,
            url: url,
            data: (config || {
            }).data
        }));
    };
});
utils.forEach([
    'post',
    'put',
    'patch'
], function forEachMethodWithData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {
        }, {
            method: method,
            url: url,
            data: data
        }));
    };
});
module.exports = Axios;

},{"./../utils":"5vHyL","../helpers/buildURL":"5OkP7","./InterceptorManager":"1qFN8","./dispatchRequest":"BTDYg","./mergeConfig":"55g4J"}],"5OkP7":[function(require,module,exports) {
'use strict';
var utils = require('./../utils');
function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */ module.exports = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/ if (!params) return url;
    var serializedParams;
    if (paramsSerializer) serializedParams = paramsSerializer(params);
    else if (utils.isURLSearchParams(params)) serializedParams = params.toString();
    else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === 'undefined') return;
            if (utils.isArray(val)) key = key + '[]';
            else val = [
                val
            ];
            utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) v = v.toISOString();
                else if (utils.isObject(v)) v = JSON.stringify(v);
                parts.push(encode(key) + '=' + encode(v));
            });
        });
        serializedParams = parts.join('&');
    }
    if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
};

},{"./../utils":"5vHyL"}],"1qFN8":[function(require,module,exports) {
'use strict';
var utils = require('./../utils');
function InterceptorManager() {
    this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */ InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
    });
    return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */ InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) this.handlers[id] = null;
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */ InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) fn(h);
    });
};
module.exports = InterceptorManager;

},{"./../utils":"5vHyL"}],"BTDYg":[function(require,module,exports) {
'use strict';
var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
/**
 * Throws a `Cancel` if cancellation has been requested.
 */ function throwIfCancellationRequested(config) {
    if (config.cancelToken) config.cancelToken.throwIfRequested();
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */ module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    // Ensure headers exist
    config.headers = config.headers || {
    };
    // Transform request data
    config.data = transformData(config.data, config.headers, config.transformRequest);
    // Flatten headers
    config.headers = utils.merge(config.headers.common || {
    }, config.headers[config.method] || {
    }, config.headers);
    utils.forEach([
        'delete',
        'get',
        'head',
        'post',
        'put',
        'patch',
        'common'
    ], function cleanHeaderConfig(method) {
        delete config.headers[method];
    });
    var adapter = config.adapter || defaults.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        // Transform response data
        response.data = transformData(response.data, response.headers, config.transformResponse);
        return response;
    }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            // Transform response data
            if (reason && reason.response) reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
        }
        return Promise.reject(reason);
    });
};

},{"./../utils":"5vHyL","./transformData":"4E5ET","../cancel/isCancel":"GzHa4","../defaults":"29rIw"}],"4E5ET":[function(require,module,exports) {
'use strict';
var utils = require('./../utils');
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */ module.exports = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/ utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
    });
    return data;
};

},{"./../utils":"5vHyL"}],"GzHa4":[function(require,module,exports) {
'use strict';
module.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
};

},{}],"29rIw":[function(require,module,exports) {
var process = require("process");
'use strict';
var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');
var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) headers['Content-Type'] = value;
}
function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
    else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') // For node use HTTP adapter
    adapter = require('./adapters/http');
    return adapter;
}
var defaults = {
    adapter: getDefaultAdapter(),
    transformRequest: [
        function transformRequest(data, headers) {
            normalizeHeaderName(headers, 'Accept');
            normalizeHeaderName(headers, 'Content-Type');
            if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) return data;
            if (utils.isArrayBufferView(data)) return data.buffer;
            if (utils.isURLSearchParams(data)) {
                setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
                return data.toString();
            }
            if (utils.isObject(data)) {
                setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
                return JSON.stringify(data);
            }
            return data;
        }
    ],
    transformResponse: [
        function transformResponse(data) {
            /*eslint no-param-reassign:0*/ if (typeof data === 'string') try {
                data = JSON.parse(data);
            } catch (e) {
            }
            return data;
        }
    ],
    /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */ timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    }
};
defaults.headers = {
    common: {
        'Accept': 'application/json, text/plain, */*'
    }
};
utils.forEach([
    'delete',
    'get',
    'head'
], function forEachMethodNoData(method) {
    defaults.headers[method] = {
    };
});
utils.forEach([
    'post',
    'put',
    'patch'
], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;

},{"process":"6vAYb","./utils":"5vHyL","./helpers/normalizeHeaderName":"74Kyh","./adapters/xhr":"1Rif4","./adapters/http":"1Rif4"}],"6vAYb":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {
};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function() {
    try {
        if (typeof setTimeout === 'function') cachedSetTimeout = setTimeout;
        else cachedSetTimeout = defaultSetTimout;
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') cachedClearTimeout = clearTimeout;
        else cachedClearTimeout = defaultClearTimeout;
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e1) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e1) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) return;
    draining = false;
    if (currentQueue.length) queue = currentQueue.concat(queue);
    else queueIndex = -1;
    if (queue.length) drainQueue();
}
function drainQueue() {
    if (draining) return;
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while(len){
        currentQueue = queue;
        queue = [];
        while((++queueIndex) < len)if (currentQueue) currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) runTimeout(drainQueue);
};
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {
};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {
};
function noop() {
}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(name) {
    return [];
};
process.binding = function(name) {
    throw new Error('process.binding is not supported');
};
process.cwd = function() {
    return '/';
};
process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() {
    return 0;
};

},{}],"74Kyh":[function(require,module,exports) {
'use strict';
var utils = require('../utils');
module.exports = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
        }
    });
};

},{"../utils":"5vHyL"}],"1Rif4":[function(require,module,exports) {
'use strict';
var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (utils.isFormData(requestData)) delete requestHeaders['Content-Type']; // Let the browser set it
        var request = new XMLHttpRequest();
        // HTTP basic authentication
        if (config.auth) {
            var username = config.auth.username || '';
            var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
            requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        // Set the request timeout in MS
        request.timeout = config.timeout;
        // Listen for ready state
        request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) return;
            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) return;
            // Prepare the response
            var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            settle(resolve, reject, response);
            // Clean up request
            request = null;
        };
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if (!request) return;
            reject(createError('Request aborted', config, 'ECONNABORTED', request));
            // Clean up request
            request = null;
        };
        // Handle low level network errors
        request.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(createError('Network Error', config, null, request));
            // Clean up request
            request = null;
        };
        // Handle timeout
        request.ontimeout = function handleTimeout() {
            var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
            if (config.timeoutErrorMessage) timeoutErrorMessage = config.timeoutErrorMessage;
            reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request));
            // Clean up request
            request = null;
        };
        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
            // Add xsrf header
            var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
            if (xsrfValue) requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
        // Add headers to the request
        if ('setRequestHeader' in request) utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') // Remove Content-Type if data is undefined
            delete requestHeaders[key];
            else // Otherwise add header to the request
            request.setRequestHeader(key, val);
        });
        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) request.withCredentials = !!config.withCredentials;
        // Add responseType to request if needed
        if (config.responseType) try {
            request.responseType = config.responseType;
        } catch (e) {
            // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
            // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
            if (config.responseType !== 'json') throw e;
        }
        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') request.addEventListener('progress', config.onDownloadProgress);
        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) request.upload.addEventListener('progress', config.onUploadProgress);
        if (config.cancelToken) // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) return;
            request.abort();
            reject(cancel);
            // Clean up request
            request = null;
        });
        if (!requestData) requestData = null;
        // Send the request
        request.send(requestData);
    });
};

},{"./../utils":"5vHyL","./../core/settle":"1nsDb","./../helpers/cookies":"2hzlV","./../helpers/buildURL":"5OkP7","../core/buildFullPath":"2HsfH","./../helpers/parseHeaders":"57KdM","./../helpers/isURLSameOrigin":"5Uhh4","../core/createError":"GRBRX"}],"1nsDb":[function(require,module,exports) {
'use strict';
var createError = require('./createError');
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */ module.exports = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
    else reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
};

},{"./createError":"GRBRX"}],"GRBRX":[function(require,module,exports) {
'use strict';
var enhanceError = require('./enhanceError');
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */ module.exports = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"2g4mE"}],"2g4mE":[function(require,module,exports) {
'use strict';
/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */ module.exports = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) error.code = code;
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON() {
        return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: this.config,
            code: this.code
        };
    };
    return error;
};

},{}],"2hzlV":[function(require,module,exports) {
'use strict';
var utils = require('./../utils');
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
(function standardBrowserEnv() {
    return {
        write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));
            if (utils.isNumber(expires)) cookie.push('expires=' + new Date(expires).toGMTString());
            if (utils.isString(path)) cookie.push('path=' + path);
            if (utils.isString(domain)) cookie.push('domain=' + domain);
            if (secure === true) cookie.push('secure');
            document.cookie = cookie.join('; ');
        },
        read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
        }
    };
})() : // Non standard browser env (web workers, react-native) lack needed support.
(function nonStandardBrowserEnv() {
    return {
        write: function write() {
        },
        read: function read() {
            return null;
        },
        remove: function remove() {
        }
    };
})();

},{"./../utils":"5vHyL"}],"2HsfH":[function(require,module,exports) {
'use strict';
var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */ module.exports = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) return combineURLs(baseURL, requestedURL);
    return requestedURL;
};

},{"../helpers/isAbsoluteURL":"5WX49","../helpers/combineURLs":"RRQ7f"}],"5WX49":[function(require,module,exports) {
'use strict';
/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */ module.exports = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"RRQ7f":[function(require,module,exports) {
'use strict';
/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */ module.exports = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

},{}],"57KdM":[function(require,module,exports) {
'use strict';
var utils = require('./../utils');
// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent'
];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */ module.exports = function parseHeaders(headers) {
    var parsed = {
    };
    var key;
    var val;
    var i;
    if (!headers) return parsed;
    utils.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
            if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) return;
            if (key === 'set-cookie') parsed[key] = (parsed[key] ? parsed[key] : []).concat([
                val
            ]);
            else parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
    });
    return parsed;
};

},{"./../utils":"5vHyL"}],"5Uhh4":[function(require,module,exports) {
'use strict';
var utils = require('./../utils');
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
(function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;
    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */ function resolveURL(url) {
        var href = url;
        if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);
        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
    }
    originURL = resolveURL(window.location.href);
    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */ return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
})() : // Non standard browser envs (web workers, react-native) lack needed support.
(function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
        return true;
    };
})();

},{"./../utils":"5vHyL"}],"55g4J":[function(require,module,exports) {
'use strict';
var utils = require('../utils');
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */ module.exports = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {
    };
    var config = {
    };
    var valueFromConfig2Keys = [
        'url',
        'method',
        'data'
    ];
    var mergeDeepPropertiesKeys = [
        'headers',
        'auth',
        'proxy',
        'params'
    ];
    var defaultToConfig2Keys = [
        'baseURL',
        'transformRequest',
        'transformResponse',
        'paramsSerializer',
        'timeout',
        'timeoutMessage',
        'withCredentials',
        'adapter',
        'responseType',
        'xsrfCookieName',
        'xsrfHeaderName',
        'onUploadProgress',
        'onDownloadProgress',
        'decompress',
        'maxContentLength',
        'maxBodyLength',
        'maxRedirects',
        'transport',
        'httpAgent',
        'httpsAgent',
        'cancelToken',
        'socketPath',
        'responseEncoding'
    ];
    var directMergeKeys = [
        'validateStatus'
    ];
    function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) return utils.merge(target, source);
        else if (utils.isPlainObject(source)) return utils.merge({
        }, source);
        else if (utils.isArray(source)) return source.slice();
        return source;
    }
    function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) config[prop] = getMergedValue(config1[prop], config2[prop]);
        else if (!utils.isUndefined(config1[prop])) config[prop] = getMergedValue(undefined, config1[prop]);
    }
    utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) config[prop] = getMergedValue(undefined, config2[prop]);
    });
    utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
    utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) config[prop] = getMergedValue(undefined, config2[prop]);
        else if (!utils.isUndefined(config1[prop])) config[prop] = getMergedValue(undefined, config1[prop]);
    });
    utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) config[prop] = getMergedValue(config1[prop], config2[prop]);
        else if (prop in config1) config[prop] = getMergedValue(undefined, config1[prop]);
    });
    var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
    var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
    });
    utils.forEach(otherKeys, mergeDeepProperties);
    return config;
};

},{"../utils":"5vHyL"}],"7BpGl":[function(require,module,exports) {
'use strict';
/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */ function Cancel(message) {
    this.message = message;
}
Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
};
Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

},{}],"5obBc":[function(require,module,exports) {
'use strict';
var Cancel = require('./Cancel');
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */ function CancelToken(executor) {
    if (typeof executor !== 'function') throw new TypeError('executor must be a function.');
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
    });
    var token = this;
    executor(function cancel(message) {
        if (token.reason) // Cancellation has already been requested
        return;
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */ CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) throw this.reason;
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */ CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel
    };
};
module.exports = CancelToken;

},{"./Cancel":"7BpGl"}],"2zQEi":[function(require,module,exports) {
'use strict';
/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */ module.exports = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
};

},{}],"113Ns":[function(require,module,exports) {
'use strict';
/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */ module.exports = function isAxiosError(payload) {
    return typeof payload === 'object' && payload.isAxiosError === true;
};

},{}],"3dS2T":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
const parseWords = (raw)=>JSON.parse(raw.replaceAll("``", '"'))
;
class Typewriter {
    init() {
        this.tick();
        this.isDeleting = false;
        return this;
    }
    tick() {
        if (!this.allowTicks) return;
        const i = this.loopNum % this.words.length;
        const fullText = this.words[i];
        if (this.isDeleting) this.text = fullText.substring(0, this.text.length - 1);
        else this.text = fullText.substring(0, this.text.length + 1);
        this.element.html("<span class=\"wrap\">".concat(this.text, "</span>"));
        let delta = 200 - Math.random() * 100;
        if (this.isDeleting) delta /= 2;
        if (!this.isDeleting && this.text === fullText) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        this.timeout = setTimeout(()=>this.tick()
        , delta);
    }
    destroy() {
        clearTimeout(this.timeout);
        this.allowTicks = false;
    }
    constructor(selector, container){
        let props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        };
        const { element , period , words  } = props;
        this.element = element ? $(element) : $(container).children(selector);
        this.words = words || parseWords(this.element.data('words'));
        this.period = period || this.element.data('period', 'int') || 2000;
        this.loopNum = 0;
        this.text = '';
        this.timeout = null;
        this.allowTicks = true;
    }
}
exports.default = Typewriter;

},{}],"1m6OV":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
class AppLoader {
    async load() {
        // Wait for import to finish
        await this.ImportedApp.then((App)=>this.App = new App.default(this.data, this.ctn)
        ); // Wait For App Load
        await this.App.load();
    }
    init() {
        this.App.init();
    }
    constructor(data, ctn, AppImport){
        this.data = data;
        this.ctn = ctn;
        this.ImportedApp = AppImport;
    }
}
exports.default = AppLoader;

},{}],"5vzVZ":[function(require,module,exports) {
module.exports = require("./loaders/browser/js-loader")(require('./bundle-url').getBundleURL() + "../Fleet.52a5cf22.js").catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root('5iAsK')
);

},{"./loaders/browser/js-loader":"6Yn6U","./bundle-url":"7i9Uf"}],"6Yn6U":[function(require,module,exports) {
const cacheLoader = require('../../cacheLoader');
module.exports = cacheLoader(function loadJSBundle(bundle) {
    return new Promise(function(resolve, reject) {
        // Don't insert the same script twice (e.g. if it was already in the HTML)
        let existingScripts = document.getElementsByTagName('script');
        let isCurrentBundle = function(script) {
            return script.src === bundle;
        };
        if ([].concat(existingScripts).some(isCurrentBundle)) {
            resolve();
            return;
        }
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.src = bundle;
        script.onerror = function(e) {
            script.onerror = script.onload = null;
            script.remove();
            reject(e);
        };
        script.onload = function() {
            script.onerror = script.onload = null;
            resolve();
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    });
});

},{"../../cacheLoader":"LXIGN"}],"LXIGN":[function(require,module,exports) {
"use strict";
let cachedBundles = {
};
let cachedPreloads = {
};
let cachedPrefetches = {
};
function getCache(type) {
    switch(type){
        case 'preload':
            return cachedPreloads;
        case 'prefetch':
            return cachedPrefetches;
        default:
            return cachedBundles;
    }
}
module.exports = function(loader, type) {
    return function(bundle) {
        let cache = getCache(type);
        if (cache[bundle]) return cache[bundle];
        return cache[bundle] = loader.apply(null, arguments).catch(function(e) {
            delete cache[bundle];
            throw e;
        });
    };
};

},{}],"7i9Uf":[function(require,module,exports) {
"use strict";
/* globals document:readonly */ var bundleURL = null;
function getBundleURLCached() {
    if (!bundleURL) bundleURL = getBundleURL();
    return bundleURL;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) return getBaseURL(matches[0]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"51t1y":[function(require,module,exports) {
module.exports = require("./loaders/browser/js-loader")(require('./bundle-url').getBundleURL() + "../Login.66af861e.js").catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root('72lIk')
);

},{"./loaders/browser/js-loader":"6Yn6U","./bundle-url":"7i9Uf"}],"10Hxt":[function(require,module,exports) {
module.exports = require("./loaders/browser/js-loader")(require('./bundle-url').getBundleURL() + "../Booking.9106faa7.js").catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root('4Ykhq')
);

},{"./loaders/browser/js-loader":"6Yn6U","./bundle-url":"7i9Uf"}],"6ZVLU":[function(require,module,exports) {
module.exports = require("./loaders/browser/js-loader")(require('./bundle-url').getBundleURL() + "../Reviews.81d914b2.js").catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root('4XhS9')
);

},{"./loaders/browser/js-loader":"6Yn6U","./bundle-url":"7i9Uf"}],"7cKho":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _animejs = _interopRequireDefault(require("animejs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class Preloader {
    init() {
        $(document).on('readystatechange', ()=>{
            this.pageState = document.readyState;
            if (this.pageState == 'complete') this.onPageLoad();
        });
        return this;
    }
    onPageLoad() {
        // 1. Fire Before Events
        this.fire('before'); // 2. Create Timeline 
        const tl = _animejs.default.timeline({
            easing: 'easeOutQuad'
        }); // 4. Fade Out Logo
        tl.add({
            targets: this.preloader.children('.preloader__content').e(),
            opacity: 0,
            delay: 0.5,
            duration: 750
        }); // 5. Fade Out Preloader
        tl.add({
            targets: this.preloader.e(),
            // opacity: 0,
            translateY: '100%',
            duration: 1000,
            delay: 250
        }); // 6. Subscribe To Completed Animation Callback
        tl.finished.then(()=>this.onComplete()
        );
    }
    onComplete() {
        // 1. Execute Callback Functions
        this.fire('after'); // 2. Remove Preloader Element
        $.delay(500).then(()=>{
            if (this.preloader) this.preloader.remove();
            this.preloader = null;
        });
    }
    subscribe(event, callback) {
        this.callbacks.push({
            event,
            callback
        });
    }
    fire(event) {
        this.callbacks.forEach((item)=>{
            if (item.event === event) item.callback();
        });
    }
    after(callback) {
        this.subscribe('after', callback);
        return this;
    }
    constructor(){
        this.pageState = 'loading';
        this.callbacks = [];
        this.preloader = $('#preloader');
    }
}
exports.default = Preloader;

},{"animejs":"1GvRs"}]},["5FtZm","7n563","7GqX2"], "7GqX2", "parcelRequire26db")

//# sourceMappingURL=index.js.map
