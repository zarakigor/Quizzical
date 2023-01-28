import { useContext } from "react";
import { Context, IData } from "./Context";
import Login from "./components/Login";
import Questions from "./components/Questions";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

function App() {
  const AppContext = useContext(Context);

  const QuizElements = AppContext?.data.map((element: IData, index) => (
    <Quiz
      key={nanoid()}
      index={index}
      question={element.question}
      choices={element.choices}
      correct_answer={element.correct_answer}
    />
  ));

  return (
    <div className={""}>
      {AppContext?.isQuestionsReady ? (
        <div className={"mt-10 mx-10"}>{QuizElements}</div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

// https://opentdb.com/api.php?amount=5&difficulty=medium
