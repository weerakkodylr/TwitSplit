import React from 'react'
import { connect } from 'react-redux'
import * as Helpers from '../../common/helperFunctions'
import * as MessageActions from '../../actions/messageActions'
import ListMessages from '../../components/message/ListMessages'
import Title from '../../components/message/Title'
import MessageForm from '../../components/message/MessageForm'

class Message extends React.Component{
	constructor(){
		super()
		this.state = {
			txtMessage: "",
			isSendMessagesDisabled: true
		}
	}

	//This method needs to be there in all the containers since this is from there it retrives initial data for server side rendering.
	//Since in this perticular situation we don't load initial data I have returned a resolved promose.
	static requestInitialdata(params){
		//e.g. return Promise.all([params.dispatch(MessageActions.loadMessages())])
		return	Promise.resolve()
	}

	typeMessage(e){
		this.setState({txtMessage: e.target.value})
		this.props.dispatch(MessageActions.typingMessage())
		if(e.target.value.trim().length > 0)
			this.setState({isSendMessagesDisabled: false})
	}

	sendMessage(){
		if(!this.state.isSendMessagesDisabled) {
			this.props.dispatch(MessageActions.sendMessage(this.state.txtMessage))
		}
	}

	componentDidUpdate(){
		//Keep the message in the text area if an error happened while sending. else erase the message from text area
		if(this.state.txtMessage!== "" && this.props.isMessageSent && !this.props.error){
			this.setState({txtMessage: "", isSendMessagesDisabled: true})
		}
	}

	render(){
		return(
			<div class="main_container">
					<Title />
					<MessageForm isSendMessagesDisabled={this.state.isSendMessagesDisabled} error={this.props.error} txtMessage={this.state.txtMessage} typeMessage={this.typeMessage.bind(this)} sendMessage={this.sendMessage.bind(this)}/>
					<ListMessages messages={this.props.messages}/>
			</div>
		)
	}
}

const storeProps = (store) => ({
	messages: store.message.messages,
	isMessageSending: store.message.isMessageSending,
	isMessageSent: store.message.isMessageSent,
	error: store.message.error,
	isTyping: store.message.isTyping,
})


export default connect(storeProps)(Message)

