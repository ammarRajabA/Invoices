import React, { Component } from 'react';
import './Spinner.style.css';

export default class Spinner extends Component{
	render(){
		return  <div className="container">
					<div className={this.props.small? "small-loader":"loader"}></div>
					<h1>{this.props.message}</h1>
				</div>
	}
}