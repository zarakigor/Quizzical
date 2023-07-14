import { useContext } from "react";
import { Context, IData } from "./Context";
import { nanoid } from "nanoid";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Endgame from "./components/Endgame";

function App() {
  const AppContext = useContext(Context);

  const QuizElements = AppContext?.data.map((element: IData, index) => (
    <Quiz
      key={nanoid()}
      index={index}
      question={element.question}
      choices={AppContext.shuffle(element.choices)}
      correct_answer={element.correct_answer}
    />
  ));

  return (
    <div className={""}>
      {AppContext?.IsQuizStarted ? (
        <div className={"flex flex-col mt-10 mx-10"}>
          {QuizElements}

          <Endgame />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
