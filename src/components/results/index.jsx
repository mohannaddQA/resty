import React from "react";
import "./results.scss";

function Results({ data }) {
  return (
    <section className="results-section">
      <pre className="results-pre">
        {data ? JSON.stringify(data, undefined, 2) : null}
      </pre>
    </section>
  );
}

export default Results;
