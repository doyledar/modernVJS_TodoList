// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  id: 1,
  content: "tâche 1",
  completed: false
}, {
  id: 2,
  content: "tâche 2",
  completed: false
}, {
  id: 2,
  content: "tâche 2",
  completed: true
}];
exports.default = _default;
},{}],"js/modules/templates/todo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  <li data-id =\"{{id}}\" class=\"{{isCompletedClass}}\">\n    <input class=\"toggle\" type=\"checkbox\" {{isCompletedChecked}}/>\n    <label class=\"editable\">{{content}}</label>\n    <button class=\"destroy\"></button>\n  </li>\n";
exports.default = _default;
},{}],"js/modules/Todo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _todo = _interopRequireDefault(require("./templates/todo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Todo = /*#__PURE__*/function () {
  function Todo(data) {
    _classCallCheck(this, Todo);

    this.parent = data.parent;
    this.elt;
    this.id = data.todo.id;
    this.content = data.todo.content;
    this.completed = data.todo.completed;
    this.template = _todo.default;
  }

  _createClass(Todo, [{
    key: "_replaceTemplate",
    value: function _replaceTemplate() {
      for (var propriete in this) {
        this.template = this.template.replace('{{' + propriete + '}}', this[propriete]);
      }

      this.template = this.template.replace('{{isCompletedClass}}', this.completed === true ? 'completed' : '');
      this.template = this.template.replace('{{isCompletedChecked}}', this.checked === true ? 'checked="checked"' : '');
    }
  }, {
    key: "render",
    value: function render() {
      this._replaceTemplate();

      this.elt = document.createElement('div');
      this.elt.innerHTML = this.template;
      this.parent.listElt.appendChild(this.elt);

      this._activerBtns();
    }
  }, {
    key: "_toggleCompleted",
    value: function _toggleCompleted() {
      this.completed = !this.completed;
      this.elt.querySelector('li').classList.toggle('completed');
      this.parent.setCompletedNumber();
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      this.elt.remove();
      this.parent.removeOneById(this.id); //this.parent.SetNotCompletedNumber();
    }
  }, {
    key: "_edit",
    value: function _edit() {
      this.elt.querySelector('.editable').innerHTML = "\n\t\t<input type=\"text\" class=\"validate\" value : \"".concat(this.content, "\" />\n\t");

      this._activerBtns();
    }
  }, {
    key: "_validate",
    value: function _validate() {
      //alert("coucou");
      this.content = this.elt.querySelector('.validate').value;
      this.elt.querySelector('.editable').innerHTML = this.content;

      this._activerBtns();
    }
  }, {
    key: "_activerBtns",
    value: function _activerBtns() {
      var _this = this;

      this.elt.querySelector('.toggle').onclick = function () {
        _this._toggleCompleted();
      };

      this.elt.querySelector('.destroy').onclick = function () {
        _this._destroy();
      };

      this.elt.querySelector('.editable').ondblclick = function () {
        _this._edit();
      };

      if (this.elt.querySelector('.validate')) {
        this.elt.querySelector('.validate').onkeyup = function (e) {
          if (e.keyCode === 13) {
            _this._validate();
          }
        };
      }
    }
  }]);

  return Todo;
}();

exports.default = Todo;
},{"./templates/todo":"js/modules/templates/todo.js"}],"js/modules/templates/todoList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n <section class=\"todoapp\">\n  <header class=\"header\">\n    <h1>todos</h1>\n    <input class=\"new-todo\" placeholder=\"What needs to be done?\" autofocus>\n  </header>\n  <section class=\"main\">\n    <input id=\"toggle-all\" class=\"toggle-all\" type=\"checkbox\">\n    <label for=\"toggle-all\">Mark all as complete</label>\n    <ul class=\"todo-list\">\n\n    </ul>\n  </section>\n  <footer class=\"footer\">\n    <span class=\"todo-count\"><strong id=\"todo-count\">1</strong> items left</span>\n    <ul class=\"filters\">\n      <li>\n        <a href=\"#/\" data-filter = \"all\" class=\"filter selected\">All</a>\n      </li>\n      <li>\n        <a href=\"#/active\" data-filter = \"active\" class=\"filter\">Active</a>\n      </li>\n      <li>\n        <a href=\"#/completed\" data-filter = \"completed\" class=\"filter\">Completed</a>\n      </li>\n    </ul>\n    <button class=\"clear-completed\">Clear completed</button>\n  </footer>\n</section>\n";
exports.default = _default;
},{}],"js/modules/TodoList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Todo = _interopRequireDefault(require("./Todo"));

var _todoList = _interopRequireDefault(require("./templates/todoList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TodoList = /*#__PURE__*/function () {
  function TodoList(data) {
    _classCallCheck(this, TodoList);

    this.elt = document.querySelector(data.elt); // selection du #app

    this.elt;
    this.notCompletedNumber;
    this.todos = [];
    this.loadTodos(data.todos);
    this.template = _todoList.default;
    this.render(this.todos);
  }

  _createClass(TodoList, [{
    key: "loadTodos",
    value: function loadTodos(todos) {
      var _iterator = _createForOfIteratorHelper(todos),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var todo = _step.value;
          this.todos.push(new _Todo.default({
            parent: this,
            todo: todo
          }));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "render",
    value: function render(todos) {
      this.elt.innerHTML = this.template;
      this.listElt = this.elt.querySelector('.todo-list');

      var _iterator2 = _createForOfIteratorHelper(todos),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var todo = _step2.value;
          todo.render();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.setNotCompletedNumber();
      this.activerBtns();
    }
  }, {
    key: "setNotCompletedNumber",
    value: function setNotCompletedNumber() {
      // méthode array filter
      this.notCompletedNumber = this.todos.filter(function (todo) {
        return todo.completed === false;
      }).length; //console.log(this.notCompletedNumber);

      this.elt.querySelector('#todo-count').innerText = this.notCompletedNumber;
    }
  }, {
    key: "addTodo",
    value: function addTodo() {
      var content = this.elt.querySelector('.new-todo').value;
      var id = this.todos[this.todos.length - 1].id + 1;
      var todo = {
        id: id,
        content: content,
        completed: false
      };
      var newTodo = new _Todo.default({
        parent: this,
        todo: todo
      });
      this.todos.push(newTodo);
      newTodo.render();
      this.elt.querySelector('.new-todo').value = '';
      this.setNotCompletedNumber();
    }
  }, {
    key: "removeOneById",
    value: function removeOneById(id) {
      this.todos = this.todos.filter(function (todo) {
        return todo.id != id;
      });
      this.setNotCompletedNumber();
    }
  }, {
    key: "_filter",
    value: function _filter(filter) {
      switch (filter) {
        case 'active':
          //alert("filtre active");
          this.render(this.todos.filter(function (todo) {
            return !todo.completed;
          }));
          break;

        case 'completed':
          this.render(this.todos.filter(function (todo) {
            return todo.completed;
          }));
          break;

        default:
          this.render(this.todos);
      }
    }
  }, {
    key: "activerBtns",
    value: function activerBtns() {
      var _this = this;

      this.elt.querySelector('.new-todo').onkeyup = function (e) {
        if (e.keyCode === 13) {
          _this.addTodo();
        }
      };

      var filterBtns = this.elt.querySelectorAll('.filter');

      var _iterator3 = _createForOfIteratorHelper(filterBtns),
          _step3;

      try {
        var _loop = function _loop() {
          var filterBtn = _step3.value;

          filterBtn.onclick = function () {
            _this._filter(filterBtn.dataset.filter);
          };
        };

        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }]);

  return TodoList;
}();

exports.default = TodoList;
},{"./Todo":"js/modules/Todo.js","./templates/todoList":"js/modules/templates/todoList.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

var _data = _interopRequireDefault(require("./data.js"));

var _TodoList = _interopRequireDefault(require("./modules/TodoList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _TodoList.default({
  elt: '#app',
  todos: _data.default // ou todos:todos

});
},{"./data.js":"js/data.js","./modules/TodoList.js":"js/modules/TodoList.js"}],"../../../../../Users/gisele/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59913" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../Users/gisele/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map