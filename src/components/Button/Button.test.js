import { makeMountRender, snapshotify } from '../../helpers/tests-utils';

import Button from './Button.component'

describe('Button component',function () {
	it('match snapshot',function () {
		const wrapper = makeMountRender(Button)();
		expect(snapshotify(wrapper)).toMatchSnapshot();
	})
	it('should execute function onClick',function () {
		const wrapper = makeMountRender(Button)({onClick:()=>"This is result"});
		expect(wrapper.props().onClick()).toBe("This is result")
	})
	it('should has class danger when passing danger type',function () {
		const wrapper = makeMountRender(Button)({type:"danger"});
		expect(wrapper.find('button').hasClass('button danger')).toBe(true)
	})
})