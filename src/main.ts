import { bootstrap } from 'zaitun';

import rootCom from './components/rootComponent';
import routes from './routes';

import {EffectManager} from 'zaitun-effect';
import {DevTool} from 'zaitun-devtool';


bootstrap({
    containerDom: '#app',
    mainComponent: rootCom,    
    routes: routes,
    activePath: 'animation',
    devTool: DevTool,
    effectManager:EffectManager
    //cacheStrategy:'session'
});

