import {Injectable} from 'zaitun';

@Injectable('page')
export  class DisputeService{
    ch:any[];
    hccd:any;
    constructor(){
        this.ch=['','a','b','c','d','e','f','g','h','i','f','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        this.hcfaCode();
    }
    getPermission(){
        return Promise.resolve({ editable:true});
    }
    getRpr(params){
        const data=[];
        for (var index = 0; index < params.pageSize; index++) {
            data.push({shortDes:this.charByLimit(5), auto:false, des:this.charByLimit(25), hcfaCd:this.getHccd(), active:this.boolValue()})
        }
        return Promise.resolve({data,totalRecords:150});
    }
    getHcfa(){
        const data=[];
        for (var index = 1; index < 45; index++) {
            data.push({hcfaCd:this.hccd[index], type:index%2==0?'PDC':'MCSD', des:this.charByLimit(25)})
        }
        return Promise.resolve({data});
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
