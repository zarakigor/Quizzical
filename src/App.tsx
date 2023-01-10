import { useContext } from "react";
import { Context } from "./Context";
import Login from "./components/Login";
import Questions from "./components/Questions";

function App() {
  const AppContext = useContext(Context);

  return (
    <div className={""}>
      {AppContext?.isQuestionsReady ? <Questions /> : <Login />}
    </div>
  );
}

export default App;

// https://opentdb.com/api.php?amount=5&difficulty=medium
