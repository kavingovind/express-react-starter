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
    setLoading(true);
    try {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data: APIResponse) => setData(data))
        .catch(() => setError(true));
    } catch (error) {
      setError(true);
    }

    setLoading(false);
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
