const ctx: Worker = self as any;

ctx.onmessage=(e:any)=>{

    let action=e.data;
    console.log(action);
    switch (action.type) {
        case 'test':
            ctx.postMessage({type:'test-res', payload:action.payload+' processed!!'})
          return;
        
        default:
            break;
    }
}