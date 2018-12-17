import {Injectable} from 'zaitun';

@Injectable('page')
export  class DisputeService{
    private ch:any[];
    private hccd:any;
    private rprData=[];
    private hcfaData=[];
    constructor(){
        this.ch=['','a','b','c','d','e','f','g','h','i','f','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        this.hcfaCode();
        for (var index = 0; index < 150; index++) {
            this.rprData.push({shortDes:this.charByLimit(5), auto:false, des:this.charByLimit(25), hcfaCd:this.getHccd(), active:this.boolValue()})
        }
        for (var index = 1; index < 20; index++) {
            this.hcfaData.push({hcfaCd:this.hccd[index], type:index%2==0?'PDC':'MCSD', des:this.charByLimit(25)})
        }
    }
    getPermission(){
        return Promise.resolve({ editable:true});
    }
    getRpr(params:{pageNo:number,pageSize:number,searchText: string, sort: string}){
         
        if(params.sort){            
            let sortArr=params.sort.split('|');            
            if(sortArr[1]==='asc')
            this.rprData.sort((a,b)=>{
                if(a[sortArr[0]]<b[sortArr[0]]) return -1;
                if(a[sortArr[0]]>b[sortArr[0]]) return 1;
                return 0;
            })
            else 
            this.rprData.sort((a,b)=>{
                if(a[sortArr[0]]<b[sortArr[0]]) return 1;
                if(a[sortArr[0]]>b[sortArr[0]]) return -1;
                return 0;
            })
        }
        let data=[];
        if(params.searchText){
            data=this.rprData.filter(a=>a['shortDes'].includes(params.searchText)||a['hcfaCd'].includes(params.searchText))
        }
        else data=this.rprData;

        let start=(params.pageNo-1)*params.pageSize;
        let end=params.pageNo*params.pageSize;
        
        return Promise.resolve({data:data.slice(start, end),totalRecords:data.length});
    }
    getHcfa(){        
        return Promise.resolve({data:this.hcfaData});
    }
    getType(){
        const data=[];
        data.push({text:'PDC', value:'PDC'});
        data.push({text:'MCSD', value:'MCSD'})
        return Promise.resolve({data});
    }
    private getHccd(){
         return this.hccd[Math.ceil(Math.random()*50)];
    }
    private hcfaCode(){
        this.hccd=[''];
        for (var index = 0; index < 50; index++) {
            this.hccd.push(this.charByLimit(2));            
        }
    }
    private boolValue(){
        return Math.ceil(Math.random()*2)===1
    }
    private randChar(){       
        return this.ch[Math.ceil(Math.random()*26)];
    }
    private charByLimit(limit){
        const res=[];
        for (var index = 0; index < limit; index++) {
            res.push(this.randChar());
        }
        return res.join('');
    }
}
