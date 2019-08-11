import React, { Component } from 'react';

import './Input.style.css'

export default class Input extends Component{
	render(){
		return(
			<span className={`input-container`}>
				{<span className={`label ${this.props.error==='false'?'input-error':''}`} style={{opacity:this.props.value?(this.props.value.length===0?0:1):0}}>{this.props.placeholder}</span>}
				{	
					this.props.type==='textarea'?
					<textarea className={`input ${this.props.error==='false'?'input-error':''}`} {...this.props}/>:
					<input className={`input ${this.props.error==='false'?'input-error':''}`} {...this.props}/>
				}
			</span>
			)
	}
}