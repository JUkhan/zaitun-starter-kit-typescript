import { bootstrap, RouteOptions, Router, Component } from 'zaitun';

import rootCom from './rootComponent';
import page1 from './page1';

function getData(routeParams: any) {
    console.log(routeParams);
    return new Promise(accept => {
        setTimeout(() => {
            accept(
                new Array(+routeParams.times)
                    .fill('fruit-')
                    .map((fruit, i) => fruit + i)
            );
        }, 1000);
    });
}

class AuthService {
    canActivate(router: Router) {
        //return new Promise(accept=>accept(true));
        return confirm('are your 18+ ?');
    }
    canDeactivate(component: Component, router: Router) {
        //return component.canDeactivate();
        return confirm('Do you realy want to leave ?');
    }
}

const routes: RouteOptions[] = [
    { path: 'page1', component: page1 },
    {
        path: 'page2',
        canActivate: AuthService,
        loadComponent: () => System.import('./page2')
    },
    {
        path: 'page3/:times/:title',
        data: getData,
        loadComponent: () => System.import('./page3')
    },
    {
        path: 'counter',
        cache: true,
        cacheStrategy:'local',
        loadEffects: [() => System.import('./counterEffect')],
        loadComponent: () => System.import('./counter')
    },
    {
        path: 'parent',
        canDeactivate: AuthService,
        loadEffects: [() => System.import('./counterEffect')],
        loadComponent: () => System.import('./parent')
    }
];

bootstrap({
    containerDom: '#app',
    mainComponent: rootCom,    
    routes: routes,
    activePath: 'page1',
    devTool: true,
    cacheStrategy:'session'
});

