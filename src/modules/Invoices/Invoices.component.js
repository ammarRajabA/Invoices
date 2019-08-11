import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import {Button,Dropdown,Input,Table,Spinner,Search,PopupMenu,Confirm,Label} from "../../components";
import Invoice from '../Invoice/Invoice.component'

import {calculateTotalPriceWithTax} from '../../helpers/finance'

import {getInvoices,selectInvoice,newInvoice,deleteInvoice,sortInvoices} from './Invoices.actions'

import './Invoices.style.css'

class Invoices extends Component{
	constructor(props){
		super(props);
		this.state={page_size:10,invoiceHover:null,invoiceOptions:null,showMenu:false,showInvoice:false,editMode:false,showConfirm:false,sort:{column:null,asc:true},searchText:''}
	}
	componentDidMount(){
		this.props.getInvoices()
	}
	componentDidUpdate(prevProps){
		if (prevProps.invoicesReducer.loading!==this.props.invoicesReducer.loading && !this.props.invoicesReducer.loading){
			if (this.state.sort.column){
				var invoices=[...this.props.invoicesReducer.invoices];
				invoices.sort((a,b)=>a[this.state.sort.column].localeCompare(b[this.state.sort.column]))
				if (!this.state.sort.asc) invoices.reverse();
				this.props.sortInvoices(invoices);
			}
			this.setState({page_size:this.props.invoicesReducer.meta.pageSize})
		}
	}
	onMouseOverInvoice=(e,index)=>{
		this.setState({invoiceHover:index})
	}
	refreshPage=()=>{
		this.props.getInvoices(this.props.invoicesReducer.meta.pageNumber,this.state.page_size)
	}
	nextPage=()=>{
		this.props.getInvoices(this.props.invoicesReducer.meta.pageNumber+1,this.state.page_size)
	}
	prevPage=()=>{
		this.props.getInvoices(this.props.invoicesReducer.meta.pageNumber-1,this.state.page_size)
	}
	firstPage=()=>{
		this.props.getInvoices(1,this.state.page_size)
	}
	lastPage=()=>{
		this.props.getInvoices(this.props.invoicesReducer.meta.totalPages,this.state.page_size)
	}
	handleOption=(option,index)=>{
		switch(option){
			case 'Edit':
				this.setState({editMode:true,showInvoice:true},()=>{
					this.props.selectInvoice(this.props.invoicesReducer.invoices[this.state.invoiceOptions])
				})
				break;
			case 'Details':
				this.setState({editMode:false,showInvoice:true},()=>{
					this.props.selectInvoice(this.props.invoicesReducer.invoices[this.state.invoiceOptions])
				})
				break;
			case 'Delete':
				this.setState({showConfirm:true},()=>{
					this.props.selectInvoice(this.props.invoicesReducer.invoices[this.state.invoiceOptions])
				})
				break;
			default:
				return;
		}
	}
	onSort=(event,key)=>{
		if (!key) return
		var asc=this.state.sort.column?(this.state.sort.asc?false:true):true
		var invoices=[...this.props.invoicesReducer.invoices];
		invoices.sort((a,b)=>a[key].localeCompare(b[key]))
		if (!asc) invoices.reverse();
		this.props.sortInvoices(invoices)
		this.setState({sort:{column:key,asc:asc}})
	}
	search=(invoice)=>{
		return invoice.id.toString().indexOf(this.state.searchText)>=0
	}
	
	renderHeader=()=>{
		return (
			<div className="header">
				<h1 className="title">Invoices</h1>
				<Search placeholder="Invoice #" value={this.state.searchText} onChange={(e)=>this.setState({searchText:e.target.value})}/>
				<Button icon="fas fa-plus" label="Add Invoice" onClick={
					()=>this.setState({editMode:true,showInvoice:true},()=>{
						this.props.newInvoice()
					})
				}/>
			</div>
			)
	}
	renderLabels=()=>{
		if (this.props.invoicesReducer.loading) return <span></span>
		return(
			<div className="labels">
				<Label title={calculateTotalPriceWithTax(this.props.invoicesReducer.invoices).toFixed(2)+" $"} subtitle="Below invoices total" minilabels={[{title:this.props.invoicesReducer.meta.total,subtitle:"All invoices"},{title:this.props.invoicesReducer.meta.pageSize,subtitle:"Below invoices"}]}/>
			</div>
			)
	}
	renderPagination=()=>{
		return (
				<div className="pagination">
					<Button type={(this.props.invoicesReducer.meta.pageNumber===1)?'disabled':'primary'} icon="fas fa-angle-double-left" onClick={this.firstPage} style={{width:40,height:40,borderRadius:20,fontSize:12}}/>
					<Button type={(this.props.invoicesReducer.meta.pageNumber===1)?'disabled':'primary'} icon="fas fa-chevron-left" onClick={this.prevPage} style={{width:50,height:50,borderRadius:25}}/>
					<span>{this.props.invoicesReducer.meta.pageNumber}</span>
					<Button type={(this.props.invoicesReducer.meta.pageNumber===this.props.invoicesReducer.meta.totalPages)?'disabled':'primary'} icon="fas fa-chevron-right" onClick={this.nextPage} style={{width:50,height:50,borderRadius:25}}/>
					<Button type={(this.props.invoicesReducer.meta.pageNumber===this.props.invoicesReducer.meta.totalPages)?'disabled':'primary'} icon="fas fa-angle-double-right" onClick={this.lastPage} style={{width:40,height:40,borderRadius:20,fontSize:12}}/>
					<span className="page-size">
						<Input placeholder="Page Size" type="number" onChange={(e)=>this.setState({page_size:e.target.value})} value={this.state.page_size} style={{width:50,textAlign:'center'}}/>
						<Button icon="fas fa-sync" onClick={this.refreshPage} style={{width:40,height:40,borderRadius:20,fontSize:12}}/>
					</span>
				</div>
			)
	}
	renderInvoices=()=>{
		if (this.props.invoicesReducer.loading) return <Spinner message="Loading..."/>
		return (
			<div className="card">
				<Table onMouseLeave={()=>this.setState({invoiceHover:null})}>
					<tbody>
						<tr>
							<th>Invoice #</th>
						    <th onClick={e=>this.onSort(e,'dueDate')}>
						    	<span>Due Date</span>
						    	{
						    		(this.state.sort.column==='dueDate')?
						    			((this.state.sort.asc)?
						    			<i style={{marginLeft:20}} className="fas fa-sort-amount-up"></i>:
						    			<i style={{marginLeft:20}} className="fas fa-sort-amount-down"></i>):
						    			<i style={{marginLeft:20,color:'#B1B1B1'}} className="fas fa-sort-amount-down"></i>
						    	}
						    </th>
						    <th onClick={e=>this.onSort(e,'createdDate')}>
						    	<span>Created Date</span>
						    	{
						    		(this.state.sort.column==='createdDate')?
						    			((this.state.sort.asc)?
						    			<i style={{marginLeft:20}} className="fas fa-sort-amount-up"></i>:
						    			<i style={{marginLeft:20}} className="fas fa-sort-amount-down"></i>):
						    			<i style={{marginLeft:20,color:'#B1B1B1'}} className="fas fa-sort-amount-down"></i>
						    	}
						    </th>
						    <th>Sender Name</th>
						    <th>Recipient Name</th> 
						    <th>Total Price (with tax)</th>
						    <th style={{width:80}}></th>
					  	</tr>
						{
							this.props.invoicesReducer.invoices.filter(this.search).map((invoice,index)=>
								<tr onMouseOver={(e)=>this.onMouseOverInvoice(e,index)} key={invoice.id.toString()} className="invoice-row">
								    <td>{invoice.id}</td>
								    <td>{moment(invoice.dueDate).format('lll')}</td>
								    <td>{moment(invoice.createdDate).format('lll')}</td> 
								    <td className="name">{invoice.sender.name}<span className="tooltip">{invoice.sender.email}</span></td>
								    <td>{invoice.recipient.name}<span className="tooltip">{invoice.recipient.email}</span></td>
								    <td>{calculateTotalPriceWithTax(invoice).toFixed(2)} $</td>
								    <td>
								    	<Button onClick={()=>this.setState({showMenu:true,invoiceOptions:index})} icon="fas fa-ellipsis-v" type={(this.state.invoiceHover===index)?"primary":"solid"} style={{width:40,height:40,borderRadius:20}}/>
								    	<PopupMenu
								    		options={['Edit','Details','Delete']}
								    		handleOption={this.handleOption}
								    		show={this.state.showMenu && this.state.invoiceOptions===index}
								    		onDismiss={()=>this.setState({showMenu:false,invoiceOptions:null})}
								    	/>
								    </td>
								</tr>
							)
						}
					</tbody>
				</Table>
				{this.renderPagination()}
			</div>
			)
	}
	renderInvoice=()=>{
		return <Invoice editMode={this.state.editMode} show={this.state.showInvoice} onDismiss={()=>this.setState({showInvoice:false})}/>
	}
	renderConfirm=()=>{
		return <Confirm title="Delete Invoice" message="You are about to delete invoice, continue ?"
						onConfirm={()=>this.setState({showConfirm:false},()=>this.props.deleteInvoice(this.props.invoicesReducer.invoiceSelected))}
						onCancel={()=>this.setState({showConfirm:false})}
						onDismiss={()=>this.setState({showConfirm:false})}
						show={this.state.showConfirm} type="danger"
				/>
	}
	render(){
		return(
				<div className="container">
					{this.renderHeader()}
					{this.renderLabels()}
					{this.renderInvoices()}
					{this.renderInvoice()}
					{this.renderConfirm()}
				</div>
			)
	}
}

const mapStateToProps=(state)=>{
	return ({
		invoicesReducer:state.invoicesReducer
	})
}

export default connect(mapStateToProps,{getInvoices,selectInvoice,newInvoice,deleteInvoice,sortInvoices})(Invoices)