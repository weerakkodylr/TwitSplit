import React from 'react'

export default class ListMessages extends React.Component{
	constructor(){
		super()
	}

	render(){

		let messageList = this.props.messages.map((message, index)=>
			<div key={"msg" + index} class="message_display">
				<span>{message}</span>
			</div>
		)

		return(
			<React.Fragment>
				<div class="message_display_container">
					{messageList}
				</div>
				<div class="clear"></div>
			</React.Fragment>
		)
	}
}