/** @jsx html */

import { jsx, Router } from 'zaitun';
import { Actions } from './effect';
const html = jsx.html;
const CHILD = Symbol('CHILD');

export default class RootCompoent {
    init() {
        return {
            menu: [
                { path: 'counter', text: 'Counter' },
                { path: 'counterList/5/test', text: 'Counter List' },
                { path: 'todos', text: 'Todos' },
                { path: 'animation', text: 'Animation' },
                { path: 'orderAnimation', text: 'Order Animation' },
                { path: 'heroAnimation', text: 'Hero Animation' },
                { path: 'treeView', text: 'Tree View' },
            ]
        };
    }
    afterViewRender() {
        //set actions to Router.CM. so that we can use it
        //through out the app       
        const action$ = new Actions();
        action$.subscribe(action => { });
        Router.CM.action$ = action$;        
    }
    view({ model, dispatch }) {
        return <div>
            <this.TopMenu model={model.menu} />
            <div>{Router.CM.child.view({ model: model.child, dispatch: action => dispatch({ type: CHILD, childAction: action }) })}</div>
        </div>
    }
    update(model, action) {
        switch (action.type) {
            case CHILD:
                return { ...model, child: Router.CM.child.update(model.child, action.childAction) }

            default:
                return model;
        }
    }
    TopMenu({ model }) {
        return <nav classNames="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
            <a classNames="navbar-brand" href="#/counter">Zaitun</a>
            <div classNames="collapse navbar-collapse" id="navbarCollapse">
                <ul classNames="navbar-nav mr-auto">
                    {model.map(nav => <li classNames="nav-item" class={{ active: Router.activeRoute.navPath === nav.path }}><a classNames="nav-link" href={'#/' + nav.path}>{nav.text}</a></li>)}
                </ul>

            </div>
        </nav>
    }
}