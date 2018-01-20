
import { ViewObj, Action, Router } from 'zaitun';
import {div } from 'zaitun/dom';
//import { html } from 'snabbdom-jsx';
import { FormOptions } from './ui/uimodel';
import { juForm, TAB_CLICK, FORM_VALUE_CHANGED } from './ui/juForm'
import Counter from './counter';

import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/mergeMap';
import { Validators } from './ui/Validators'
const COUNTER_UPDATE = 'counterUpdate';
const MY_FORM_UPDATE = 'my-form-update';

const myForm = new juForm();

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

    return myForm.view({
        model: model.form1,
        router,
        dispatch:router.bindEffect(action => dispatch({ type: MY_FORM_UPDATE, payload: action }))
    });

    //return h('a', {attrs: {href: '/counter', for:'asd', minlength: 1, selected: true, disabled: false}},'HELLO LINK');
}


function update(model, action: Action) {

    switch (action.type) {
        case MY_FORM_UPDATE:        
            switch (action.payload.type) {
                case FORM_VALUE_CHANGED:
                case TAB_CLICK:
                    return { form1:myForm.update(model.form1, action.payload)};
                case COUNTER_UPDATE:
                   let counter = Counter.update(model.form1.counter, action.payload.payload);                  
                   return {form1:{...model.form1, counter}};
            }
        default: return model;
    }

}
function afterViewRender(dispatch, router: Router) {   
    router.addEffect(eff =>
        eff.whenAction(TAB_CLICK)
            .mergeMap(action => {
                console.log('formExample....',action);
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
            [{
                field: 'name', //autofocus: true,               
                label:model =>`Name( ${model.data.name} )`,
                validators: [
                    Validators.required(),
                    Validators.minLength(5),
                    Validators.maxLength(7)
                ],
                type: 'text', size: 3, info: 'zaitun is awesome'
            },
            {
                field: 'date',
                label: 'Age',
                disabled:(model)=>!model.data.email,
                validators:[Validators.required()],
                props: { maxLength: 10, placeholder: '00/00/0000' },
                type: 'date',
                size: 3
            }],
            {
                field: 'email',
                label: 'Email',
                type: 'email',
                validators: [Validators.email()]
            },
            {
                type: 'file',
                field: 'dataFile',
                invalidFeedback: '.jpg & .jpeg files are only allowed',
                fileExt: ['.jpg', '.jpeg'],
                label: 'Select file',
                validators: [Validators.required()]
            },
            {
                type: 'radio',
                inline: !false,
                size: 6,
                validators: [Validators.required()],
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
                value: 'leave',
                label: 'I want to leave', validators: [Validators.required()],
                type: 'checkbox', size: 3, info: 'zaitun is awesome'
            },
            {

                field: 'f2',
                value: 'continue',
                label: 'Do you want to continue', validators: [Validators.required()],
                type: 'checkbox', size: 3, info: 'zaitun is awesome'
            },
            {
                field: 'gender',
                type: 'select', invalidFeedback: 'This field is mandatory',
                label: 'Gender', elmSize: 'sm', validators: [Validators.required()],
                info: 'Slect the for test!',
                data: [
                    { text: 'Male', value: 1 },
                    { text: 'Female', value: 2 },
                    { text: 'test', value: 3 },
                    { text: 'test2', value: 4 }
                ]
            },
            {
                field: 'gender2',
                type: 'select', invalidFeedback: 'This field is mandatory',
                label: 'Gender', elmSize: 'sm', multiSelect: true,
                validators: [Validators.required()],
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
                            {
                                field: 'age',
                                type: 'number',
                                label: 'Age',                                
                                validators: [Validators.minNumber(5), Validators.maxNumber(10)]
                            }
                            , { field: 'counter', type: 'component', actionType: COUNTER_UPDATE, component: Counter }
                        ]
                    },
                    'Test Tab2': {  
                        disabled:model=>model.data.asd==='continue',                      
                        inputs: [
                            { field: 'address', type: 'text', label: 'Address', info: 'test danger' }
                        ]
                    },
                    'Test Tab3': {
                        hide:model=>model.data.asd==='continue',
                        inputs: [
                            { field: 'address2', type: 'text', label: 'Address2', info: 'test danger' }
                        ]
                    }
                }
            },
            {
                type: 'button',
                label: 'Submit',
                props: (model: any) => ({ disabled: !myForm.isValid }),
                on: { click: ev => console.log(myForm.getFormData()) }
            },
            {
                type:'vnode',
                vnode:model=>div('.card',JSON.stringify(model.data))
            }

        ]

    };
}
export default { init, view, update, afterViewRender, onCache }
