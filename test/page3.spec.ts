import { assert } from 'chai';
import { Router } from 'zaitun';
import navigate from './runApp';

describe('page3 test', () => {
    const router: Router = navigate('page3/6/testing title');
    it('route data', () => {
        const model = router.getAppState().child;

        assert.equal(model.title, 'testing title');
        assert.equal(model.data.length, 6);


    })

})