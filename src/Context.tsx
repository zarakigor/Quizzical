import React, { useState, useEffect, createContext } from "react";

interface IContextProvider {
  children: React.ReactNode;
}
export interface IData {
  index: number;
  question: string;
  correct_answer: string | number;
  choices: string[];
}

interface IContext {
  difficulty: string | null;
  isQuestionsReady: boolean;
  handleDifficulty: (event: React.MouseEvent<HTMLButtonElement>) => void;
  startQuiz: React.MouseEventHandler<HTMLButtonElement> | undefined;
  data: Array<IData>;
  endGame: boolean;
  chosenChoices: string[];
  setChosenChoices: React.Dispatch<React.SetStateAction<string[]>>;
  correctAnswers: string[];
  checkAnswers: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

// {} değil sanırım
// const Context = createContext({} as IContext);
const Context = createContext<IContext | null>(null);

function ContextProvider({ children }: IContextProvider) {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [isQuestionsReady, setIsQuestionsReady] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);

  const [data, setData] = useState<Array<IData>>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [chosenChoices, setChosenChoices] = useState(["", "", "", "", ""]);

  function handleDifficulty(event: React.MouseEvent<HTMLButtonElement>): void {
    console.log(event.currentTarget.value);
    setDifficulty(event.currentTarget.value);
  }

  function startQuiz() {
    if (difficulty) {
      setIsQuestionsReady(true);
      console.log(data);
      //console.log(data[0].incorrect_answers);
    }
  }

  function checkAnswers() {
    //loop ile buttonları renklendir
    //document.getElementsByClassName("1")[0].classList.add("bg-green-500");
    console.log(chosenChoices[0]);
    console.log(correctAnswers);
  }

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        let arrayOfQuestions = [];
        let arrayOfCorrectAnswers = [];

        for (let i = 0; i < 5; i++) {
          let questionPackage: {
            index: number;
            question: string;
            correct_answer: string;
            choices: string[];
          } = {
            index: 0,
            question: data.results[i]?.question
              .replace(/&#039;/g, "'")
              .replace(/&quot;/g, '"')
              .replace(/&ldquo;/g, "«")
              .replace(/&rdquo;/g, "»"),
            correct_answer: data.results[i]?.correct_answer,
            choices: [
              ...data.results[i]?.incorrect_answers,
              data.results[i]?.correct_answer,
            ],
          };
          arrayOfQuestions.push(questionPackage);
          arrayOfCorrectAnswers.push(data.results[i].correct_answer);
        }
        setData(arrayOfQuestions);
        setCorrectAnswers(arrayOfCorrectAnswers);
      });
  }, [difficulty]);

  return (
    <Context.Provider
      value={{
        difficulty,
        handleDifficulty,
        isQuestionsReady,
        startQuiz,
        data,
        endGame,
        chosenChoices,
        setChosenChoices,
        correctAnswers,
        checkAnswers,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };

//replace i bir function yap tekrarlanabilir olsun
