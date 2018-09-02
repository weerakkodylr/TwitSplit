import { MessageSplitConfig } from '../config/helperConfig'
import * as Helpers from '../common/helperFunctions'

export const sendMessage = (messageText) => {
	return ((dispatch)=>{
		dispatch(messageSending())

		if(messageText.length <= MessageSplitConfig.messageCharcaterLimit)
			dispatch(messageSent([messageText]))
		else {
			Helpers.splitMessage({messageText})
			.then((result) => {
				console.log("Result ," , result)
				dispatch(messageSent(result))
			})
			.catch((err)=>{
				dispatch(messageSendingError(err,messageText))
			})
		}
	})
}

export const typingMessage = () => {
	return ((dispatch)=>{
		dispatch(messageTyping())
	})

}

function messageSending(){
	return {
		type:"MESSAGE_SENDING"
	}
}

function messageTyping(){
	return {
		type:"MESSAGE_TYPING"
	}
}

function messageSent(messageArray){
	return {
		type:"MESSAGE_SENT",
		payload: messageArray
	}
}

function messageSendingError(error, messageText){
	return {
		type:"MESSAGE_SENDING_ERROR",
		payload: {error, messageText}
	}
}