import {ViewObj} from 'zaitun';
import {div, b} from 'zaitun/dom';
import { html } from 'snabbdom-jsx';
import {juGrid} from './ui/juGrid';
import {GridOptions} from './ui/uimodel';

export default class GridExample{
    grid:juGrid;
    selectedRow:any;

    constructor(){
        console.log('gridExample constructor');
        this.grid=new juGrid();
    }
    init(){
        return { gridOptions:this.getGridOptions()}
    }
    afterViewRender(model, dispatch){   
        console.log('afterviewRender');     
        const countries=[   
            {text:'Select country', value:0},         
            {text:'Bangladesh', value:1},
            {text:'Pakistan', value:2},
            {text:'Uzbekistan', value:3}
        ];
        this.grid.setSelectData(4, countries);
    }
    view({model, dispatch}:ViewObj){
        return div([
            b( 'Grid Example'),
            this.grid.view({model:model.gridOptions, dispatch})
        ])
    }
    update(model, action){
        switch (action.type) {
            default:
               return model;
        }
    }
    formClass(){
        return {'form-control':1,'form-control-sm':1 };
    }
    add(){
        this.grid
        .addRow({name:'', age:16, address:'', single:false, country:''})
        .refresh();
    }
    getGridOptions():GridOptions{       
        return {           
            tableClass:'.table-sm.table-bordered',            
            headerClass:'.thead-default',
            footerClass:'.thead-default',
            pager:{pageSize:5, linkPages:10, enablePowerPage:0, nav:1, search:1, pagerInfo:1, elmSize:'sm'},           
            singleSelect:true,
            selectedRows:(rows, ri, ev)=>{                
                this.selectedRow=rows;
            },
            editPer:true,
            recordChange:(row, col, ri, ev)=>{this.grid.refresh();},                  
            columns:[
                {header:'Name',hClass:'.max', sort:true, iopts:{class:r=>this.formClass()}, focus:true, field:'name',type:'text'},
                {header:'Age', sort:true, iopts:{class:r=>this.formClass()}, editPer:row=>false, field:'age', type:'number', tnsValue:val=>val+' - formated'},
                {header:'Birth Date',sort:true, iopts:{class:r=>this.formClass()}, field:'address', type:'date'},
                {id:4, header:'Country',iopts:{class:r=>this.formClass()}, field:'country', type:'select'},
                {header:'Single?', field :'single', type:'checkbox', tnsValue:val=>val?'Yes':'No'},
                
            ],
            
            footers:[
                //[{text:'footer1',style:col=>({color:'red'})},{text:'footer1',props:{colSpan:4}}],
                [
                    {cellRenderer:data=><b>Total Rows: {data.length}</b>},
                    {cellRenderer:data=>
                        <div>
                            <button on-click={()=>this.add()}>Add <i classNames="fa fa-plus"></i></button>&nbsp;
                            <button disabled={this.grid.data.length===0} on-click={()=>confirm('Remove sure?')&& this.grid.removeRow(this.selectedRow).pager.clickPage(this.grid.pager.activePage)}>Remove <i classNames="fa fa-trash"></i></button>
                        </div>
                    },
                    {props:{colSpan:2}, cellRenderer:d=><b>Total Selected Rows: {d.filter(_=>_.selected).length}</b>},
                    {cellRenderer:data=><b>{data.reduce((a,b)=>a+(b.single?1:0),0)}</b>}
                ]
            ] 
        }
    }
}