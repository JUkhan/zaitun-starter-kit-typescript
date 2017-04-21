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
                    left:(ev.clientX-80)+'px', 
                    position: 'absolute',
                    backgroundColor: "rgb(" + (this.random(0, 255)) + ", " + (this.random(0, 255)) + ", " + (this.random(0, 255)) + ")",
                    // opacity: '0', 
                    // transition: 'opacity 500ms', 
                    // delayed: {opacity: '1'},
                    // remove: {opacity: '0'},
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
            {model.boxList.map((box, key)=><this.Box model={box} key={key}/>)}
        </div>
    }
    Box({model, key}){       
        return <div key={key} style={model}></div>
    }
    update(model, action){
        Router.CM.actions$.dispatch(action);
        switch (action.type) {
            case 'new-box':
                model.boxList.push(action.payload);
                if(model.boxList.length>25){
                    model.boxList.shift();
                } 
                return model;       
            default:
                return model;
        }
    }
    random(low, high) {        
        return Math.floor(Math.random() * (high - low + 1)) + low;
  }
}