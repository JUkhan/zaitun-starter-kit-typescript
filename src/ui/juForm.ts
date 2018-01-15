import { h, Dispatch, Router } from 'zaitun';
import { guid } from './utils';
import { FormOptions, Field } from './uimodel'


declare const $: any;
const TAB_CLICK = Symbol('TAB_CLICK');
const OPTIONS_CHANGED = Symbol('OPTIONS_CHANGED');
const FORM_VALUE_CHANGED = Symbol('form-value-change');

class juForm {
    dispatch: Dispatch;
    options: FormOptions;
    modalId: string;
    model: any;
    router: Router;
    constructor() {
        this.dispatch = undefined;
        this.options = undefined;
        this.modalId = guid();
    }
    init() {
        return {};
    }
    view({ model, dispatch, router }) {
        this.dispatch = dispatch;
        this.options = model.options;
        this.model = model;
        this.router = router;
        if (!model.data) {
            model.data = {};
        }
        if (!this.options) {
            return h('div', 'juForm options is not defined');
        }
        const vnodes = h('div.juForm', this._createElements(this.options));
        return this.options.viewMode === 'form' ? vnodes : this._createModal(vnodes, this.modalId);
    }
    update(model, action) {
        return model;
    }
    _createElements(options) {
        const vnodes = [];
        if (options.inputs) {
            options.inputs.forEach((item, index) => {
                this._transformElement(item, index, vnodes);
            });
        }
        return vnodes
    }
    modalClose() {
        if (typeof this.options.modalClose === 'function') {
            this.options.modalClose() && this.showModal(false);
        } else {
            this.showModal(false);
        }
    }
    _createModal(vnodes, id) {
        return h('div.modal', { attrs: { id: id } }, [
            h('div.modal-dialog.modal-' + this.options.modalSize, { role: 'document' }, [
                h('div.modal-content', [
                    h('div.modal-header', [
                        h('div.modal-title', this.options.title || ''),
                        h('button.close', {
                            data: { dismiss: 'modal' },
                            aria: { label: 'Close' }, on: { click: e => this.modalClose() }
                        }, [
                                h('span', { aria: { hidden: 'true' } }, '×')
                            ])
                    ]),
                    h('div.modal-body', [vnodes]),
                    h('div.modal-footer', this._getModalButtons(this.options.buttons))
                ])
            ])
        ]);
    }
    _getModalButtons(buttons) {
        if (!buttons) return '';
        if (typeof buttons === 'function') {
            return buttons(this.model)
        }
        else if (Array.isArray(buttons)) {
            return buttons.map(btn => this._createButtonElm(btn));
        }
        return this._getVNode(buttons);
    }
    _transformElement(item, index, vnodes) {

        if (Array.isArray(item)) {
            const velms = [];
            item.forEach((elm, index) => {
                switch (elm.type) {
                    case 'fieldset':
                        velms.push(this._createFieldSet(elm));
                        break;
                    case 'tabs':
                        velms.push(h(`div.col-md-${elm.size || 6}`, this._createTabs(elm)));
                        break;
                    case 'button':
                        velms.push(this._createButton(elm, index));
                        break;
                    case 'checkbox': case 'radio':
                        velms.push(this._createCheckbox(elm, index));
                        break;
                    case 'label':
                        velms.push(this._createLabel(elm, index));
                        break;
                    case 'component':
                        velms.push(h(`div.col-md-${elm.size || 6}`, [elm.component.view({
                            model: elm.field ? this.model[elm.field] : this.model,
                            dispatch: this.router.bindEffect(action => this.dispatch({ type: elm.actionType, payload: action }))
                        })]));
                        break;
                    case 'vnode':
                        vnodes.push(h(`div.col-md-${elm.size || 6}`, [this._getVNode(elm.vnode)]));
                        break;
                    default:
                        velms.push(...this._createElement(elm, index));
                        break;
                }
            });
            vnodes.push(h(`div.form-group.row`, velms));
            return;
        }
        switch (item.type) {
            case 'fieldset':
                vnodes.push(this._createFieldSet(item));
                break;
            case 'tabs':
                vnodes.push(...this._createTabs(item));
                break;
            case 'button':
                vnodes.push(h(`div.form-group.row`, this._createButton(item, index)));
                break;
            case 'checkbox': case 'radio':
                vnodes.push(h(`div.form-group.row`, this._createCheckbox(item, index)));
                break;
            case 'label':
                vnodes.push(h(`div.form-group.row`, this._createLabel(item, index)));
                break;
            case 'vnode':
                vnodes.push(this._getVNode(item.vnode));
                break;
            case 'component':
                vnodes.push(item.component.view({
                    model: item.field ? this.model[item.field] : this.model,
                    dispatch: this.router.bindEffect(action => this.dispatch({ type: item.actionType, payload: action }))
                }));

                break;
            default:

                vnodes.push(h(`div.form-group.row`, this._createElement(item, index)));
                break;
        }
    }

    _createFieldSet(item) {
        if (item.hide) {
            return h('span', { style: { display: 'none' } }, 'hide');
        }
        const velms = [];
        if (item.legend) {
            velms.push(h('legend', item.legend));
        }
        velms.push(...this._createElements(item));
        return h(`fieldset.col-md-${item.size || 12}`, {
            attrs: { disabled: item.disabled }
        }, velms);
    }
    _createTabs(item: Field) {
        const elms = [], lies = [], tabcontents = [], tabNames = Object.keys(item.tabs);

        tabNames.forEach(tabName => {
            let tabId = '#' + tabName.replace(/\s+/, '_###_'),
                disabled = !!item.tabs[tabName].disabled,
                hide = !!item.tabs[tabName].hide;
            if (!hide) {
                lies.push(h(`li.nav-item`, [
                    h(`a.nav-link`, {
                        attrs: { href: tabId },
                        class: { active: item.activeTab === tabName, disabled: disabled },
                        on: {
                            click: e => {
                                e.preventDefault();
                                if (disabled) { return; }
                                if (item.activeTab === tabName) { return; }
                                this.selectTab(tabName, item);
                            }
                        }
                    }, tabName)

                ]));
                //tab contents 
                if (tabName === item.activeTab) {
                    tabcontents.push(h(`div.tab-item`,
                        this._createElements(item.tabs[tabName])));
                }
            }
        });
        elms.push(h('div.card', [
            h('div.card-header', [h(`ul.nav nav-tabs card-header-tabs pull-xs-left`, lies)]),
            h('div.card-block', tabcontents),
            item.footer ? h('div.card-footer',
                this._getModalButtons(item.footer)) : ''
        ]))
        return elms;
    }
    _getVNode(footer) {
        if (typeof footer === 'function') {
            return footer(this.model);
        }
        return footer;
    }
    _getListener(item: Field) {
        let events = {},
            hasChange = null,
            modelUpdateEvent ='input';
            if(item.type === 'checkbox' || item.type === 'radio'){
                modelUpdateEvent='click';
            }
            else if(item.type === 'file' ){
                modelUpdateEvent='change';
            } 
        if (typeof item.on === 'object') {
            for (let eventName in item.on) {
                if (eventName === modelUpdateEvent) {
                    hasChange = item.on[modelUpdateEvent];
                } else {
                    events[eventName] = e => item.on[eventName](e);
                }
            }
        }
        events[modelUpdateEvent] = e => {
            let val = $(e.target).val();
            if (item.type === 'checkbox' || item.type === 'radio') {
                if (!e.target.checked) {
                    val = '';
                }
            }
            console.log(e);
            this._setValueToData(item, val);
            if (hasChange) {
                hasChange(val, e);
            }
            this.dispatch({
                type: FORM_VALUE_CHANGED,
                payload: { field: item, value: val }
            }, true);

        };
        return events
    }
    _createLabel(item: Field, index) {
        if (item.hide) return [];
        return h(`div.col-md-${item.size || 4}`, [h(`label`, {
            style: item.style,
            class: item.class
        }, item.label)]);
    }
    _createButton(item, index) {
        if (item.hide) return [];
        const buttons = [];
        if (item.inline) {
            item.inline.forEach((el, inx) =>
                buttons.push(this._createButtonElm(el, inx + index)));
        } else {
            buttons.push(this._createButtonElm(item));
        }
        return h(`div.col-md-${item.size || 4}`, buttons);
    }
    _createButtonElm(item: Field, index = 0) {
        return h(`button${item.classNames || ''}${item.elmSize ? '.btn-' + item.elmSize : ''}`,
            {
                key: index,
                on: this._getListener(item),
                style: item.style,
                class: item.class,
                attrs: {
                    ...this._bindProps(item),
                    type: item.type,
                    disabled: item.disabled
                }
            },
            item.label
        );
    }
    _createCheckbox(item: Field, index, inline = false) {
        if (item.hide) return [];
        const elms = [];
        let value;
        const labelSize = item.labelSize || this.options.labelSize || 2;
        if (item.radioList) {
            if (item.type === 'radio') {
                value = this._getValueFromData(item);
                item.isValid = this._applyFieldValidation(item, value);
            }
            elms.push(h(`div.col-md-${labelSize}`, item.label));
            elms.push(h(`div.col-md-${item.size || 4}`, item.radioList.map((el, index) => {
                el.type = item.type;
                el.required = item.required;

                if (item.type === 'radio') {
                    el.name = item.name;
                    el.field = item.field;
                    el.isValid = item.isValid;
                } else {
                    value = this._getValueFromData(el);
                    el.isValid = this._applyFieldValidation(el, value);
                }
                return this._createCheckboxElm(el, index, item.inline, el.isValid, value);
            })));
            return elms;
        } else {
            value = this._getValueFromData(item);
            item.isValid = this._applyFieldValidation(item, value);
            elms.push(h(`div.col-md-${labelSize}`, ''));
            elms.push(h(`div.col-md-${item.size || 4}`,
                this._createCheckboxElm(item, index, false, item.isValid, value)));
            return elms;
        }


    }
    _createCheckboxElm(item: Field, index, inline, isValid, value) {
        const css = item.required ? isValid ? '.is-valid' : '.is-invalid' : '';
        return h(`div.custom-control.custom-` + item.type,
            {
                class: { 'custom-control-inline': inline }
            }, [
                h('input.custom-control-input' + css,
                    {
                        on: this._getListener(item),
                        style: item.style,
                        class: item.class,
                        key: item.field + index,
                        props: {
                            autofocus: item.autofocus
                        },
                        attrs: {
                            ...this._bindProps(item),
                            type: item.type,
                            disabled: item.disabled,
                            name: item.name || 'oo7',
                            id: item.field + index + 0,
                            value: item.value,
                            checked: item.value === value
                        }
                    }),
                h('label.custom-control-label', {
                    key: item.field + index + 1,
                    attrs: {
                        for: item.field + index + 0
                    }
                }, item.label)
            ]
        );
    }
    _getLabelText(item) {
        const labelItems = [item.label];
        if (item.required) {
            labelItems.push(h('span.required', '*'));
        }
        return labelItems;
    }
    _getValueFromData(item: Field) {
        let props = item.field.split('.');
        if (props.length > 1) {
            let obj = this.model.data;
            props.forEach(prop => obj = obj[prop]);
            return obj;
        }
        return this.model.data[item.field];
    }

    _setValueToData(item: Field, val) {
        let props = item.field.split('.');
        if (props.length > 1) {
            let obj = this.model.data;
            let len = props.length - 1;
            for (var index = 0; index < len; index++) {
                obj = obj[props[index]];
            }
            obj[props[index]] = val;
        }
        else { this.model.data[item.field] = val; }

    }
    _bindProps(item) {
        return typeof item.props === 'object' ? item.props : {}
    }
    _createFileElm(item: Field, value) {       
        return h('div.custom-file', {
            on: this._getListener(item),
            style: item.style,
            class: item.class,
            props: {
                autofocus: item.autofocus,
            },
            attrs: {
                ...this._bindProps(item),
                disabled: item.disabled,
                multiple: item.multiSelect,
                required: item.required
            }
        },
            [
               h(`input.custom-file-input.form-control${this._getConCssClass(item)}`,{
                   attrs:{
                       id:item.field, type:'file'
                   }
               }),
               h('label.custom-file-label',{
                   attrs:{for:item.field}
                }, item.filePlaceholder||'Choose file')
            ]
        );
    }
    _createElement(item: Field, index) {
        if (item.hide) return [];
        const children = [];
        const labelPos = this.options.labelPos || item.labelPos || 'left';
        const childrenWithLabel = [];
        const field_value = this._getValueFromData(item);
        item.isValid = this._applyFieldValidation(item, field_value);
        if (labelPos === 'top' && item.label) {
            children.push(h(`label.col-form-label${item.elmSize ?
                '.col-form-label-' + item.elmSize : ''}`,
                this._getLabelText(item)));
        }
        if (item.type === 'select') {
            children.push(this._createSelect(item, field_value));
        }
        else if (item.type === 'file') {
            children.push(this._createFileElm(item, field_value));
        }
        else {
            children.push(h(`input.form-control${this._getConCssClass(item)}`,
                {
                    on: this._getListener(item),
                    style: item.style,
                    class: item.class,
                    props: {
                        ...this._bindProps(item),
                        type: item.type,
                        autofocus: item.autofocus,
                        required: item.required,
                        value: field_value,
                        disabled: item.disabled
                    }
                }));
        }

        if (item.info) {
            children.push(h('small.form-text.text-muted', item.info));
        }
        if (!item.isValid && item.invalidFeedback) {
            children.push(h('div.invalid-feedback', item.invalidFeedback));
        }

        if (labelPos === 'left' && item.label) {
            const labelSize = item.labelSize || this.options.labelSize || 2;
            childrenWithLabel.push(h(`label.col-form-label${item.elmSize ?
                '.col-form-label-' + item.elmSize : ''}${'.col-md-' + labelSize}`,
                this._getLabelText(item)));
        }
        childrenWithLabel.push(h(`div.col-md-${item.size || 4}`, children));
        return childrenWithLabel;
    }
    _applyFieldValidation(item: Field, field_value: any) {
        if (!item.required) { return true; }
        let isValid = false;
        if (item.required && item.type === 'select') {
            field_value = field_value || '0';
            return field_value == '0' ? false : true;
        }
        if (item.required && field_value) {
            return true;
        }
        return isValid;

    }
    _getConCssClass(item: Field) {        
       var css = item.isValid ? '.is-valid' : '.is-invalid';
        return css;
    }
    _createSelect(item: Field, field_value) {
        if (!item.data) item.data = [];
        if (!item.multiSelect && item.data[0].value !== '0') {
            item.data = [{ text: item.selectTitle || 'Select item', value: '0' }, ...item.data];
        }
        if (item.multiSelect) {
            if (!Array.isArray(field_value)) {
                field_value = [];
            }
            field_value = field_value.map(_ => _.toString());
        } else {
            if (!field_value) {
                field_value = '0';
            } else {
                field_value = field_value.toString();
            }
        }

        return h(`select.custom-select.form-control${this._getConCssClass(item)}`,
            {
                on: this._getListener(item),
                style: item.style,
                class: item.class,
                props: {
                    autofocus: item.autofocus,
                },
                attrs: {
                    ...this._bindProps(item),
                    disabled: item.disabled,
                    multiple: item.multiSelect,
                    required: item.required
                }
            },
            item.data.map((it, index) => {
                if (Array.isArray(it.options) && it.options.length > 0) {
                    return h('optgroup', {
                        key: item.field + index,
                        attrs: {
                            label: it.text
                        }
                    },
                        it.options.map(groupOption => h('option', {
                            key: groupOption.value,
                            attrs: {
                                selected: item.multiSelect ?
                                    field_value.indexOf(groupOption.value.toString()) !== -1 :
                                    field_value === groupOption.value.toString(),
                                value: groupOption.value,

                            }
                        }, groupOption.text)))
                }
                return h('option',
                    {
                        key: item.field + index,
                        attrs: {
                            selected: item.multiSelect ? field_value.indexOf(it.value.toString()) !== -1 : field_value === it.value.toString(),
                            value: it.value,

                        }
                    }, it.text);
            })
        );

    }
    _findTab(items, tabName) {
        for (let item of items) {
            if (Array.isArray(item)) {
                const res = this._findTab(item, tabName);
                if (res) { return res; }
            }
            else if (item.type === 'tabs' && typeof item.tabs === 'object') {
                const find = item.tabs[tabName];
                if (find) { return [find, item]; }
            }
        }
        return null;
    }
    _findField(items, fieldName) {
        for (let item of items) {
            if (Array.isArray(item)) {
                const res = this._findField(item, fieldName);
                if (res) { return res; }
            }
            else if (item.field === fieldName) {
                return item;
            }
            else if (item.type === 'tabs' && typeof item.tabs === 'object') {
                Object.keys(item.tabs).forEach(key => {
                    if (item.tabs[key].field === fieldName) {
                        return item.tabs[key];
                    }
                });
            }
        }
        return null;
    }
    findTab(tabName) {
        if (this.options.inputs) {
            return this._findTab(this.options.inputs, tabName);
        }
        return null;
    }
    findField(fiendName) {
        if (this.options.inputs) {
            return this._findField(this.options.inputs, fiendName);
        }
        return null;
    }
    selectTab(tabName, item: Field = null) {
        if (!item) {
            item = this.findTab(tabName);
            if (item) { item = item[1]; }
        }
        if (item) {
            let prevTab = item.activeTab;
            const res = typeof item.tabClick === 'function' ?
                item.tabClick(tabName, item.activeTab) : true;
            if (typeof res === 'boolean') {
                if (res) {
                    item.activeTab = tabName;
                    this.dispatch({
                        type: TAB_CLICK,
                        payload: {
                            activeTab: tabName,
                            prevTab: prevTab,
                            data: this.model,
                            formName: this.options.name || 'form007'
                        }
                    }, true);
                }
            }
            else if (typeof res === 'object' && res.then) {
                res.then(isTrue => {
                    if (isTrue) {
                        item.activeTab = tabName;
                        this.dispatch({
                            type: TAB_CLICK,
                            payload: {
                                activeTab: tabName,
                                prevTab: prevTab,
                                data: this.model,
                                formName: this.options.name || 'form007'
                            }
                        }, true);
                    }
                })
            }
        }
        return this;
    }
    refresh() {
        this.dispatch({ type: OPTIONS_CHANGED });
    }
    showModal(isOpen) {
        if (isOpen) $('#' + this.modalId).modal({ backdrop: false, show: true });
        else $('#' + this.modalId).modal('hide');
    }
    setSelectData(fieldName, data) {
        const item = this.findField(fieldName);
        if (item) {
            item.data = data;
        }
        return this;
    }
    setFormData(data) {
        this.model.data = data;
        return this;
    }
    getFormData() {
        return this.model.data;
    }
}

export { juForm, TAB_CLICK, FORM_VALUE_CHANGED }
