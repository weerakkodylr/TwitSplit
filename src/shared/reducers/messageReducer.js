const defaultState = {
	messages: [],
	isMessageSending: false,
	isMessageSent: false,
	isTyping: false,
	error: undefined
}

const reducer = ( state = defaultState, action ) => {

	switch(action.type){
		case "MESSAGE_SENDING" : {
			state = {...state, isMessageSending: true, isTyping: false, isTyping: false }
			break
		}
		case "MESSAGE_TYPING" : {
			state = {...state, isMessageSending: false, isMessageSent: false, isTyping: true}
			break
		}
		case "MESSAGE_SENT" : {
			let messages = [...action.payload ,...state.messages, ]
			state = {...state, messages: messages, isMessageSending: false,isTyping: true, isMessageSent: true, error: undefined }
			break
		}
		case "MESSAGE_SENDING_ERROR" : {
			state = {...state, error: action.payload.error, isTyping: false, isMessageSending: false, isMessageSent: false }
			break
		}
	}

	return state
}

export default reducer