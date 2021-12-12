import { createSlice } from "@reduxjs/toolkit";
import languageAsset from '../assets/language'
import axios from "axios";
const defaultLanguage = {
    language: 'ENG',
    dictionary:languageAsset}
const langSlice = createSlice({
    name:'language',
    initialState:defaultLanguage,
    reducers:{
        setLanguageToENG(state,action){
            state.language = 'ENG'
        },
        setLanguageToVIE(state,action){
            state.language = 'VIE'
        },
        addLanguageVIE(state,action){
            state.dictionary['VIE'] = action.payload
            state.language = 'VIE'
        }
    }
})



// Thunk
export const loadVieLanguage =  ()=>{
    return async (dispatch)=>{
        try {

            const response = axios.get('/public/lang/vie.json')
            console.log(response)
            dispatch(langSlice.actions.addLanguageVIE(response))
        } catch (error) {

        }
    }
}

export const languageReducer = langSlice.reducer
export const languageActions = langSlice.actions