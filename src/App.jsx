import React, { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [requestParams, setRequestParams] = useState({
    method: "GET",
    url: "",
    body: "",
  });
  const [response, setResponse] = useState("");
  const [formattedHeaders, setFormattedHeaders] = useState("");
  const [formattedData, setFormattedData] = useState("");

  useEffect(() => {
    if (response) {
      console.log(response);
      const formattedHeaders = JSON.stringify(response.headers, null, 2);
      const formattedData = JSON.stringify(response.data, null, 2);

      setFormattedHeaders(formattedHeaders);
      setFormattedData(formattedData);
    }
  }, [response]);

  async function callApi(requestParams) {
    setLoading(true);
    try {
      const requestOptions = {
        method: requestParams.method,
        url: requestParams.url,
        data: requestParams.body,
      };

      const apiResponse = await axios(requestOptions);
      setResponse(apiResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
    setRequestParams(requestParams);
  }

  return (
    <React.Fragment>
      <Header />
      <div className="centered-container">
        Request Method: {requestParams.method} <br />
        URL: {requestParams.url}
      </div>

      <Form handleApiCall={callApi} />
      <Results
        loading={loading}
        formattedHeaders={formattedHeaders}
        formattedData={formattedData}
      />
      <Footer />
    </React.Fragment>
  );
}

export default App;
