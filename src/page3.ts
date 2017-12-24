import { Router, h } from 'zaitun';

function init(dispatch, routeParams, router: Router) {
    console.log(router.activeRoute);
    return {
        title: routeParams.title,
        data: router.activeRoute.data
    };
}

function view({ model, dispatch, router }) {
    return h('div', [
        h('div', model.title),
        h('ol', model.data.map(fruit => h('li', fruit)))
    ]);
}

export default { init, view };