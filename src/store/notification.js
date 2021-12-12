import { createSlice } from "@reduxjs/toolkit";


const intialRquestState = {
    status: null,
    message: "No action yet"
}

const notificationSlice = createSlice({
    name:'notification',
    initialState: intialRquestState,
    reducers: {
        pending(state,action){
            state.status = 'PENDING'
            state.message = action.payload ? action.payload : "PENDING MESSAGE"
        },
        success(state,action){
            state.status = 'SUCCESS'
            state.message = action.payload  ? action.payload  : "SUCCESS MESSAGE"
        },
        fail(state,action){
            state.status = 'FAIL'
            state.message = action.payload ? action.payload  : "FAIL MESSAGE"
        },
        reset(state,action){
            state.status = null
            state.message = "No action yet"
        }
    }
})

export const notificationActions = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer
