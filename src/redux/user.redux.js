import axios from 'axios'
import {getRedirectPath} from '../util.js'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
	redirectTo:'',
	msg:'',
	isAuth:'',
	username:'',
	password:'',
}

export function user(state=initState,action){
	switch(action.type){
		case AUTH_SUCCESS:
			return {...state,msg:'',redirectTo:'/dashboard',isAuth:true,...action.payload}
		case REGISTER_SUCCESS:
			return {...state,msg:'',redirectTo:'/dashboard',isAuth:true,...action.payload}
		case LOGIN_SUCCESS:
			return {...state,redirectTo:'/dashboard',isAuth:true,msg:action.msg}
		case LOAD_DATA:
			return {...state,...{loginData:action.payload}}
		case ERROR_MSG:
			return {...state,isAuth:false,msg:action.msg}
		default:
			return state;
	}
	return state
}
function authSuccess(data){
	return {
		type:AUTH_SUCCESS,
		msg:data
	}
}
function registerSuccess(data){
	return {
		type:REGISTER_SUCCESS,
		msg:data
	}
}
function loginSuccess(data){
	return {
		type:LOGIN_SUCCESS,
		payload:data
	}
}
function errorMsg(msg){
	return {type:ERROR_MSG,msg:msg}
}
export function userinfo(){
	return dispatch=>{
		axios.get('/user/info')
		.then(res=>{
			if(res.status==200&&res.data.code == 0){
				//有登录信息

			}else{

				this.props.history.push('/login')
			}
		})
	}
}
export function loadData(data){
	 return {
	 	type:LOAD_DATA,
	 	payload:data
	 }
}
export function update(data){
	return dispatch=>{
		axios.post('/user/update',data)
				 .then(res=>{
			 	if(res.status==200&&res.data.code===0){
			 		dispatch(authSuccess(res.data.msg))
			 	}else{
			 		dispatch(errorMsg(res.data.msg))
			 	}
		 })
	}
}
export function register({username,password,repeatPassword}){
	if(!username||!password){
		return errorMsg('必须输入用户名与密码')
	}
	if(password!=repeatPassword){
		return errorMsg('两次输入密码不同')
	}
	return dispatch=>{
		axios.post('/user/register',{username,password})
			 .then(res=>{
			 	if(res.status==200&&res.data.code===0){
			 		dispatch(registerSuccess(res.data.msg))
			 	}else{
			 		dispatch(errorMsg(res.data.msg))
			 	}
		 })
	}
}

export function login({username='',password=''}){
	if(!username||!password){
		return errorMsg('必须输入用户名与密码')
	}
	return dispatch=>{
		axios.post('/user/login',{username,password})
			 .then(res=>{
			 	if(res.status==200&&res.data.code===0){
			 		dispatch(loginSuccess({username,password}))
			 	}else{
			 		dispatch(errorMsg(res.data.msg))
			 	}
		 })
	}
}





