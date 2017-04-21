/** @jsx html */
import {jsx, Router} from 'zaitun';
const html=jsx.html;
import {EffectSubscription} from './effect';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

export default class Animation{
    es:EffectSubscription;
    constructor(){
        this.es=new EffectSubscription();
    }
    init(){
        return {boxList:[]}
    }
    onViewInit(){
        this.es.addEffect(action$=>
            action$.whenAction('mousemove')
            .mergeMap(action=>{                
                const ev=action.payload;
                action.payload={
                    width:'20px',
                    height:'20px',                    
                    top:(ev.clientY-70)+'px',
                    left:(ev.clientX-120)+'px', 
                    position: 'absolute',
                    backgroundColor: `rgb(${this.random(0, 255)},${this.random(0, 255)},${this.random(0, 255)})`,
                    borderRadius:'.4em',
                    boxShadow: `-7px -8px 6px -7px rgba(${this.random(0, 255)},${this.random(0, 255)},${this.random(0, 255)},0.75)`
                };
                action.type='new-box'
                return Observable.of(action);
            })
        );
    }
    onDestroy(){
        this.es.dispose();
    }
    view({model, dispatch}){
        return <div  on-mousemove={ev=>Router.CM.actions$.next({type:'mousemove',payload:ev,dispatch})}
                style={{width:'100%', height:'400px',border:'#ddd 1px solid'}}>
            {model.boxList.map(box=><this.Box model={box}/>)}
        </div>
    }
    Box({model, key}){       
        return <div style={model}></div>
    }
    update(model, action){
        Router.CM.actions$.dispatch(action);
        switch (action.type) {
            case 'new-box':
                model.boxList.push(action.payload);
                if(model.boxList.length>25){
                    model.boxList.shift();
                } 
                return {boxList:model.boxList};       
            default:
                return model;
        }
    }
    random(low, high) {        
        return Math.floor(Math.random() * (high - low + 1)) + low;
  }
}