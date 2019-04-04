import React from 'react'
import AuthRoute from '../../component/authroute/authroute'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {NavBar,Icon,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
import PropTypes from 'prop-types'
class Dashboard extends React.Component{
	static contextTypes = {
		redirectTo:PropTypes.string
	}
	static defaultProps = {
		redirectTo:''
	}
	constructor(props){
		super(props);
		this.selectAvatar = this.selectAvatar.bind(this)
	}
	componentWillMount(){
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}
	selectAvatar(value){
		this.setState({
			avatar:value
		})
	}
	render(){
		return (
				<div>
					{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
					<NavBar
		      mode="dark"
		    	>Dashboard</NavBar>
		    	<AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
		    	<InputItem onChange={(v)=>this.onChange('title',v)}>
		    		招聘职位
		    	</InputItem>
		    	<InputItem onChange={(v)=>this.onChange('company',v)}>
		    		公司名称
		    	</InputItem>
		    	<InputItem onChange={(v)=>this.onChange('job',v)}>
		    		职位薪资
		    	</InputItem>
		    	<TextareaItem title='职位要求' autoHeight rows={3} onChange={(v)=>this.onChange('requirement',v)}>
		    	</TextareaItem>
		    	<Button onClick={()=>{
		    		this.props.update(this.state)
		    	}} type='primary'>保存</Button>
				</div>
			)
	}
}
const mapStateToProps = (state)=>({
	user:state.user
})

Dashboard = connect(mapStateToProps,{update})(Dashboard)

export default Dashboard

