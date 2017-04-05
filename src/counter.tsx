
/** @jsx html */
import{jsx, Action} from 'zaitun';
const html=jsx.html;
export default class counter{
    init(){
        return {count:0}
    }
    view({model,dispatch}){
        return <span>
            <button on-click={[dispatch,{type:'inc'}]}>+</button>
            <button on-click={[dispatch,{type:'dec'}]}>-</button>
            <b>{model.count}</b>
        </span>
    }
    update(model, action:Action){
         switch (action.type) {
             case 'inc': return {count:model.count+1};
             case 'dec': return {count:model.count-1};
             default:
                 return model;
         }   
    }
}