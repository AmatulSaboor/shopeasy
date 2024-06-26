import { useState, useEffect } from 'react';
import serverURL from '../config/configFile';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //  custome hook to fetch data through fetch requests
    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            try {
                const response = await fetch(`${serverURL}${url}`);
                if (!response.ok)
                    throw new Error('Network response was not ok');
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }};
        fetchData();
    },[url]);

    return { data, loading, error };
};

export default useFetch;
