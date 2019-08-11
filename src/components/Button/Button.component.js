import React, { Component } from 'react';

import './Button.style.css'

export default class Button extends Component{
	render(){
		return(
			<button className={`button ${this.props.type}`} {...this.props} onClick={this.props.type==="disabled"?()=>{}:this.props.onClick}>
				{this.props.icon&&<i className={this.props.icon}></i>}
				{this.props.label&&<span>{this.props.label}</span>}
			</button>
			)
	}
}