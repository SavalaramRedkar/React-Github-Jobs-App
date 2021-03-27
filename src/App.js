import React, { useState } from "react";
import useFetchJobs from "./Custom Hooks/useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Components/Job";
import SearchForm from "./Components/SearchForm";

function App() {
  const [params, setParams] = useState({});
  const { jobs, loading, error } = useFetchJobs(params);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  return (
    <Container>
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      {loading && <h1>loading...</h1>}
      {error && <h1>Error Occurred! Please try refreshing! </h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Container>
  );
}

export default App;
