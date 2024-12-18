import { useState, useEffect } from "react";

interface ServiceState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

const useService = <T, P>(
  service: (params: P) => Promise<T>,
  resp: P
): ServiceState<T> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service(resp);
        setData(response);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [service, resp]);
  const trans: T = data ? data : (null as T);
  return { data: trans, loading, error };
};

export default useService;
