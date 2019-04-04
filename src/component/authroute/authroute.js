import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

class AuthRoute extends React.Component{
	componentDidMount(){
		const publicList = ['/login','/register']
		const pathname = this.props.location.pathname;
		if(publicList.includes(pathname)){
			return null
		}
		//获取用户信息
		axios.get('/user/info').
			then(res=>{
				if(res.status == 200){
					console.log(res.data)
					if(res.data.code==0){
						//有登录信息的
						console.log(this.props);
						this.props.loadData(res.data.data);
						
					}else{
						this.props.history.push('/login');
					}
				}
			})
	}
	render(){
		return null
	}
}
const mapStateToProps = (state)=>({
	user:state.user
})

const mapDispatchToProps = {loadData}

AuthRoute = connect(mapStateToProps,mapDispatchToProps)(withRouter(AuthRoute))
export default AuthRoute;