
/** @jsx html */
import{ Action, Router, jsx} from 'zaitun';
import{EffectSubscription} from './effect';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

const html=jsx.html;
export default class counter{
    es:EffectSubscription;    
    constructor(){
        this.es=new EffectSubscription();      
    }
    init(){
        return {count:0, msg:''}
    }
    
    afterViewRender(model?:any, dispatch?:any){
       this.es.addEffect(action$=>
            action$.whenAction('lazy')
                   .delay(1000)
                   .map(ac=>({...ac,type:'inc'}))
        ); 

        this.es.addEffect(action$=>
            action$.whenAction('input')
                   .debounceTime(500)
                   .distinctUntilChanged()
                   .switchMap(val=>Observable.of({...val, type:'search'}))
                   
        );        
    }
    onDestroy(){
        this.es.dispose();
    }
    view({model,dispatch}){       
        return <span>
            <button on-click={_=>dispatch({type:'inc'})}>+</button>
            <button on-click={[dispatch,{type:'lazy', dispatch}]}>+ (Async)</button>
            <button on-click={[dispatch,{type:'dec'}]}>-</button>
            <b>{model.msg||model.count}</b>
            <input on-input={e=>Router.CM.action$.dispatch({type:'input', payload:e.target.value, dispatch})} type="text" value={model.msg}/>
        </span>
    }
    update(model?:any, action?:Action){
        Router.CM.action$.dispatch(action);
         switch (action.type) {
             case 'inc': return {count:model.count+1, msg:''};
             case 'dec': return {count:model.count-1, msg:''};
             case 'lazy': return {count:model.count, msg:'loaading...'};
             case 'search': return {count:model.count, msg:action.payload};
             default:
                 return model;
         }   
    }
}
