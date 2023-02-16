import { useContext, useState } from "react";
import { Context } from "../Context";

function Score() {
  const AppContext = useContext(Context);
  const [isGameOver, setisGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  function countCorrectAnswers() {
    let score = 0;
    for (let i = 0; i < 5; i++) {
      if (AppContext?.chosenChoices[i] === AppContext?.correctAnswers[i]) {
        score++;
      }
    }
    setScore(score);
  }

  function finishGame() {
    setisGameOver(!isGameOver);
    countCorrectAnswers();
  }

  return (
    <div>
      <p>{isGameOver ? "dolu" : "boş"}</p>
      <p>{score}</p>
      <button
        className={
          "text-secondary text-sm font-semibold bg-primary_bg py-3 px-5 rounded-xl self-center"
        }
        onClick={(e) => {
          finishGame();
          AppContext?.checkAnswers(e);
        }}
      >
        Check answers
      </button>
    </div>
  );
}

export default Score;
