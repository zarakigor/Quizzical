import { useState } from "react";
import useFetch from "./useFetch";

import "./App.css";
// https://opentdb.com/api.php?amount=5&difficulty=medium

function App() {
  const [difficulty, setDifficulty] = useState<string>("medium");
  useFetch({ diff: difficulty });
  return <div>asd</div>;
}

export default App;
