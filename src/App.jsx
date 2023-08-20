import React, { useState } from "react";
import "./App.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";

function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  function callApi(requestParams) {
    const newData = {
      count: 2,
      results: [
        { name: "fake thing 1", url: "http://fakethings.com/1" },
        { name: "fake thing 2", url: "http://fakethings.com/2" },
      ],
    };
    setData(newData);
    setRequestParams(requestParams);
  }

  return (
    <React.Fragment>
      <Header />
      <div className="centered-container">
        {" "}
        Request Method: {requestParams.method} <br></br>
        URL: {requestParams.url}
      </div>

      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
