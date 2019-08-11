import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

import {Button,Dropdown,Input,Table,Spinner,Search,PopupMenu,Confirm} from "../../components";

import {calculateTotalPriceWithTax,calculateTotalPriceNoTax,calculateTotalItemNoTax,calculateTotalItemWithTax} from '../../helpers/finance'
import {validateEmail,validateVATID} from '../../helpers/validators'

import {updateInvoice,saveInvoice} from '../Invoices/Invoices.actions'

import './Invoice.style.css'

class Invoice extends Component{
	constructor(props){
		super(props);
		this.state={show:this.props.show,showConfirm:false,validation:{
			dueDate:true,
			sender:{name:true,address1:true,vatId:true,email:true},
			recipient:{name:true,address1:true,vatId:true,email:true},
			items:[]
		}}
	}
	componentDidUpdate(prevProps){
		if (this.props.invoicesReducer.selectedInvoice && this.props.invoicesReducer.selectedInvoice.id!==prevProps.invoicesReducer.selectedInvoice){
			this.validate();
		}
	}

	update=(key,value)=>{
		this.props.updateInvoice(key,value)
	}
	saveInvoice=()=>{
		this.props.saveInvoice(this.props.invoicesReducer.invoiceSelected);
		this.props.onDismiss();
	}
	addItem=()=>{
		this.update('items',[...this.props.invoicesReducer.invoiceSelected.items,{
			description:'',
			qty:0,
			unitPriceNet:0,
			taxRate:0.0
		}])
	}
	removeItem=(index)=>{
		var newItems=[...this.props.invoicesReducer.invoiceSelected.items]
		newItems.splice(index,1)
		this.update('items',newItems)
	}

	validate=()=>{
		var selectedInvoice=this.props.invoicesReducer.invoiceSelected;
		var valid=true;
		var validation={
			dueDate:true,
			sender:{name:true,address1:true,vatId:true,email:true},
			recipient:{name:true,address1:true,vatId:true,email:true},
			items:[]
		}
		if (!validateVATID(selectedInvoice.sender.vatId)){
			valid=false;
			validation.sender.vatId=false
		}
		if (!validateVATID(selectedInvoice.recipient.vatId)){
			valid=false;
			validation.recipient.vatId=false
		}
		if (!validateEmail(selectedInvoice.sender.email)){
			valid=false;
			validation.sender.email=false
		}
		if (!validateEmail(selectedInvoice.recipient.email)){
			valid=false;
			validation.recipient.email=false
		}
		if (selectedInvoice.recipient.address1.length===0){
			valid=false;
			validation.recipient.address1=false
		}
		if (selectedInvoice.sender.address1.length===0){
			valid=false;
			validation.sender.address1=false
		}
		if (selectedInvoice.recipient.name.length===0){
			valid=false;
			validation.recipient.name=false
		}
		if (selectedInvoice.sender.name.length===0){
			valid=false;
			validation.sender.name=false
		}
		if (selectedInvoice.dueDate.length===0){
			valid=false;
			validation.dueDate=false
		}
		selectedInvoice.items.map((item)=>{
			if (item.qty<=0){
				valid=false;
			}
			if (item.unitPriceNet<=0){
				valid=false;
			}
			validation.items.push({qty:!(item.qty<=0),unitPriceNet:!(item.unitPriceNet<=0)})
		})
		if (valid)
			this.setState({showConfirm:true})
		else
			this.setState({showConfirm:false,validation})
	}

	renderTitle=()=>{
		if (this.props.invoicesReducer.invoiceSelected.id<0) return <h1 className="title">New Invoice</h1>
		else if (this.props.editMode) return <h1 className="title">Edit Invoice</h1>
		else return <h1 className="title">Invoice</h1>
	}
	renderHeader=()=>{
		var selectedInvoice=this.props.invoicesReducer.invoiceSelected
		return (
				<span className="modal-header">
					{this.renderTitle()}
				</span>
			)
	}
	renderItems=()=>{
		var selectedInvoice=this.props.invoicesReducer.invoiceSelected
		return (
			<Table>
				<tbody>
					<tr>
					    <th style={{width:200}}>Description</th>
					    <th>Quantity</th>
					    <th>Item Price</th>
					    <th>Tax Rate</th> 
					    <th>Total without tax (netto)</th>
					    <th>Total after tax (brutto)</th>
				  	</tr>
					{
						selectedInvoice.items.map((item,index)=>
							<tr  key={"item_"+index}>
								<td>
									<Input style={{resize: "none"}} type="textarea" readOnly={!this.props.editMode} value={item.description||''} onChange={(e)=>this.update('items',Object.assign([...selectedInvoice.items],{[index]:{...item,description:e.target.value}}))}/>
								</td>
								<td>
									<Input readOnly={!this.props.editMode} type="number" value={item.qty||''} onChange={(e)=>this.update('items',Object.assign([...selectedInvoice.items],{[index]:{...item,qty:e.target.value}}))} error={this.state.validation.items[index]===undefined?'true':this.state.validation.items[index].qty.toString()}/>
								</td>
								<td>
									<Input readOnly={!this.props.editMode} type="number" value={item.unitPriceNet||''} onChange={(e)=>this.update('items',Object.assign([...selectedInvoice.items],{[index]:{...item,unitPriceNet:e.target.value}}))} error={this.state.validation.items[index]===undefined?'true':this.state.validation.items[index].unitPriceNet.toString()}/>
								</td>
								<td>
									<Input readOnly={!this.props.editMode} type="number" value={item.taxRate||''} onChange={(e)=>this.update('items',Object.assign([...selectedInvoice.items],{[index]:{...item,taxRate:e.target.value}}))}/>
								</td>
								<td>
									<span style={{margin:10}}>{calculateTotalItemNoTax(item).toFixed(2)} $</span>
								</td>
								<td>
									<span style={{margin:10}}>{calculateTotalItemWithTax(item).toFixed(2)} $</span>
								</td>
								<td>
									<span className="close" onClick={()=>this.removeItem(index)}>
										<i className="fas fa-times-circle"></i>
									</span>
								</td>
							</tr>
						)
					}
				</tbody>
			</Table>
			)
	}
	renderDetails=()=>{
		var selectedInvoice=this.props.invoicesReducer.invoiceSelected
		return (
			<div className="modal-form">
				<span className="group-input">
					<span className="row">
						<Input readOnly={!this.props.editMode} type="datetime-local" placeholder="Due Date" value={moment(selectedInvoice.dueDate).format('YYYY-MM-DDTHH:mm')} onChange={(e)=>this.update('dueDate',e.target.value)} error={this.state.validation.dueDate.toString()}/>
						<Input readOnly={true} type="datetime-local" placeholder="Created Date" value={moment(selectedInvoice.createdDate).format('YYYY-MM-DDTHH:mm')} onChange={(e)=>this.update('createdDate',e.target.value)}/>
					</span>
				</span>
				<span className="group-input">
					<span className="title">Sender</span>
					<span className="row">
						<Input readOnly={!this.props.editMode} placeholder="Name" value={selectedInvoice.sender.name||''} onChange={(e)=>this.update('sender',{...selectedInvoice.sender,name:e.target.value})} error={this.state.validation.sender.name.toString()}/>
						<Input readOnly={!this.props.editMode} type="email" placeholder="Email" value={selectedInvoice.sender.email||''} onChange={(e)=>this.update('sender',{...selectedInvoice.sender,email:e.target.value})} error={this.state.validation.sender.email.toString()}/>
					</span>
					<span className="row">
						<Input readOnly={!this.props.editMode} placeholder="Address 1" value={selectedInvoice.sender.address1||''} onChange={(e)=>this.update('sender',{...selectedInvoice.sender,address1:e.target.value})} error={this.state.validation.sender.address1.toString()}/>
						<Input readOnly={!this.props.editMode} placeholder="Address 2" value={selectedInvoice.sender.address2||''} onChange={(e)=>this.update('sender',{...selectedInvoice.sender,address2:e.target.value})}/>
					</span>
					<span className="row">
						<Input readOnly={!this.props.editMode} placeholder="Address 3" value={selectedInvoice.sender.address3||''} onChange={(e)=>this.update('sender',{...selectedInvoice.sender,address3:e.target.value})}/>
						<Input readOnly={!this.props.editMode} placeholder="VAT ID" value={selectedInvoice.sender.vatId||''} onChange={(e)=>this.update('sender',{...selectedInvoice.sender,vatId:e.target.value})} error={this.state.validation.sender.vatId.toString()}/>
					</span>
				</span>
				<span className="group-input">
					<span className="title">Recipient</span>
					<span className="row">
						<Input readOnly={!this.props.editMode} placeholder="Name" value={selectedInvoice.recipient.name||''} onChange={(e)=>this.update('recipient',{...selectedInvoice.recipient,name:e.target.value})} error={this.state.validation.recipient.name.toString()}/>
						<Input readOnly={!this.props.editMode} type="email" placeholder="Email" value={selectedInvoice.recipient.email||''} onChange={(e)=>this.update('recipient',{...selectedInvoice.recipient,email:e.target.value})} error={this.state.validation.recipient.email.toString()}/>
					</span>
					<span className="row">
						<Input readOnly={!this.props.editMode} placeholder="Address 1" value={selectedInvoice.recipient.address1||''} onChange={(e)=>this.update('recipient',{...selectedInvoice.recipient,address1:e.target.value})} error={this.state.validation.recipient.address1.toString()}/>
						<Input readOnly={!this.props.editMode} placeholder="Address 2" value={selectedInvoice.recipient.address2||''} onChange={(e)=>this.update('recipient',{...selectedInvoice.recipient,address2:e.target.value})}/>
					</span>
					<span className="row">
						<Input readOnly={!this.props.editMode} placeholder="Address 3" value={selectedInvoice.recipient.address3||''} onChange={(e)=>this.update('recipient',{...selectedInvoice.recipient,address3:e.target.value})}/>
						<Input readOnly={!this.props.editMode} placeholder="VAT ID" value={selectedInvoice.recipient.vatId||''} onChange={(e)=>this.update('recipient',{...selectedInvoice.recipient,vatId:e.target.value})} error={this.state.validation.recipient.vatId.toString()}/>
					</span>
				</span>
				{this.renderItems()}
				<span className="group-input">
					<span className="column summary">
						<span>{"Total before tax (netto): "}{calculateTotalPriceNoTax(selectedInvoice).toFixed(2)} $</span>
						<span>{"Total after tax (brutto): "}{calculateTotalPriceWithTax(selectedInvoice).toFixed(2)} $</span>
					</span>
				</span>
			</div>
			)
	}
	renderButtons=()=>{
		return (
			<span className="group-input">
				<span className="row">
					<Button type="success" label="Save" onClick={this.validate}/>
					<Button type="normal" label="Cancel" onClick={this.props.onDismiss}/>
					<Button label="Add Item" onClick={this.addItem}/>
				</span>
			</span>
			)
	}
	renderConfirm=()=>{
		return <Confirm title="Save Invoice" message="You are about to save changes, continue ?"
						onConfirm={()=>this.setState({showConfirm:false},this.saveInvoice)}
						onCancel={()=>this.setState({showConfirm:false})}
						onDismiss={()=>this.setState({showConfirm:false})}
						show={this.state.showConfirm} type="warning"
				/>
	}
	render(){
		if (this.props.show && this.props.invoicesReducer.invoiceSelected)
			return (
				<div>
					<div className="modal-background" onClick={this.props.onDismiss}></div>
					<div className="modal-container">
						{this.renderHeader()}
						{this.renderDetails()}
						{this.renderConfirm()}
						{this.props.editMode && this.renderButtons()}
					</div>
				</div>
				)
		else return <span></span>
	}
}

const mapStateToProps=(state)=>{
	return ({
		invoicesReducer:state.invoicesReducer
	})
}

export default connect(mapStateToProps,{updateInvoice,saveInvoice})(Invoice)