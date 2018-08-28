module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Message = __webpack_require__(24);

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
	path: '/',
	component: _Message2.default,
	exact: true
}];

exports.default = routes;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(7);

var _promise2 = _interopRequireDefault(_promise);

var _jsxFileName = 'C:\\Users\\lakshitha_w\\Documents\\GitHub\\NEW-GIT\\TwitSplit\\src\\server\\index.js';

var _path = __webpack_require__(8);

var _path2 = _interopRequireDefault(_path);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(9);

var _App = __webpack_require__(10);

var _App2 = _interopRequireDefault(_App);

var _express = __webpack_require__(16);

var _express2 = _interopRequireDefault(_express);

var _compression = __webpack_require__(17);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(18);

var _helmet2 = _interopRequireDefault(_helmet);

var _reactRouterDom = __webpack_require__(3);

var _serializeJavascript = __webpack_require__(19);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _redux = __webpack_require__(5);

var _reactRedux = __webpack_require__(2);

var _reducers = __webpack_require__(20);

var _reducers2 = _interopRequireDefault(_reducers);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

var _reduxThunk = __webpack_require__(23);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeApp = (0, _express2.default)();
nodeApp.use((0, _helmet2.default)());

// CONFIGURATIONS
nodeApp.set('port', '8080');

// MIDDLEWARE
nodeApp.use((0, _compression2.default)());
nodeApp.use(_express2.default.static(_path2.default.join('./', 'public')));

nodeApp.use('*', function (req, res) {
	var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default);
	var store = (0, _redux.createStore)(_reducers2.default, middleware);
	var urlParams = undefined;
	var currentRoute = _routes2.default.find(function (route) {
		var matchedRoute = (0, _reactRouterDom.matchPath)(req.originalUrl.split('?')[0], route);
		console.log(matchedRoute);
		if (matchedRoute) urlParams = matchedRoute.params;
		return matchedRoute;
	});
	var currentComponent = undefined;
	try {
		currentComponent = currentRoute.component;
	} catch (err) {
		res.send('Error 404');
		return;
	}
	var baseUrl = req ? req.protocol + '://' + req.get('Host') : '';

	var componentInitialDataPromise = currentComponent.requestInitialdata({ dispatch: store.dispatch, baseUrl: baseUrl, urlParams: urlParams }) || _promise2.default.resolve();

	componentInitialDataPromise.then(function () {
		var context = {};

		var preloadedState = store.getState();

		var markup = (0, _server.renderToString)(_react2.default.createElement(
			_reactRedux.Provider,
			{ store: store, __source: {
					fileName: _jsxFileName,
					lineNumber: 59
				},
				__self: undefined
			},
			_react2.default.createElement(
				_reactRouterDom.StaticRouter,
				{ location: req.originalUrl, context: context, __source: {
						fileName: _jsxFileName,
						lineNumber: 60
					},
					__self: undefined
				},
				_react2.default.createElement(_App2.default, {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 61
					},
					__self: undefined
				})
			)
		));

		res.send('\n\t    \t<!DOCTYPE html>\n\t\t\t<html class="no-js ob-anim" class="cssanimations" data-language="en_SG" lang="en">\n\t\t\t<head>\n\t\t\t  <meta charset="UTF-8">\n\t\t\t  <title>TwitSplit</title>\n\t\t\t  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n\t\t\t  <link rel="stylesheet" media="all" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>\n\n\t\t\t  <link rel="stylesheet" media="all" href="/css/style.css"/>\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<script>window.__initialData__=' + (0, _serializeJavascript2.default)(preloadedState) + ' </script>\n\t\t\t  \t<div id="root">' + markup + '</div>\n\t\t\t \t<script type="text/javascript" src="/js/bundle.js" charset="utf-8"></script>\n\t\t\t</body>\n\t\t\t</html>\n\t    ');
	});
});

// ERROR-HANDLING
nodeApp.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// eslint-disable-next-line no-unused-vars
nodeApp.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});

nodeApp.listen(process.env.PORT || 8080, function () {
	console.log('server is running ' + (process.env.PORT || 8080));
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(12);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(15);

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsxFileName = 'C:\\Users\\lakshitha_w\\Documents\\GitHub\\NEW-GIT\\TwitSplit\\src\\shared\\App.js';

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(3);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_React$Component) {
	(0, _inherits3.default)(App, _React$Component);

	function App() {
		(0, _classCallCheck3.default)(this, App);
		return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this));
	}

	(0, _createClass3.default)(App, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				_reactRouterDom.Switch,
				{
					__source: {
						fileName: _jsxFileName,
						lineNumber: 14
					},
					__self: this
				},
				_routes2.default.map(function (route, i) {
					return _react2.default.createElement(_reactRouterDom.Route, (0, _assign2.default)({ key: i }, route, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 15
						},
						__self: _this2
					}));
				})
			);
		}
	}]);
	return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = __webpack_require__(5);

var _messageReducer = __webpack_require__(22);

var _messageReducer2 = _interopRequireDefault(_messageReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	message: _messageReducer2.default
});

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = __webpack_require__(7);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(12);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(15);

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsxFileName = "C:\\Users\\lakshitha_w\\Documents\\GitHub\\NEW-GIT\\TwitSplit\\src\\shared\\containers\\message\\Message.js";

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = function (_React$Component) {
	(0, _inherits3.default)(Message, _React$Component);

	function Message() {
		(0, _classCallCheck3.default)(this, Message);
		return (0, _possibleConstructorReturn3.default)(this, (Message.__proto__ || (0, _getPrototypeOf2.default)(Message)).call(this));
	}

	(0, _createClass3.default)(Message, [{
		key: "render",
		value: function render() {

			return _react2.default.createElement(
				"div",
				{ className: "main_container", __source: {
						fileName: _jsxFileName,
						lineNumber: 16
					},
					__self: this
				},
				_react2.default.createElement(
					"h1",
					{
						__source: {
							fileName: _jsxFileName,
							lineNumber: 17
						},
						__self: this
					},
					"Tweeter"
				),
				_react2.default.createElement("textarea", { id: "message", className: "text", __source: {
						fileName: _jsxFileName,
						lineNumber: 18
					},
					__self: this
				}),
				_react2.default.createElement(
					"button",
					{ type: "button", id: "submit", className: "button", __source: {
							fileName: _jsxFileName,
							lineNumber: 19
						},
						__self: this
					},
					"Send"
				)
			);
		}
	}], [{
		key: "requestInitialdata",
		value: function requestInitialdata(params) {
			return _promise2.default.resolve(); //Promise.all([params.dispatch(sampleActions.loadIntro())])
		}
	}]);
	return Message;
}(_react2.default.Component);

exports.default = Message;

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map