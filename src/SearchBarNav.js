import "./styles.css";
import React, { useState } from "react";
import Text from "./Text";
// import { useResultsUpdate } from "./ResultsContext";

export default function SearchBarNav() {
  //const [error, setError] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="searchbar__nav">
      <Text placeholder={true} default={true} />
    </div>
  );
}
