import "./styles.css";
import SearchBarNav from "./SearchBarNav";
import SearchBarPrompt from "./SearchBarPrompt";
import ResultsGrid from "./ResultsGrid";
import { ResultsProvider } from "./ResultsContext";

export default function App() {
  return (
    <ResultsProvider>
      <SearchBarNav />
      <SearchBarPrompt />
      <ResultsGrid />
    </ResultsProvider>
  );
}
