
export interface FormModel{
    data:{[key:string]:any};
    options:FormOptions;
}

export interface FormOptions{
    viewMode:'form'|'modal'
    name:string;
    labelSize?:number;
    labelPos?:'left'|'top';
    elmSize?:'sm'|'lg';
    title?:string;
    inputs:Array<Field|Array<Field>>;
    modalClose?:Function;
    buttons?:Array<Field>|Function;
    /** popup size */
    modalSize?:'sm'|'lg';
}

export interface Field{
    field?:string;
    label?:string;
    type:'select'|'text'|'password'|'datetime-local'|
    'date'|'month'|'tabs'|'time'|'week'|
    'number'|'email'|'url'|'checkbox'|'radio'|'search'|'tel'|'color'|
    'vnode'|'component'|'button'|'label'|'file'|'fieldset';
    size?:number;    
    elmSize?:'sm'|'lg';        
    data?:Array<any>;
    activeTab?:string;    
    tabClick?:(tabName:string, preTab:string)=>boolean|Promise<boolean>;
    vnode?:Function|any;  
    actionType?:string;
    component?:any;
    tabs?:{[key:string]:Tab};
    classNames?:string;
    on?:{[key:string]:Function};   
    props?:{[key:string]:any} ;
    hide?:boolean;
    legend?:string;
    disabled?:boolean;   
    inputs?:Array<Field|Array<Field>>; 
    labelPos?:'left'|'top';  
    labelSize?:number;
    style?:{[key:string]:any} ;   
    class?:{[key:string]:any} ;
    multiSelect?:boolean; 
    radioList?:Array<Field>; 
    inline?:boolean;
    footer?:Function|Array<Field>;
    info?:string;  
    required?:boolean;  
    invalidFeedback?:string; 
    name?:string; 
    value?:any; 
    isValid?:boolean;
    selectTitle?:string; 
    autofocus?:boolean; 
    filePlaceholder?:string             
}

export interface Tab{
    disabled?:boolean;
    hide?:boolean;
    inputs:Array<Field>;    
}