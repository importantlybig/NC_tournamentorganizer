import  {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './auth'
import { languageReducer } from './lang'
import { notificationReducer } from './notification'


const store = configureStore({
    reducer:{
        auth:authReducer,
        notification:notificationReducer,
        language:languageReducer
    }
})

export default store