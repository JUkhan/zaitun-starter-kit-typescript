
import { ViewObj, Action, Router } from 'zaitun';
//import { html } from 'snabbdom-jsx';
import { FormOptions } from './ui/uimodel';
import { juForm, TAB_CLICK, FORM_VALUE_CHANGED } from './ui/juForm'
import Counter from './counter';
const COUNTER_UPDATE = 'counterUpdate';
const myForm = new juForm();
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/mergeMap';

//var form = document.getElementById("form-validation");

// if (form.checkValidity() == false) 

function init() {
    return {
        form1: { data: { name: 'jasim' }, options: getFormOptions(), counter: Counter.init() },

    }
}
function onCache(model: any) {
    model.form1.options = init().form1.options;
    return model;
}
function view({ model, dispatch, router }: ViewObj) {
    return myForm.view({ model: model.form1, dispatch, router });

    //return h('a', {attrs: {href: '/counter', for:'asd', minlength: 1, selected: true, disabled: false}},'HELLO LINK');
}


function update(model, action: Action) {

    switch (action.type) {
        case FORM_VALUE_CHANGED:
        case TAB_CLICK:
            console.log(action.payload);
            return model;
        case COUNTER_UPDATE:
            model.form1.counter = Counter.update(model.form1.counter, action.payload);
            return model;
        default: return model;
    }

}
function afterViewRender(dispatch, router: Router) {
    router.effect$.addEffect(eff =>
        eff.whenAction(TAB_CLICK, FORM_VALUE_CHANGED)
            .mergeMap(action => {
                console.log(action);
                return empty();
            })
    )
}
function getFormOptions(): FormOptions {
    return {
        viewMode: 'form',
        name: 'form1',
        labelSize: 2,
        labelPos: 'left',
        title: 'Form Title',
        inputs: [
            {
                type: 'button',
                label: 'Get Form Data',
                on: { click: ev => console.log(myForm.getFormData()) }
            },
            [{
                field: 'name', autofocus: true,
                required: true, invalidFeedback:'must enter your name',
                label: 'Adress',
                type: 'text', size: 3, info: 'zaitun is awesome'
            },
            {
                field: 'date',
                label: 'Age',
                required: true,
                disabled: true,
                props: { maxLength: 10, placeholder: '00/00/0000' },
                type: 'date',
                size: 3
            }],
            {
                type: 'file',
                field: 'dataFile',
                invalidFeedback: '.jpg & .jpeg files are only allowed',
                fileExt: ['.jpg', '.jpeg'],
                label: 'Select file',
                required: true
            },
            {
                type: 'radio',
                inline: !false,
                required: true, size: 6,
                name: 'mata',
                label: 'Select',
                field: 'asd',
                radioList: [
                    {
                        value: 'leave',
                        label: 'I want to leave',
                        type: 'radio', size: 3, info: 'zaitun is awesome'
                    },
                    {
                        value: 'continue',
                        label: 'Do you want to continue',
                        type: 'radio', size: 3, info: 'zaitun is awesome'
                    },
                ]
            },
            {

                field: 'f1',
                required: true,
                value: 'leave',
                label: 'I want to leave',
                type: 'checkbox', size: 3, info: 'zaitun is awesome'
            },
            {

                field: 'f2',
                required: true,
                value: 'continue',
                label: 'Do you want to continue',
                type: 'checkbox', size: 3, info: 'zaitun is awesome'
            },
            {
                field: 'gender', required: true,
                type: 'select', invalidFeedback: 'This field is mandatory',
                label: 'Gender', elmSize: 'sm', multiSelect: true,
                info: 'Slect the for test!',
                data: [
                    { text: 'Male', value: 1 },
                    { text: 'Female', value: 2 },
                    { text: 'test', value: 3 },
                    { text: 'test2', value: 4 }
                ]
            },
            {
                field: 'gender2', required: true,
                type: 'select', invalidFeedback: 'This field is mandatory',
                label: 'Gender', elmSize: 'sm', multiSelect: true,
                info: 'Slect the for test!', props: { size: 10 },
                data: [
                    {
                        text: 'Group1', options: [
                            { text: 'Male', value: 1 },
                            { text: 'Female', value: 2 }]
                    },
                    {
                        text: 'Group2', options: [
                            { text: 'test', value: 3 },
                            { text: 'test2', value: 4 }]
                    }
                ]
            },
            {
                type: 'tabs',
                field: '',
                footer: [
                    { label: 'ADD', type: 'button' },
                    { label: 'remove', type: 'button' }
                ],
                activeTab: 'Test Tab',
                tabs: {
                    'Test Tab': {
                        inputs: [
                            { field: 'age', type: 'number', label: 'Age' }
                            , { field: 'counter', type: 'component', actionType: COUNTER_UPDATE, component: Counter }
                        ]
                    },
                    'Test Tab2': {
                        inputs: [
                            { field: 'address', required: true, type: 'text', label: 'Address', info: 'test danger' }
                        ]
                    },
                    'Test Tab3': {
                        inputs: [
                            { field: 'address2', required: true, type: 'text', label: 'Address2', info: 'test danger' }
                        ]
                    }
                }
            }

        ]

    };
}
export default { init, view, update, afterViewRender, onCache }
