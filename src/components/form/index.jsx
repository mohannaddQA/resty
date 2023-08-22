import React, { useState } from "react";
import "./form.scss";

function Form({ handleApiCall }) {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [jsonBody, setJsonBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      data: jsonBody,
    };
    handleApiCall(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span
            onClick={() => setMethod("GET")}
            className={method === "GET" ? "active" : ""}
          >
            GET
          </span>
          <span
            onClick={() => setMethod("POST")}
            className={method === "POST" ? "active" : ""}
          >
            POST
          </span>
          <span
            onClick={() => setMethod("PUT")}
            className={method === "PUT" ? "active" : ""}
          >
            PUT
          </span>
          <span
            onClick={() => setMethod("DELETE")}
            className={method === "DELETE" ? "active" : ""}
          >
            DELETE
          </span>
        </label>
        {(method === "POST" || method === "PUT") && (
          <textarea
            placeholder="JSON Body"
            value={jsonBody}
            onChange={(e) => setJsonBody(e.target.value)}
          />
        )}
      </form>
    </>
  );
}

export default Form;
