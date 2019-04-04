import React from 'react'
import {Grid,List} from 'antd-mobile'

class AvatarSelector extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			text:'',
			icon:null
		}
	}
	componentWillMount(){
	}
	render(){
		const avatarList = 'boy,girl'.split(',')
											 .map(v=>({
				 											 	icon:require(`../img/${v}.png`),
				 											 	text:v
				 											 }))
    const gridHeader = this.state.text?
    (<div>
    	<span>已选择头像</span>
    	<img onClick={()=>this.setState({text:''})} style={{width:20,verticalAlign: 'middle'}} src={this.state.icon} alt="avatar" />
    	</div>)
    :'请选择头像';
		return (
			<div>
				<List renderHeader={()=>gridHeader}>
				{this.state.text?null:<Grid data={avatarList} onClick={ele=>{
					console.log(ele)
					this.setState(prevState=>({
						text:ele.text,
						icon:ele.icon
					}))
					this.props.selectAvatar(ele.text)
				}} />}
				</List>
			</div>
			)
	}
}

export default AvatarSelector