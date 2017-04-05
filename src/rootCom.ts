import {h, Router} from 'zaitun';

export default class RootCompoent{
    view(obj){
        return h('div',[
           Router.CM.child.view({
               model:obj.model.child,
               dispatch:ac=>obj.dispatch({type:'CHILD', childAction:ac})
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