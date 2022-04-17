import "./Text.css";
import errorSvg from "./error.svg";
import searchSvg from "./search.svg";
import { useResultsUpdate } from "./ResultsContext";
import React, { useState } from "react";

function Text(props) {
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
      {props.empty && !error && props.default && (
        <div className="inputContainer tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={search}
            className="inputField"
          ></input>
          <img src={searchSvg} onClick={search} />
        </div>
      )}
      {props.placeholder && !error && props.default && (
        <div className="inputContainer tableRow">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={search}
            placeholder={searchTerm ? searchTerm : "Search..."}
            className="inputField"
          ></input>
          <img src={searchSvg} onClick={search} />
        </div>
      )}
      {props.filled && !error && props.default && (
        <div className="inputContainer tableRow">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={search}
            value="Input"
            className="inputField"
          ></input>
          <img src={searchSvg} onClick={search} />
        </div>
      )}
      {props.empty && props.default && error && (
        <div className="inputContainer-error tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={search}
            className="inputField-error"
          ></input>
          <img src={!searchTerm ? errorSvg : searchSvg} onClick={search} />
        </div>
      )}
      {props.placeholder && props.default && error && (
        <div className="inputContainer-error tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={search}
            placeholder="Enter valid term"
            className="inputField-error"
          ></input>
          <img src={!searchTerm ? errorSvg : searchSvg} onClick={search} />
        </div>
      )}
      {props.filled && props.default && error && (
        <div className="inputContainer-error tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={search}
            value="Input"
            className="inputField-error"
          ></input>
          <img src={!searchTerm ? errorSvg : searchSvg} onClick={search} />
        </div>
      )}
    </>
  );
}

export default Text;
