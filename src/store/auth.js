import { createSlice } from '@reduxjs/toolkit'
import { loginRequestAPI } from '../lib/auth-api'
import { notificationActions } from './notification'

const authInitialState = {
	id: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : null,
	token: sessionStorage.getItem('token')
		? sessionStorage.getItem('token')
		: null,
	name: sessionStorage.getItem('name')
		? sessionStorage.getItem('name')
		: 'Anonymous',
	expiredTime: null,
	isLoggedIn: sessionStorage.getItem('token') ? true : false,
    role: sessionStorage.getItem('role')
    ? sessionStorage.getItem('role')
    : null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		login(state, action) {
			//Store token in session storage
			window.sessionStorage.setItem('id', action.payload.id)
			window.sessionStorage.setItem('token', action.payload.token)
			window.sessionStorage.setItem('name', action.payload.name)
            window.sessionStorage.setItem('role',action.payload.role)
			//Update auth context
			state.id = action.payload.id
			state.token = action.payload.token
			state.name = action.payload.name
			state.isLoggedIn = true
            state.role = action.payload.role
        },
		logout(state, action) {
			//Remove token from the session storage
			window.sessionStorage.removeItem('id')
			window.sessionStorage.removeItem('token')
			window.sessionStorage.removeItem('name')
            window.sessionStorage.removeItem('role')
			//Update auth context
			state.token = null
			state.id = null
            state.name = 'Anomymous'
			state.isLoggedIn = false
            state.role = 'Anomymous user'

		},
	},
})

// Thunk
export const sendLoginRequest = (requestData) => {
	return async (dispatch) => {
		try {
			dispatch(notificationActions.pending())
			const authData = await loginRequestAPI(requestData)
			dispatch(
				authActions.login({
					id: authData.id,
					token: authData.token,
					name: authData.firstName,
                    role:authData.role
				})
			)
			dispatch(notificationActions.success())
		} catch (error) {
			dispatch(notificationActions.fail(`${error.message}`))
		}
	}
}

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
