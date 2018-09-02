import { MessageSplitConfig } from '../config/helperConfig'


export function splitMessage({messageText = "", Config = MessageSplitConfig}){
	return new Promise((resolve, reject)=>{
		let msgTextLength = messageText.length
		let msgLimit = Config.messageCharcaterLimit

		const msgWordArray = messageText.split(' ');
		let msgCharacterCount = 0
		let itemIndex = 0
		const partIndicatorBaseMask = Config.partIndicatorBaseMask
		let arrayLength = 0
		let partIndicator = ""
		const returnMessageArray = msgWordArray.reduce((msgArray, word) => {
			msgCharacterCount = msgCharacterCount + word.length + 1

			//Error if any word is more than maximum allowed character limit for a message
			if(word.length > Config.messageCharcaterLimit)
				reject("Invalid message content.")

			msgArray = [...msgArray]
			partIndicator = `${(msgArray.length+1)}/${partIndicatorBaseMask}`
			if(msgArray.length==0){
				msgCharacterCount = (partIndicator + (msgArray[itemIndex]? msgArray[itemIndex] : "") + " " + word ).length
				msgArray[itemIndex] = partIndicator + (msgArray[itemIndex]? msgArray[itemIndex] : "") + " " + word 
			} else if(msgArray.length > 0 && msgCharacterCount>msgLimit){
				itemIndex++;
				msgCharacterCount = (partIndicator + (msgArray[itemIndex]? msgArray[itemIndex] : "") + " " + word ).length
				msgArray[itemIndex] = partIndicator + (msgArray[itemIndex]? msgArray[itemIndex] : "") + " " + word 
			} else {
				msgArray[itemIndex] = (msgArray[itemIndex]? msgArray[itemIndex] : "") + " " + word 
			}
			arrayLength = msgArray.length

			return msgArray;
		}, []).map((item, index) => item.replace(`/${partIndicatorBaseMask}`, `/${arrayLength}`))

	if(String(arrayLength).length > partIndicatorBaseMask.length) {
		//Error when maximum supported character limit is reaced for chunking. aproximatly 4000 charactors on given configurations.
		reject('Meassage length is too long.')
	} else {
		resolve(returnMessageArray) 
	}
	})

}
