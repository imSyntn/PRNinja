import axios from "axios";
import React, { useState, useEffect } from "react";

interface resultType {
  data: any;
  error: boolean;
  loading: boolean;
}

export const useFetch = (url: string) => {
  const [result, setResult] = useState<resultType>({
    data: null,
    error: false,
    loading: false,
  });

  useEffect(() => {
    async function fetchData() {
      if (!url) return result;
      setResult({
        data: null,
        error: false,
        loading: true,
      });
      try {
        const res = await axios.get(url);

        if (res.status === 200) {
          setResult((prev) => ({ ...prev, data: res.data }));
        } else {
          setResult((prev) => ({ ...prev, error: true, data: res.data }));
        }
      } catch (error) {
        console.log(error);
        setResult((prev) => ({ ...prev, error: true }));
      } finally {
        setResult((prev) => ({ ...prev, loading: false }));
      }
    }

    fetchData();
  }, [url]);

  return result;
};
