import React, { Component } from 'react';

import './PopupMenu.style.css'

export default class Button extends Component{
	constructor(props){
		super(props);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}
	componentDidMount(){
		document.addEventListener('mousedown', this.handleClickOutside);
	}
	componentWillUnmount(){
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	setWrapperRef(node) {
		this.wrapperRef = node;
	}
	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.props.onDismiss()
		}
	}
	render(){
		if (!this.props.show) return <span></span>
		return(
			<div className="popup-menu" ref={this.setWrapperRef}>
				{
					this.props.options.map((option,index)=>
						<span key={"option_"+index} className="option" onClick={()=>this.props.handleOption(option,index)}>{option}</span>
					)
				}
			</div>
			)
	}
}