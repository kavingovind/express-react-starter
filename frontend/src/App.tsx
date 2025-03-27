import { Fragment, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

interface APIResponse {
  status: string;
  message: string;
}

function App() {
  const [data, setData] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      if (!API_URL) return;

      try {
        const response = await fetch(API_URL);
        const data: APIResponse = await response.json();
        setData(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">Error fetching data from the server.</p>;
  }

  return (
    <Fragment>
      <h2>Health Check</h2>
      {data && (
        <Fragment>
          <p className="success">
            <strong>Status:</strong> {data.status}
          </p>
          <p className="success">
            <strong>Message:</strong> {data.message}
          </p>
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
