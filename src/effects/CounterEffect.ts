import { Router } from 'zaitun';

import { delay, map } from 'rxjs/operators';
import { Effect } from 'zaitun-effect';

import {LAZY, INCREMENT} from '../components/actionTypes';


export class CounterEffect {
    constructor(router: Router) {
        router.addEffect((effect: Effect) =>
            effect.whenAction(LAZY)
                .pipe(
                    delay(1000),
                    map(action => ({ ...action, type:INCREMENT }))
                ));
    }
}

export default CounterEffect;
