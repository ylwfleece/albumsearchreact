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
      //console.log(inputRef);
      if (searchTerm !== "") {
        setError(false);
        updateResults({ loading: true });
        getResults(searchTerm).then((results) =>
          updateResults({ results: results.results, shown: 20, loaded: true })
        );
      } else {
        //alert("must input valid string");
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
      {props.placeholder && !searchTerm && !error && props.default && (
        <div className="inputContainer tableRow">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={search}
            placeholder={"Search..."}
            className="inputField"
          ></input>
          <img src={searchSvg} onClick={search} />
        </div>
      )}
      {props.placeholder && searchTerm && !error && props.default && (
        <div className="inputContainer tableRow">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={search}
            value={searchTerm}
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
              // setError(false);
              //toggleImg();
            }}
            onKeyUp={search}
            className="inputField-error"
          ></input>
          <img src={!searchTerm ? errorSvg : searchSvg} />
        </div>
      )}
      {props.placeholder && props.default && error && (
        <div className="inputContainer-error tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setError(false);
              //toggleImg();
            }}
            onKeyUp={search}
            placeholder="Enter valid term"
            className="inputField-error"
          ></input>
          <img src={!searchTerm ? errorSvg : searchSvg} />
        </div>
      )}
      {props.filled && props.default && error && (
        <div className="inputContainer-error tableRow">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setError(false);
              //toggleImg();
            }}
            onKeyUp={search}
            value="Input"
            className="inputField-error"
          ></input>
          <img src={!searchTerm ? errorSvg : searchSvg} />
        </div>
      )}
    </>
  );
}

export default Text;
