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
        <div className={"flex flex-col mt-10 mx-10"}>
          {QuizElements}
          <button
            className={
              "text-secondary text-sm font-semibold bg-primary_bg py-3 px-5 rounded-xl self-center"
            }
            onClick={AppContext.checkAnswers}
          >
            Check answers
          </button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

// https://opentdb.com/api.php?amount=5&difficulty=medium
