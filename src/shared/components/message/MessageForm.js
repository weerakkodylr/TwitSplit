import React from 'react'

const MessageFrom = (props) => (
	<React.Fragment>
		<textarea id="message" class="msg_text" placeholder="Enter your tweet" value={props.txtMessage} onChange={props.typeMessage}></textarea>
		<span class={"error" + (props.error? "" : " hide")}>{props.error}</span>
		<button type="button" id="submit" class={props.isSendMessagesDisabled? "disabled_button" : "button"} onClick={props.sendMessage}>Send</button>
	</React.Fragment>
)

module.exports = MessageFrom
