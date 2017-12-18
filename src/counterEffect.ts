import { Router, EffectSubscription } from 'zaitun';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {empty} from 'rxjs/observable/empty';

import counter from './counter';
import parent from './parent';

export class CounterEffect{
    constructor(es:EffectSubscription, router:Router){       
        es
        .addEffect(effect$ =>
            effect$.whenAction(counter.actions.LAZY)
                .delay(1000)
                .map(action => ({ ...action, type: counter.actions.INCREMENT }))
        )  
    }
}

export default CounterEffect;