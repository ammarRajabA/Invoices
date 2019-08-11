import React, { Component } from 'react';

import Button from '../Button/Button.component'

import './Confirm.style.css'

export default class Confirm extends Component{
	render(){
		if (this.props.show===true)
			return (
				<div>
					<div className="confirm-background" onClick={this.props.onDismiss}></div>
					<div className="confirm-container">
						<span className={`confirm-header ${this.props.type}`}>
							<span className="title">{this.props.title}</span>
							<span className="close" onClick={this.props.onDismiss}>
								<i className="fas fa-times-circle" style={{color:'white'}}></i>
							</span>
						</span>
						<span className="confirm-message">{this.props.message}</span>
						<span className="confirm-buttons">
							<Button label="Cancel" type="normal" onClick={this.props.onCancel}/>
							<Button label="Confirm"type={this.props.type} onClick={this.props.onConfirm}/>
						</span>
					</div>
				</div>
				)
		else return <span></span>
	}
}

