webpackJsonp([1],{

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zaitun__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zaitun___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zaitun__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(157);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @jsx html */



var TaskCom = new __WEBPACK_IMPORTED_MODULE_1__task__["a" /* Task */]();

var KEY_ENTER = 13;
var MODIFY = Symbol('MODIFY');
var ADD = Symbol('ADD');
var REMOVE = Symbol('REMOVE');
var FILTER = Symbol('FILTER');
var ARCHIVE = Symbol('ARCHIVE');
var TOGGLE_ALL = Symbol('TOGGLE_ALL');

var Todos = function () {
    function Todos() {
        _classCallCheck(this, Todos);
    }

    _createClass(Todos, [{
        key: 'init',
        value: function init(dispatch) {
            return { nextId: 1, tasks: [], filter: 'all', todoInput: '' };
        }
    }, {
        key: 'onInput',
        value: function onInput(e, dispatch) {
            if (e.keyCode === KEY_ENTER) {
                dispatch({ type: ADD, title: e.target.value });
            }
        }
    }, {
        key: 'view',
        value: function view(_ref) {
            var _this = this;

            var model = _ref.model,
                dispatch = _ref.dispatch;

            var remaining = this.remainingTodos(model.tasks);
            var filtered = this.filteredTodos(model.tasks, model.filter);
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                'div',
                { classNames: 'card ' },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                    'div',
                    { classNames: 'card-header' },
                    'Todos ',
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                        'button',
                        { 'on-click': function onClick() {
                                return __WEBPACK_IMPORTED_MODULE_0_zaitun__["Router"].navigate('counter');
                            } },
                        'Go to Counter'
                    )
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                    'div',
                    { classNames: 'card-block' },
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                        'div',
                        { classNames: 'form-inline' },
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])('input', { 'on-click': function onClick(e) {
                                return dispatch({ type: TOGGLE_ALL, done: e.target.checked });
                            }, classNames: 'fform-check-input', type: 'checkbox' }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])('input', {
                            'on-keydown': function onKeydown(e) {
                                return _this.onInput(e, dispatch);
                            },
                            classNames: 'form-control',
                            value: model.todoInput,
                            type: 'text', placeholder: 'What needs to be done?' })
                    )
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                    'ul',
                    { classNames: 'list-group list-group-flush' },
                    filtered.map(function (task) {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(_this.TodoItem, { item: task, dispatch: dispatch });
                    })
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                    'div',
                    { classNames: 'card-block', 'style-display': model.tasks.length ? 'block' : 'none' },
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                        'span',
                        { classNames: 'todo-count' },
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                            'strong',
                            null,
                            remaining
                        ),
                        ' item',
                        remaining === 1 ? '' : 's',
                        ' left'
                    ),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                        'span',
                        { style: { marginLeft: '50px' } },
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                            'button',
                            { 'on-click': [dispatch, { type: FILTER, filter: 'all' }], classNames: 'btn btn-link' },
                            'All'
                        ),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                            'button',
                            { 'on-click': [dispatch, { type: FILTER, filter: 'active' }], classNames: 'btn btn-link' },
                            'Active'
                        ),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                            'button',
                            { 'on-click': [dispatch, { type: FILTER, filter: 'completed' }], classNames: 'btn btn-link' },
                            'Completed'
                        ),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                            'button',
                            { 'on-click': dispatch.bind(null, { type: ARCHIVE }), classNames: 'btn btn-link' },
                            'Clear Completed'
                        )
                    )
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                    'p',
                    null,
                    'Double-click to edit a todo'
                )
            );
        }
    }, {
        key: 'TodoItem',
        value: function TodoItem(_ref2) {
            var item = _ref2.item,
                _dispatch = _ref2.dispatch;

            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(TaskCom, {
                model: item,
                dispatch: function dispatch(action) {
                    return _dispatch({ type: MODIFY, id: item.id, taskAction: action });
                },
                onRemove: _dispatch.bind(null, { type: REMOVE, task: item })
            });
        }
    }, {
        key: 'update',
        value: function update(model, action) {
            switch (action.type) {
                case ADD:
                    return this.addTodo(model, action.title);
                case REMOVE:
                    return this.removeTask(model, action.task);
                case MODIFY:
                    return this.modifyTodo(model, action.id, action.taskAction);
                case FILTER:
                    return _extends({}, model, { filter: action.filter });
                case ARCHIVE:
                    return this.archiveTodos(model);
                case TOGGLE_ALL:
                    return this.toggleAll(model, action.done);

                default:
                    return model;
            }
        }
    }, {
        key: 'filteredTodos',
        value: function filteredTodos(tasks, filter) {
            return filter === 'completed' ? tasks.filter(function (todo) {
                return todo.done;
            }) : filter === 'active' ? tasks.filter(function (todo) {
                return !todo.done;
            }) : tasks;
        }
    }, {
        key: 'addTodo',
        value: function addTodo(model, title) {
            return _extends({}, model, {
                tasks: [].concat(_toConsumableArray(model.tasks), [TaskCom.init(model.nextId, title)]),
                editingTitle: '',
                nextId: model.nextId + 1,
                todoInput: title
            });
        }
    }, {
        key: 'removeTask',
        value: function removeTask(model, task) {
            return _extends({}, model, {
                tasks: model.tasks.filter(function (_) {
                    return _ !== task;
                })
            });
        }
    }, {
        key: 'modifyTodo',
        value: function modifyTodo(model, id, action) {
            return _extends({}, model, {
                tasks: model.tasks.map(function (taskModel) {
                    return taskModel.id !== id ? taskModel : TaskCom.update(taskModel, action);
                })
            });
        }
    }, {
        key: 'remainingTodos',
        value: function remainingTodos(tasks) {
            return tasks.reduce(function (acc, task) {
                return !task.done ? acc + 1 : acc;
            }, 0);
        }
    }, {
        key: 'archiveTodos',
        value: function archiveTodos(model) {
            return _extends({}, model, {
                tasks: model.tasks.filter(function (taskModel) {
                    return !taskModel.done;
                })
            });
        }
    }, {
        key: 'toggleAll',
        value: function toggleAll(model, done) {
            return _extends({}, model, {
                tasks: model.tasks.map(function (taskModel) {
                    return TaskCom.update(taskModel, { type: __WEBPACK_IMPORTED_MODULE_1__task__["b" /* Toggle */], checked: done });
                })
            });
        }
    }]);

    return Todos;
}();

/* harmony default export */ __webpack_exports__["default"] = (Todos);

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zaitun__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zaitun___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zaitun__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Task; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Toggle; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @jsx html */



var Toggle = Symbol('Toggle');
var StartEditing = Symbol('StartEditing');
var CommitEditing = Symbol('CommitEditing');
var CancelEditing = Symbol('CancelEditing');

var Task = function () {
    function Task() {
        _classCallCheck(this, Task);
    }

    _createClass(Task, [{
        key: 'init',
        value: function init(id, title) {
            return { id: id, title: title, done: false, editing: false, editingValue: '' };
        }
    }, {
        key: 'onInput',
        value: function onInput(e, dispatch) {
            if (e.keyCode === 13) {
                dispatch({ type: CommitEditing, value: e.target.value });
            }
        }
    }, {
        key: 'view',
        value: function view(_ref) {
            var _this = this;

            var model = _ref.model,
                dispatch = _ref.dispatch,
                onRemove = _ref.onRemove;


            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                'li',
                {
                    classNames: 'list-group-item',
                    key: model.id
                },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                    'div',
                    { selector: '.view', 'style-display': !model.editing ? 'block' : 'none',
                        style: { opacity: '0', transition: 'opacity 1s', delayed: { opacity: '1' } } },
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])('input', {
                        selector: '.toggle',
                        type: 'checkbox',
                        checked: !!model.done,
                        'on-click': function onClick(e) {
                            return dispatch({ type: Toggle, checked: e.target.checked });
                        }
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                        'label',
                        { 'on-dblclick': dispatch.bind(null, { type: StartEditing }), 'style-color': model.done ? 'red' : 'black' },
                        model.title
                    ),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])(
                        'button',
                        { selector: '.btn .btn-link', 'on-click': onRemove },
                        '\xD7'
                    )
                ),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_zaitun__["html"])('input', {
                    classNames: 'form-control',
                    'style-display': model.editing ? 'block' : 'none',
                    'on-keydown': function onKeydown(e) {
                        return _this.onInput(e, dispatch);
                    },
                    'on-blur': dispatch.bind(null, { type: CancelEditing }),
                    value: model.title
                })
            );
        }
    }, {
        key: 'update',
        value: function update(model, action) {

            switch (action.type) {
                case Toggle:
                    return _extends({}, model, { done: action.checked });
                case StartEditing:
                    return _extends({}, model, { editing: true, editingValue: model.title });
                case CommitEditing:
                    return _extends({}, model, { title: action.value, editing: false, editingValue: '' });
                case CancelEditing:
                    return _extends({}, model, { editing: false });
                default:
                    return model;
            }
        }
    }]);

    return Task;
}();


//export default Task;

/***/ })

});