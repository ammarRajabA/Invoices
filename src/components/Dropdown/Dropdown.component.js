import React, { Component } from 'react';

import './Dropdown.style.css'

export default class Dropdown extends Component{
	render(){
		return(
			<select value={this.props.value} className={"dropdown"} onChange={(e)=>this.props.onChange(e)} {...this.props.style}>
				{this.props.options.map((o,i)=>
						<option key={i.toString()} value={o[this.props.optionValue]}>{o[this.props.optionlabel]}</option>
					)
				}
			</select>
			)
	}
}