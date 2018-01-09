import { h, Action, ViewObj, Router } from 'zaitun';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

const SEARCH = 'search';
const SEARCH_RESULT = 'search result';

function init() {
    return { data: null, search:''}
}

function afterViewRender(dispatch, router: Router) {

    router.effect$.addEffect(eff$ =>
        eff$.whenAction(SEARCH)
            .debounceTime(500)
            .distinctUntilChanged()
            .filter(action => action.payload.length > 1)
            .switchMap(action => 
                 Observable.from(
                    fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${action.payload}&limit=5`)
                    .then(res => res.json()))
                    .do(console.log)
                    .map(res => ({ ...action, type: SEARCH_RESULT, payload: res }))
            )
    )
}

function view({ model, dispatch }: ViewObj) { 
    var res=[];
    if(model.data){
        res.push(h('div.card',h('div.card-body',[
            h('h4.card-title',model.data[0]),
            h('ul.list-group', model.data[1].map(_=>h('li.list-group-item.list-group-item-success', _))),
            h('ul.list-group', model.data[2].map(_=>h('li.list-group-item.list-group-item-info', _))),
            h('div.list-group', model.data[3].map(_=>h('a.list-group-item.list-group-item-action',{props:{href:_}},_)))
        ])));
        
    }  
    return h('div', [
        h('input', {
             props:{value:model.search, placeholder:'wiki search...'},
             on: { input: (ev: any) => dispatch({ type: SEARCH, payload: ev.target.value }, true) }
             }
        ),
        h('div', res)
    ]);
}

function update(model, action: Action) {
    switch (action.type) {
        case SEARCH: return { ...model, search: action.payload }
        case SEARCH_RESULT: return { ...model, data: action.payload }
        default: return model;
    }
}

export default { init, view, update, afterViewRender };
