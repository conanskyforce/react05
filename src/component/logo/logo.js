import React from 'react'
import {Component} from 'react'
import './logo.css'
import logoImg from './logo.png'

class Logo extends Component{
	constructor(){
		super();
	}
	render(){
		return (
			<div className="logo-container">
				<img src={logoImg} alt="logo" />
			</div>
			)
	}
}

export default Logo;