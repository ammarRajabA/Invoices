import React, { Component } from 'react';

import './Search.style.css'

export default class Input extends Component{
	render(){
		return(
			<span className={"search"}><input {...this.props}/></span>
			)
	}
}