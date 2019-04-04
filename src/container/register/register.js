import React from 'react'
import {Component} from 'react'
import './register.css'
import Logo from '../../component/logo/logo'
import {List, InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {Toast} from 'antd-mobile';

class Register extends Component{
	constructor(props){
		super(props);
		this.register = this.register.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.state = {
			username:'',
			password:'',
			repeatPassword:''
		}
	}
	register(){
		this.props.history.push('/login')
	}
	handleRegister(){
		this.props.register(this.state);
		console.log(this.state);
	}
	handleChange(key,value){
		this.setState({
			[key]:value
		})
	}
	render(){
		return (
			<div>
			{ this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}/>:null}
			<Logo />
			<h2 className='register'>注册页</h2>
			{this.props.user.msg?<p className='error-msg'>{this.props.user.msg}</p>:null}
			<WingBlank>
			<List>
				<InputItem 
					onChange={(value)=>{this.handleChange('username',value)}}
					>用户名</InputItem>
				<InputItem onChange={(value)=>{this.handleChange('password',value)}} type="password">密码</InputItem>
				<InputItem onChange={(value)=>{this.handleChange('repeatPassword',value)}} type="password">重复密码</InputItem>
			</List>
			<WhiteSpace />
			{/*<Button onClick={this.register}  type="primary">登录</Button>*/}
			<WhiteSpace />
			<Button type="primary" onClick={this.handleRegister}>注册</Button>
			</WingBlank>
			</div>)
	}
}
const mapStateToProps = (state)=>{
	return {user:state.user}
}	
const mapDispatchToProps = {
	register
}
Register = connect(mapStateToProps,mapDispatchToProps)(Register)
export default Register;