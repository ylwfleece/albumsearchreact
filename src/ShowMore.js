import "./styles.css";
import { useResults, useResultsUpdate } from "./ResultsContext";

export default function ShowMore() {
  const results = useResults();
  const updateResults = useResultsUpdate();
  const showMore = () => {
    updateResults({ ...results, shown: (results.shown += 20) });
  };
  return (
    <button className="showmore" onClick={showMore}>
      show more
    </button>
  );
}
