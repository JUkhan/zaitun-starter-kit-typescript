
import { assert } from 'chai';
import { Router } from 'zaitun';
import navigate from './runApp';

describe('dataloading-before then page render test', () => {
    const router: Router = navigate('dataloading/7/test title');
    it("route data property: should have title as 'test title' data length = 7", () => {
        const model = router.getAppState().child;       
        assert.equal(model.title, 'test title');
        assert.equal(model.data.length, 7);


    })

})