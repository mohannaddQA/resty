import React, { useReducer, useEffect } from "react";
import "./App.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";
import History from "./components/results/history";
import axios from "axios";

let response;
const initialState = {
  loading: false,
  requestParams: {
    method: "GET",
    url: "",
    body: "",
  },
  response: null,
  formattedHeaders: "",
  formattedData: "",
  history: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CALL_API":
      return {
        ...state,
        loading: true,
        requestParams: action.payload.requestParams,
      };
    case "API_SUCCESS":
      response = action.payload.response;
      return {
        ...state,
        loading: false,
        response: action.payload.response,
        formattedHeaders: JSON.stringify(response.headers, null, 2),
        formattedData: JSON.stringify(response.data, null, 2),
        history: [
          ...state.history,
          {
            method: action.payload.requestParams.method,
            url: action.payload.requestParams.url,
            response: response.data,
          },
        ],
      };
    case "API_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.response) {
      console.log("response is triggered");
    }
  }, [state.response]);

  async function callApi(requestParams) {
    dispatch({ type: "CALL_API", payload: { requestParams } });
    try {
      const requestOptions = {
        method: requestParams.method,
        url: requestParams.url,
        data: requestParams.body,
      };

      const apiResponse = await axios(requestOptions);
      dispatch({
        type: "API_SUCCESS",
        payload: { requestParams, response: apiResponse },
      });
    } catch (error) {
      dispatch({ type: "API_ERROR", payload: { error } });
      console.error("Error fetching data:", error);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <div className="centered-container">
        Request Method: {state.requestParams.method} <br />
        URL: {state.requestParams.url}
      </div>

      <Form handleApiCall={callApi} />
      <Results
        loading={state.loading}
        formattedHeaders={state.formattedHeaders}
        formattedData={state.formattedData}
      />
      <History history={state.history} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
