/** @jsx html */
import { jsx } from 'zaitun';
const html = jsx.html;

export default class TreeViewExample {

    constructor() {
        this.TreeView = this.TreeView.bind(this);
        this.TreeNode = this.TreeNode.bind(this);
    }
    init() {
        return {
            data: [
                { name: 'item1' },
                {
                    name: 'item2', children: [
                        { name: 'item2.1' },
                        { name: 'item2.2' }
                    ]
                },
                 { name: 'item3' },
            ]
        }
    }
    view({ model, dispatch }) {        
        return <div>
            <h3>double click on the item to have a child</h3>
            <div classNames="treeView">
                <this.TreeView model={model.data} dispatch={dispatch} />
            </div>
        </div>
    }
    TreeView({ model, dispatch}) {
        return <ul>
            {model.map(item => <this.TreeNode model={item} dispatch={dispatch} />)}
        </ul>
    }
    TreeNode({ model, dispatch }) {
        return <li>
            <div on-click={[dispatch,{type:'toggle', item:model}]}
                on-dblclick={[dispatch,{type:'changeType', item:model}]}
                class={{ bold: this.isFolder(model), item: this.isFolder(model) }}>
                {model.name}               
                {this.isFolder(model) ? <span>[{model.open ? '-' : '+'}]</span> : ''}
            </div>
            {model.open&&this.isFolder(model)?<this.TreeView model={model.children} dispatch={dispatch} />:''}
        </li>
    }
    update(model, action) { 
        
        switch (action.type) {
            case 'toggle':           
                action.item.open=! action.item.open;
                return model;     
            case 'changeType':  
                this.addFolder(action.item);       
                return model;
            default:
                return model;
        }
    }
    isFolder(item) {
        return item.children && item.children.length
    }
    addFolder(item){
        if(!this.isFolder(item)){          
            item.open=true;
            item.children=[{name:'new item'}];
        }
    }
}