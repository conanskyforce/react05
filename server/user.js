const express = require('express')
const model = require('./model')
const Router = express.Router()
const User = model.getModel('user')
const util = require('utility')
const _filter = {password:0,__v:0}

Router.get('/list',(req,res)=>{
	//User.remove({},()=>{}) 删除所有用户
	User.find({},(err,docs)=>{
		return res.json(docs)
	})
})
Router.post('/register',(req,res)=>{
	console.log(req.body);
	const {username,password} = req.body;
	User.findOne({username},(err,docs)=>{
		if(docs){
			return res.json({code:1,msg:'用户名已存在'})
		}else{
			const userModel = new User({username,password:encryptPassword(password)})
			userModel.save((err,doc)=>{
				if(err){
					return res.json({code:1,msg:'Internal Server Error'})
				}
				//写入cookie? 注册成功不自动登录, 提示再登录,
				return res.json({code:0,msg:'注册成功'})
			})
		}
	})
})
Router.post('/update',(req,res)=>{
	const {userid} = req.cookies;
	if(!userid){
		return res.json({code:1})
	}
	const body = req.body;
	User.findOneAndUpdate(userid,body,(err,doc)=>{
		if(err){
			return res.json({code:1})
		}
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})
})
Router.post('/login',(req,res)=>{
	const {username,password} = req.body;
	User.findOne({username,password:encryptPassword(password)},(err,docs)=>{
		if(!docs){
			return res.json({code:1,msg:'用户名或密码错误'})
		}else{
			//处理cookie
			res.cookie('userid',docs._id);
			return res.json({code:0,msg:'登录成功'})
		}
	})
})
function encryptPassword(password){
	const salt = 'asesome_conan_ioplus_top)(*&^%$#@!';
	return util.md5(util.md5(password+salt));
}
Router.get('/info',(req,res)=>{
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid},_filter,(err,doc)=>{
		if(err){
			return res.json({code:1,msg:'Internal Server Error'})
		}
		if(doc){
			return res.json({code:0,data:doc})
		}
	})
})
Router.get('/dashboard',(req,res)=>{
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid},_filter,(err,doc)=>{
		if(err){
			return res.json({code:1,msg:'Internal Server Error'})
		}
		if(doc){
			return res.json({code:0,data:doc})
		}
	})
})
module.exports = Router;