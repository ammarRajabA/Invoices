import {API} from '../../api/API'
import configureMockStore from "redux-mock-store";
import ReduxThunk from "redux-thunk";
import { makeMountRender, snapshotify, reduxify } from '../../helpers/tests-utils';

import Invoices from './Invoices.component';
import {getInvoices} from './Invoices.actions';
import mockData from '../../helpers/mockData'

jest.mock('../../api/API')

const mockStore = configureMockStore([ReduxThunk]);

describe('Testing getInvoices action creator',function(){
	it ("dispatch FAILED_FETCH_INVOICES action on error", async ()=>{
		let store= mockStore({invoicesReducer:mockData.INIT_STATE});
		API.get.mockImplementationOnce(() =>Promise.resolve({status:500}))
		await store.dispatch(getInvoices());
		const actions = store.getActions();

		expect.assertions(2);
		expect(actions[0].type).toEqual("STARTED_FETCH_INVOICES");
    	expect(actions[1].type).toEqual("FAILED_FETCH_INVOICES");
	})
	it ("dispatch FINISHED_FETCH_INVOICES action and return data on success", async ()=>{
		let store= mockStore({invoicesReducer:mockData.INIT_STATE});
		API.get.mockImplementationOnce(() =>Promise.resolve({status:200,data:{invoices:mockData.invoices,meta:mockData.meta}}))
		await store.dispatch(getInvoices());
		const actions = store.getActions();

		expect.assertions(3);
		expect(actions[0].type).toEqual("STARTED_FETCH_INVOICES");
    	expect(actions[1].type).toEqual("FINISHED_FETCH_INVOICES");
		expect(actions[1].payload.invoices.length).toEqual(10);
	})
})

describe('Invoices component',function () {
	it('match snapshot',()=>{
		let store= mockStore({invoicesReducer:mockData.INIT_STATE});
		var wrapper = makeMountRender(reduxify(Invoices,{},store))();
		wrapper=wrapper.update()
		expect(snapshotify(wrapper)).toMatchSnapshot();
	})
	it('renders list of invoices that matches pageSize',()=>{
		let store= mockStore({invoicesReducer:{...mockData.INIT_STATE,invoices:mockData.invoices,meta:mockData.meta}});
		var wrapper = makeMountRender(reduxify(Invoices,{},store))();
		var rows=wrapper.find('tr');
		var pageSize=wrapper.find('input').last().props().value;
		expect(rows.length).toEqual(pageSize+1)
	})
})