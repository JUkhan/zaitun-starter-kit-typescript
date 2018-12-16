import { bootstrap, RouteOptions } from 'zaitun';
import {EffectManager} from 'zaitun-effect';

import rootCom from '../src/components/rootComponent';
import animation from '../src/components/animation';
import search from '../src/components/search';
import dataloading from '../src/components/dataLoading';
import counterEffect from '../src/effects/CounterEffect';
import counter from '../src/components/counter';
import parentChild from '../src/components/parentChild';

function getData(routeParams: any) {
    console.log(routeParams);
    return new Promise(accept => {
        setTimeout(() => {
            accept(
                new Array(routeParams.times)
                    .fill('fruit-')
                    .map((fruit, i) => fruit + i)
            );
        }, 1000);
    });
}

const routes: RouteOptions[] = [
    { path: 'animation', component: animation },
    {
       path: 'search',       
       component:search
    },
    {
        path: 'dataloading/:times/:title',
        data: getData,
        component:dataloading
    },
    {
        path: 'counter',               
        effects: [counterEffect],
        component:counter
    },
    {
        path: 'parent',       
        effects: [counterEffect],
        component: parentChild
    }
];

var run=(navName)=>{    
    return bootstrap({
        containerDom: document.createElement('div'),
        mainComponent: rootCom,
        routes: routes,
        activePath: navName,
        locationStrategy:'memory',
        devTool: false,
        effectManager:EffectManager
    }).test();
}

export default run;

