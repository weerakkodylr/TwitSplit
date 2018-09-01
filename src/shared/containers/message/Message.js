import React from 'react'
import * as Helpers from '../../common/helperFunctions'

export default class Message extends React.Component{
	constructor(){
		super()
		this.state = {
			txtMessage: ""
		}
	}

	static requestInitialdata(params){
		return	Promise.resolve()//Promise.all([params.dispatch(sampleActions.loadIntro())])
	}

	typeMessage(e){
		this.setState({txtMessage: e.target.value})
	}

	sendMessage(){
		console.log('sending message ' + this.state.txtMessage)
	}

	render(){
		
		return(
			<div class="main_container">
					<h1>Tweeter</h1>
					<textarea id="message" class="text" value={this.state.txtMessage} onChange={this.typeMessage.bind(this)}></textarea>
					<button type="button" id="submit" class="button" onClick={this.sendMessage.bind(this)}>Send</button>
			</div>
		)
	}
}