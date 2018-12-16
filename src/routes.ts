
import {  RouteOptions } from 'zaitun';
import animation from './components/animation';
import {PagePermissionService} from './services/PagePermissionService';

function getData(routeParams: any) {
    console.log(routeParams);
    return new Promise(accept => {
        setTimeout(() => {
            accept(
                new Array(+routeParams.times)
                    .fill('fruit-')
                    .map((fruit, i) => fruit + i)
            );
        }, 100);
    });
}


const routes: RouteOptions[] = [
    { path: 'animation', component: animation },
    {
        path: 'search',
        canActivate: PagePermissionService,
        loadComponent: () => System.import('./components/search')
    },
    {
        path: 'dataloading/:times/:title',
        data: getData,
        loadComponent: () => System.import('./components/dataLoading')
    },
    {
        path: 'counter',
        cache: true,
        cacheStrategy:'local',
        loadEffects: [() => System.import('./effects/CounterEffect')],
        loadComponent: () => System.import('./components/counter')
    },
    {
        path: 'parent',
        canDeactivate: PagePermissionService,
        loadEffects: [() => System.import('./effects/CounterEffect')],
        loadComponent: () => System.import('./components/parentChild')
    },
    {
        path: 'form', cache:true,
        loadEffects: [() => System.import('./effects/CounterEffect')],
        loadComponent: () => System.import('./components/formExample')
    },
    {
        path: 'grid',
        loadComponent: () => System.import('./components/gridExample')
    },
    {
        path: 'fiber',
        loadComponent: () => System.import('./fiber/fiberExample')
    },
    {
        path: 'dispute',
        loadComponent: () => System.import('./components/disputeCom')
    },
    {
        path: 'chart',
        loadComponent: () => System.import('./components/chart')
    },
];

export default routes;