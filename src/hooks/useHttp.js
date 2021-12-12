import { useCallback, useState } from "react"

const useHttp = () =>{
    //const [data] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [hasError,setHasError] = useState(false)
    const [errorMessage,setErrorMessage] = useState(null)
    const [finished,setFinished] = useState(false)

    const httpRequest = useCallback(async (api_func,payload,dataLoadedHandler)=>{
        setFinished(false)
        setHasError(false)
        setIsLoading(true)
        try {
            const data  = await api_func(payload)
            // Process or display data
            dataLoadedHandler(data)
        } catch (error) {
            setHasError(true)
            // Process or display error
            setErrorMessage(error.message)
        }
        setIsLoading(false)
        setFinished(true)
    },[])

    return {
        httpRequest,
        isLoading,
        hasError,
        errorMessage,
        finished
    }
}



export default useHttp

