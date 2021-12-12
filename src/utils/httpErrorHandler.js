export const httpErrorHandler = (error) => {
	if (!error.response) {
		return new Error('Something went wrong,please try again later')
	} else if (error.response.status === 401) {
		return new Error('Unauthenticated,please re-login')
	} else if (error.response.data.errorDescription) {
		return new Error(error.response.data.errorDescription)
	} //Other error
	else {
		return new Error('Something went wrong,please try again later')
	}
}

export const httpErrorHandlerLogin = (error) => {
	if (!error.response) {
		return new Error('Something went wrong,please try again later')
	} else if (error.response.status === 401) {
		return new Error('Invalid username or password ')
	} else if (error.response.data.errorDescription) {
		return new Error(error.response.data.errorDescription)
	} //Other error
	else {
		return new Error('Something went wrong,please try again later')
	}
}
