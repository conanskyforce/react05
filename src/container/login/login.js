import React from 'react'
import {Component} from 'react'
import './login.css'
import Logo from '../../component/logo/logo'
import {List, InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

class Login extends Component{
	constructor(props){
		super(props);
		this.register = this.register.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.state = {
			username:'',
			password:''
		}
	}
	register(){
		this.props.history.push('/register')
	}
	handleLogin(){
		if(this.props.login){
			this.props.login({
				username:this.state.username,
				password:this.state.password
			})
		}
	}
	handleUsernameAndPassword(key,value){
		this.setState({
			[key]:value
		})
	}
	render(){
		return (
			<div>
			{(this.props.user.isAuth&&this.props.user.redirectTo)?< Redirect to={this.props.user.redirectTo} />:null}
			<Logo />
			<h2 className='login'>登录页</h2>
			<WingBlank>
			{this.props.user.msg?<p className='error-msg'>{this.props.user.msg}</p>:null}
			<List>
			<InputItem	onChange={(e)=>{this.handleUsernameAndPassword('username',e)}}>用户</InputItem>
			<InputItem	type="password" onChange={(e)=>{this.handleUsernameAndPassword('password',e)}}>密码</InputItem>
			</List>
			<WhiteSpace />
			<Button type="primary" onClick={this.handleLogin}>登录</Button>
			<WhiteSpace />
			<Button onClick={this.register} type="primary">注册</Button>
			</WingBlank>
			</div>)
	}
}
const mapStateToProps =(state)=> {
	return {
		user:state.user
	}
}

const mapDispatchToProps = {login}

Login = connect(mapStateToProps,mapDispatchToProps)(Login)
export default Login;
