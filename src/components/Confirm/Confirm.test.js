import { makeMountRender,makeStore,reduxify, snapshotify } from '../../helpers/tests-utils';

import Confirm from './Confirm.component'

describe('Confirm component',function () {
	it('match snapshot hidden',function () {
		const wrapper = makeMountRender(Confirm)();
		expect(snapshotify(wrapper)).toMatchSnapshot();
	})
	it('match snapshot hidden',function () {
		const wrapper = makeMountRender(Confirm)({show:false});
		expect(snapshotify(wrapper)).toMatchSnapshot();
	})
	it('match snapshot hidden',function () {
		const wrapper = makeMountRender(Confirm)({show:true,onDismiss:()=>{this.setProps({show:false})}});
		wrapper.setProps({ show: false });
		expect(snapshotify(wrapper)).toMatchSnapshot();
	})
	it('match snapshot shown',function () {
		const wrapper = makeMountRender(Confirm)({show:true});
		expect(snapshotify(wrapper)).toMatchSnapshot();
	})
})