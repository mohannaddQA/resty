import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./results.scss";

function Results({ loading, formattedHeaders, formattedData }) {
  return (
    <section className="results-section">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="response-header">
            <h2>Response Headers:</h2>
            <SyntaxHighlighter language="json" style={docco}>
              {formattedHeaders}
            </SyntaxHighlighter>
          </div>

          <div className="response-data">
            <h2>Response Data:</h2>
            <SyntaxHighlighter language="json" style={docco}>
              {formattedData}
            </SyntaxHighlighter>
          </div>
        </>
      )}
    </section>
  );
}

export default Results;
