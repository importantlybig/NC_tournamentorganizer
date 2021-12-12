import axios from "axios"
import moment from "moment";
import { httpErrorHandler } from "../utils/httpErrorHandler";


export const createNewAccountAPI = async (data,token)=> {
    try {
        const config = {
            headers: { 
                Authorization: `Bearer ${token}`, }
        };    
        //Send POST request
        const response = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/users',{
                email: data.enteredEmail,
                password: data.enteredPassword,
                firstName:data.enteredFirstName,
                lastName: data.enteredLastName
            },config)

        //Data processing , convert to the front-end format
        //...   
        console.log(response)     
        return response.data
    } catch (error) {
        //Error
        ///Data error 
        const processedError = httpErrorHandler(error)
        throw processedError
    }
}

export const getAllAccounts = async (token)=>{
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`, }
    };    
    try {
       const response = await axios.get(process.env.REACT_APP_API_BASE_URL + '/users',config)
       const data = response.data.content 
    

       const processedAccountList = data.map(account=>{
           return { 
           'id': account['id'] ,
           'firstName' :account['firstName'] ? account['firstName'] : "",
           'lastName':account['lastName'] ? account['lastName'] : "",
           'email':account['email'],
           'phone': account['phone'] ? account['phone'] : "",
           'address': account['address'] ? account['address'] : "",           
           'status':account['status'],
           'createdAt': moment.unix(account['createdAt']).format("MM/DD/YYYY  h:mm:ss a") ,
           'createdBy':account['createdBy'],
           'updatedAt': moment.unix(account['updatedAt']).format("MM/DD/YYYY  h:mm:ss a")  ,
           'updatedBy':account['updatedBy']}
       })

       return processedAccountList
    } catch (error) {
        const precessedError = httpErrorHandler(error)
        throw precessedError
        //throw new Error(error.response.data.error.message)
    }
}

export const updateAccount = async (token,data,userID)=>{
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`, }
    };    
    try {
       const repsonse = await axios.put(process.env.REACT_APP_API_BASE_URL + `/users/${userID}`,data,config)
       console.log(repsonse)
    
    } catch (error) {
        console.log(error)
        //throw new Error(error.response.data.error.message)
    }
}

export const deActivateAccounts = async (token,idList)=>{
    console.log(idList)
 const config = {
        headers: { 
            Authorization: `Bearer ${token}`, }
    };    
    try {
       const repsonse = await axios.put(process.env.REACT_APP_API_BASE_URL + `/users/deactivate`,idList,config)
       console.log(repsonse)
    } catch (error) {
        const precessedError = httpErrorHandler(error)
        throw precessedError
        //throw new Error(error.response.data.error.message)
    }
}
