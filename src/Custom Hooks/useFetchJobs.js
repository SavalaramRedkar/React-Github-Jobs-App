import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchJobs(params) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url =
    "https://secret-ocean-49799.herokuapp.com/https://jobs.github.com/positions.json";

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    setLoading(true);
    axios
      .get(url, {
        cancelToken: cancelToken.token,
        params: {
          markdown: true,
          ...params,
        },
      })
      .then((response) => {
        // console.log(response);
        setJobs(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        setError(error);
        setLoading(false);
        setJobs([]);
      });

    return () => {
      cancelToken.cancel();
    };
  }, [params]);

  return {
    jobs,
    loading,
    error,
  };
}
