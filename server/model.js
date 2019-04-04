const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/cchat'
mongoose.connect(DB_URL,{ useNewUrlParser: true })


const models = {
	user:{
		phoneNumber:{type:String},
		username:{type:String,require:true},
		password:{type:String,require:true},
		//角色,学生,班长,老师,管理员,超级管理员,
		type:{type:String},
		//超级管理员需要双重确认
		isSuperAdmin:{type:Boolean,default:false},
		//头像信息
		avatar:{type:String},
		//简介
		desc:{type:String},
		//title
		title:{type:String},
		//邮箱
		email:{type:String}
	},
	chat:{
	},
}

for(let m in models){
	mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name);
	}
}