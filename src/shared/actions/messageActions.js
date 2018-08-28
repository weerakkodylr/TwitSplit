

function loadingIntro(){
	return {
		type:"INTRO_LOADING"
	}
}

function updateStoreWithIntro(data){
	return {
		type:"INTRO_LOADED",
		payload: data
	}
}

function errorLoadingInto(error){
	return {
		type:"INTRO_LOAD_ERROR",
		payload: error
	}
}