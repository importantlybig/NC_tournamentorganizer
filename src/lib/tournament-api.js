import axios from 'axios'
import { httpErrorHandler } from '../utils/httpErrorHandler'

export const getTournaments = async ({
	search = '',
	page = 0,
	sortBy = 'DESC',
	size = 8,
}) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/tournaments`,
			{
				params: {
					search,
					page,
					sortBy,
					size,
				},
			}
		)
		console.log(response.data)

		return response.data
	} catch (error) {
		console.log(error)
		const processedError = httpErrorHandler(error)
		throw processedError
	}
}

export const getTournamentDetail = async (id = 1) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/tournaments/${id}`
			// {
			// 	params: {
			// 		search: search.trim(),
			// 		page,
			// 		sortBy,
			// 		size,
			// 	},
			// }
		)
		console.log(response.data)

		return response.data
	} catch (error) {
		console.log(error)
		const processedError = httpErrorHandler(error)
		throw processedError
	}
}

export const createTournamentTeam = async ({id,requestBody}) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_API_BASE_URL}/tournaments/${id}/teams`,
			requestBody
		)
		console.log(response.data)

		return response.data
	} catch (error) {
		console.log(error)
		const processedError = httpErrorHandler(error)
		throw processedError
	}
}
