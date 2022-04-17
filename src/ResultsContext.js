import React, { useContext, useState } from "react";

const ResultsContext = React.createContext();
const ResultsUpdateContext = React.createContext();

export function useResults() {
  return useContext(ResultsContext);
}

export function useResultsUpdate() {
  return useContext(ResultsUpdateContext);
}
export function ResultsProvider({ children }) {
  const [results, setResults] = useState({});

  function updateResults(results) {
    setResults(results);
  }

  return (
    <ResultsContext.Provider value={results}>
      <ResultsUpdateContext.Provider value={updateResults}>
        {children}
      </ResultsUpdateContext.Provider>
    </ResultsContext.Provider>
  );
}
