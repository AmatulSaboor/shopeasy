import serverURL from "../config/configFile";

const fetchData = async (url, options = {}) => {
    try {
        const result = await fetch(`${serverURL}${url}`, options)
        return(result.json())
    } catch (error) {
        throw error
    }
}

export default fetchData