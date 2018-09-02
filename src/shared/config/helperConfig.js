const MessageSplitConfig = {
	messageCharcaterLimit : 50, //Character limit for a message.
	partIndicatorBaseMask : "##" //Maximum allowed chunks length. i.e. if '##' then maximum is 99 chunks. if changed to '###', it'll be 999 chunks
}

module.exports = { MessageSplitConfig }