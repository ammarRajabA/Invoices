import React from 'react'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

export const makeMountRender = (Component, defaultProps = {}) => {
	return (customProps={})=>{
		const props={...defaultProps,...customProps};
		return mount(<Component {...props}/>)
	}
}

export const reduxify = (Component, props = {}, store= {}) => {
	return function reduxWrap() {
		return (
			<Provider store={store}>
				<Component {...props} />
			</Provider>
		)
	}
}

export const snapshotify = reactWrapper => {
	return reactWrapper.debug();
};