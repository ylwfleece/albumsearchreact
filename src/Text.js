import "./Text.css";
import errorSvg from "./error.svg";
import searchSvg from "./search.svg";
import { useResultsUpdate } from "./ResultsContext";
import React, { useState } from "react";

function Text({ empty, placeholder, filled, ...rest }) {
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const updateResults = useResultsUpdate();

  function getResults(searchTerm) {
    return fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&attribute=artistTerm&limit=75`
    ).then((res) => res.json());
  }

  const search = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchTerm !== "") {
        setError(false);
        updateResults({ loading: true });
        getResults(searchTerm).then((results) =>
          updateResults({ results: results.results, shown: 20, loaded: true })
        );
      } else {
        setError(true);
      }
    }
  };
  return (
    <>
      {empty && !error && (
        <div className="inputContainer tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={search}
            className="inputField"
            {...rest}></input>
          <img src={searchSvg} onClick={search} />
        </div>
      )}
      {placeholder && !error && (
        <div className="inputContainer tableRow">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={search}
            placeholder={searchTerm ? searchTerm : "Search..."}
            className="inputField"
            {...rest}></input>
          <img src={searchSvg} onClick={search} />
        </div>
      )}
      {filled && !error && (
        <div className="inputContainer tableRow">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={search}
            value="Input"
            className="inputField"
            {...rest}></input>
          <img src={searchSvg} onClick={search} />
        </div>
      )}
      {empty && error && (
        <div className="inputContainer-error tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={search}
            className="inputField-error"
            {...rest}></input>
          <img src={!searchTerm ? errorSvg : searchSvg} onClick={search} />
        </div>
      )}
      {placeholder && error && (
        <div className="inputContainer-error tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={search}
            placeholder="Enter valid term"
            className="inputField-error"
            {...rest}></input>
          <img src={!searchTerm ? errorSvg : searchSvg} onClick={search} />
        </div>
      )}
      {filled && error && (
        <div className="inputContainer-error tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={search}
            value="Input"
            className="inputField-error"
            {...rest}></input>
          <img src={!searchTerm ? errorSvg : searchSvg} onClick={search} />
        </div>
      )}
    </>
  );
}

export default Text;
