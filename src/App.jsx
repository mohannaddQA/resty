import React, { useState } from "react";
import "./App.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestParams, setRequestParams] = useState({
    method: "GET",
    url: "",
    body: "",
  });

  async function callApi(requestParams) {
    setLoading(true);
    try {
      const requestOptions = {
        method: requestParams.method,
        url: requestParams.url,
        data: requestParams.body,
      };

      const response = await axios(requestOptions);

      const responseData = {
        url: requestParams.url,
        method: requestParams.method,
        response: response.data,
      };

      setData(responseData);
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
      <Results data={data} loading={loading} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
