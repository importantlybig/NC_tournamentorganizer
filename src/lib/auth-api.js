// Contain api relating to authentication
import axios from 'axios'
import { httpErrorHandlerLogin } from '../utils/httpErrorHandler'


export const loginRequestAPI = async (requestBody) => {
	try {
		//Send POST request
		const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/login', {
			email: requestBody.enteredEmail,
			password: requestBody.enteredPassword,
		})

		//Data processing , convert to the front-end format
		//...
		console.log(response.data)

		//Store in token in login context
		return response.data
	} catch (error) {
		 //Error
        ///Data error 
        const processedError = httpErrorHandlerLogin(error)
        throw processedError
	}
}
