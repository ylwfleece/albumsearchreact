import "./styles.css";
import ShowMore from "./ShowMore";

import { useResults, useResultsUpdate } from "./ResultsContext";

export default function ResultsGrid(props) {
  const resultsObj = useResults();
  return (
    <>
      <div className="results__grid">
        {resultsObj &&
          resultsObj.results &&
          resultsObj.results.slice(0, resultsObj.shown).map((result) => {
            return (
              <div className="results__grid__card">
                <img
                  className="results__grid__card__cover"
                  src={result.artworkUrl100}
                  alt=""
                />
                <span className="results__grid__card__title">
                  {result.collectionName}
                </span>
              </div>
            );
          })}
      </div>
      {resultsObj.results && resultsObj.results.length > resultsObj.shown && (
        <ShowMore />
      )}
    </>
  );
}
