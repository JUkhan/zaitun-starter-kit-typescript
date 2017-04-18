import {h, Router} from 'zaitun';
import {Actions} from './effect';
export default class RootCompoent{
    onViewInit(){   

       //set actions to Router.CM. so that we can use it
       //through out the app
       const actions$=new Actions();
       actions$.subscribe(action=>{});       
       Router.CM.actions$=actions$;
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