import { useState, useEffect } from "react";

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const apiKey = '9243098c7038ad501a3bbff3589770d7';

    useEffect(() => {
        const fetchData = () => {
            fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=en-US&page=1;`, { mode: "cors" })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Server error");
                    }
                    return response.json();
                })
                .then((response) => {
                    setData(response.results);
                })
                .catch((error) => {
                    console.error(error);
                    setError(error.message);
                })
                .finally(() => {
                    setIsPending(false);
                });
        };

        fetchData();
    }, [endpoint]);

    return {data, error, isPending}
}

export default useFetch;