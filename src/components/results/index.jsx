import React from "react";
import "./results.scss";

function Results({ data, loading }) {
  return (
    <section className="results-section">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <pre className="results-pre">
          {data ? JSON.stringify(data, undefined, 2) : null}
        </pre>
      )}
    </section>
  );
}

export default Results;
