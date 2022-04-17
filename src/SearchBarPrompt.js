import "./styles.css";
import { useResults } from "./ResultsContext";

export default function SearchBarPrompt() {
  const results = useResults();
  return (
    <div className="searchbar__prompt">
      {!results.loading && !results.results && (
        <h1>Search Albums by Artist Name</h1>
      )}
      {results.loading && <div className="loader"></div>}
      {results.loaded && <h1>{results.results.length} results</h1>}
    </div>
  );
}
