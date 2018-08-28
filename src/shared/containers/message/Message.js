import React from 'react'


export default class Message extends React.Component{
	constructor(){
		super()
	}

	static requestInitialdata(params){
		return	Promise.resolve()//Promise.all([params.dispatch(sampleActions.loadIntro())])
	}

	render(){

		return(
			<div class="main_container">
					<h1>Tweeter</h1>
					<textarea id="message" class="text"></textarea>
					<button type="button" id="submit" class="button">Send</button>
			</div>
		)
	}
}