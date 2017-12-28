
import { html } from 'snabbdom-jsx';

function view() {
    return <div 
        classNames="dx"        
        hook-insert={vnode => console.log(vnode.elm.getBoundingClientRect())}
        hook-destroy={vnode => console.log(vnode.elm)}
        >
        <h3 classNames="blue-background">Page-1</h3>

    </div>;
}

export default { view };
