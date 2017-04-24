import {h, Router} from 'zaitun';
import {Actions} from './effect';
export default class RootCompoent{
    afterViewRender(){ 
       //set actions to Router.CM. so that we can use it
       //through out the app
       const action$=new Actions();
       action$.subscribe(action=>{});       
       Router.CM.action$=action$;
    }
    view({model, dispatch}){
        return h('div',[
           Router.CM.child.view({
               model:model.child,
               dispatch:ac=>dispatch({type:'CHILD', childAction:ac})
            }) 
        ])
    }
    update(model, action){
        switch (action.type) {
            case 'CHILD':
               return {...model, child:Router.CM.child.update(model.child, action.childAction)}
        
            default:
                return model;
        }
    }
}