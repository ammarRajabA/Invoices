import React, { Component } from 'react';

import './Table.style.css'

export default class Button extends Component{
	render(){
		return(
				<table className="table" {...this.props}>
					{this.props.children}
				</table>
			)
	}
}