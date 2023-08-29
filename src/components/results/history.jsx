import React, { useState } from "react";

function History({ history }) {
  const [selectedResponse, setSelectedResponse] = useState(null);

  const handleItemClick = (response) => {
    setSelectedResponse(response);
  };

  return (
    <section className="history-section">
      <h2>Previous API Calls</h2>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} className="history-item">
            <button onClick={() => handleItemClick(item.response)}>
              {`${item.method} ${item.url}`}
            </button>
          </li>
        ))}
      </ul>
      <div className="selected-response">
        {selectedResponse && (
          <>
            <h2>Selected Response</h2>
            <pre className="selected-response-pre">
              {JSON.stringify(selectedResponse, null, 2)}
            </pre>
          </>
        )}
      </div>
    </section>
  );
}

export default History;
