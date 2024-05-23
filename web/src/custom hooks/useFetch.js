import serverURL from '../config/configFile'
import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try{
            fetch(serverURL + url, options)
            .then(response => response.json())
            .then(response => {
                setData(response)
                setIsLoading(false)
            })
            .catch(e => {
                setError(e)
                setIsLoading(false)
        })
    }catch(e){
        setError(e)
        setIsLoading(false)
    }
    }, [url, options])

    return [data, error, isLoading]
}

export default useFetch;