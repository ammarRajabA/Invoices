import React, { Component } from 'react';

import './Label.style.css'

export default class Label extends Component{
	render(){
		return(
			<span className={`label-component ${this.props.type}`} {...this.props}>
				{this.props.subtitle&&<span className="label-subtitle">{this.props.subtitle}</span>}
				{this.props.title&&<span className="label-title">{this.props.title}</span>}
				<span className="label-footer">
					{
						this.props.minilabels&&this.props.minilabels.map((miniLabel,i)=>
								<span key={"mini_label"+i} className="mini-label">
									<span className="mini-label-subtitle">{miniLabel.subtitle}</span>
									<span className="mini-label-title">{miniLabel.title}</span>
								</span>
							)
					}
				</span>
			</span>
			)
	}
}