webpackJsonp([2],{

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zaitun__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zaitun___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zaitun__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__counter__ = __webpack_require__(58);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @jsx html */

var html = __WEBPACK_IMPORTED_MODULE_0_zaitun__["jsx"].html;

var ADD = Symbol('add');
var REMOVE = Symbol('remove');
var RESET = Symbol('reset');
var UPDATE = Symbol('counterAction');

var CounterList = function () {
    function CounterList() {
        _classCallCheck(this, CounterList);

        this.Counter = new __WEBPACK_IMPORTED_MODULE_1__counter__["a" /* default */]();
        this.CounterItem = this.CounterItem.bind(this);
    }

    _createClass(CounterList, [{
        key: 'init',
        value: function init(dispatch, routeParams) {
            console.log(routeParams);
            var times = 0,
                counters = [];
            if (routeParams !== undefined) {
                times = +routeParams.times;
                for (var i = 0; i < times; i++) {
                    counters.push({ id: i, counter: this.Counter.init() });
                }
            }
            return { nextId: times, counters: counters };
        }
    }, {
        key: 'afterViewRender',
        value: function afterViewRender() {
            this.Counter.afterViewRender();
        }
    }, {
        key: 'canDeactivate',
        value: function canDeactivate() {
            console.log('can deactivate');
            return confirm('deactivate');
        }
    }, {
        key: 'onDestroy',
        value: function onDestroy() {
            this.Counter.onDestroy();
        }
    }, {
        key: 'view',
        value: function view(_ref) {
            var _this = this;

            var model = _ref.model,
                dispatch = _ref.dispatch;

            return html(
                'div',
                { classNames: 'card card-outline-secondary mb-3 text-center' },
                html(
                    'div',
                    { classNames: 'card-block' },
                    html(
                        'button',
                        { classNames: 'btn btn-primary btn-sm', 'on-click': [dispatch, { type: ADD }] },
                        'Add'
                    ),
                    '\xA0',
                    html(
                        'button',
                        { classNames: 'btn btn-primary btn-sm', 'on-click': [dispatch, { type: RESET }] },
                        'Reset'
                    ),
                    html('hr', null),
                    html(
                        'div',
                        null,
                        model.counters.map(function (item) {
                            return html(_this.CounterItem, { item: item, dispatch: dispatch });
                        })
                    )
                )
            );
        }
    }, {
        key: 'CounterItem',
        value: function CounterItem(_ref2) {
            var item = _ref2.item,
                _dispatch = _ref2.dispatch;

            return html(
                'div',
                { key: item.id, style: { paddingBottom: '10px' } },
                html(
                    'button',
                    { classNames: 'btn btn-primary btn-sm', 'on-click': [_dispatch, { type: REMOVE, id: item.id }] },
                    'Remove'
                ),
                '\xA0',
                this.Counter.view({ model: item.counter, dispatch: function dispatch(action) {
                        return _dispatch({ type: UPDATE, id: item.id, action: action });
                    } })
            );
        }
    }, {
        key: 'update',
        value: function update(model, action) {
            var _this2 = this;

            switch (action.type) {
                case ADD:
                    var newCounter = { id: model.nextId, counter: this.Counter.init() };
                    return {
                        counters: [].concat(_toConsumableArray(model.counters), [newCounter]),
                        nextId: model.nextId + 1
                    };
                case UPDATE:
                    return {
                        nextId: model.nextId,
                        counters: model.counters.map(function (item) {
                            return item.id !== action.id ? item : Object.assign({}, item, { counter: _this2.Counter.update(item.counter, action.action) });
                        })
                    };
                case RESET:
                    return Object.assign({}, model, { counters: model.counters.map(function (item) {
                            item.counter = _this2.Counter.init();return item;
                        }) });
                case REMOVE:
                    return Object.assign({}, model, { counters: model.counters.filter(function (it) {
                            return it.id !== action.id;
                        }) });
                default:
                    return model;
            }
        }
    }]);

    return CounterList;
}();

/* harmony default export */ __webpack_exports__["default"] = (CounterList);

/***/ })

});