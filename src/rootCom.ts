import {h, Router} from 'zaitun';

export default class RootCompoent{
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