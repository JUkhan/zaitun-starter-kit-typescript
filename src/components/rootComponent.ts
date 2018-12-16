import { Router, ViewObj, Dispatch, Action,Injector } from 'zaitun';
import { div, h3, nav, a, ul, li } from 'zaitun/dom';


import { mergeMap } from 'rxjs/operators';
import { empty } from 'rxjs';
import {AppService} from '../services/AppService';
import { juForm } from './ui/juForm';
import {Effect} from 'zaitun-effect';
import {CHILD,INC_AT,DEC_AT,INCREMENT,DECREMENT} from './actionTypes';

var appService:AppService=Injector.get(AppService);
var popup: juForm = new juForm();

function getPopupOptions() {
    return {
        viewMode: 'popup',
        title: 'Popup Title',
        name: 'alert-popup',
        size: 'sm',
        inputs: [
            { type: 'vnode', vnode: model => appService.msg }
        ]
    }
}

function init() {

    return {
        popup: {
            options: getPopupOptions(),
            data: {}
        },
        incAt: null,
        decAt: null,
        menu: [
            { path: 'animation', text: 'Animation' },
            { path: 'search', text: 'Search' },
            { path: 'dataloading/5/My favourite fruits', text: 'Data Loading' },
            { path: 'counter', text: 'Counter' },
            { path: 'parent', text: 'Parent Child' },
            { path: 'form', text: 'Form Examples' },
            { path: 'grid', text: 'Grid Examples' },
            { path: 'dispute', text: 'Dispute' },
            { path: 'chart', text: 'Chart' },
            { path: 'fiber', text: 'Fiber Examples' },
        ]
    };
}
function afterChildRender(dispatch: Dispatch, router: Router) {
    router
        .addEffect((eff:Effect) =>
            eff.whenAction(INCREMENT)
                .pipe(
                    mergeMap(action => {
                        dispatch({ type: INC_AT, payload: new Date().toLocaleTimeString() });
                        return empty();
                    }))
        )
        .addEffect((eff:Effect) =>
            eff.whenAction(DECREMENT)
                .pipe(
                    mergeMap(action => {
                        dispatch({ type: DEC_AT, payload: new Date().toLocaleTimeString() });
                        return empty();
                    }))
        );
    appService.setPopup(popup);
}
function view({ model, dispatch, router }: ViewObj) {
    return div([
        topMenu(model.menu, router),
        h3('Root Component'),
        div(model.incAt ? 'Last incremented at: ' + model.incAt : ''),
        div(model.decAt ? 'Last decremented at: ' + model.decAt : ''),
        div(
            router.viewChild({
                model: model.child,
                router,
                dispatch: action => dispatch({ type: CHILD, payload: action })
            })
        ),
        popup.view({ model: model.popup, dispatch, router })
    ]);
}

function update(model, action: Action, router: Router) {
    switch (action.type) {
        case CHILD:
            return {
                ...model,
                child: router.updateChild(model.child, action.payload)
            };
        case INC_AT:
            return { ...model, incAt: action.payload };
        case DEC_AT:
            return { ...model, decAt: action.payload };
        default:
            return model;
    }
}

function topMenu(model, router) {
    return nav('.navbar.navbar-expand-sm.bg-dark navbar-dark',
        [
            a('.navbar-brand', { props: { href: '/counter' } }, 'Zaitun'),
            ul('.navbar-nav', model.map(nav => li('.nav-item', {
                class: { active: router.activeRoute.navPath === nav.path }
            },
                a('.nav-link', { props: { href: nav.path } }, nav.text)
            )
            )
            )
        ]);

}

export default { init, view, update, afterChildRender };
