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
  chosenChoices: string[];
  setChosenChoices: React.Dispatch<React.SetStateAction<string[]>>;
  correctAnswers: string[];
  checkAnswers: React.MouseEventHandler<HTMLButtonElement>;
  shuffle: any;
}

const Context = createContext<IContext | null>(null);

function ContextProvider({ children }: IContextProvider) {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [isQuestionsReady, setIsQuestionsReady] = useState<boolean>(false);

  const [data, setData] = useState<Array<IData>>([]);
  const [chosenChoices, setChosenChoices] = useState(["", "", "", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  function handleDifficulty(event: React.MouseEvent<HTMLButtonElement>): void {
    setDifficulty(event.currentTarget.value);
  }

  function startQuiz() {
    if (difficulty) {
      setIsQuestionsReady(true);
    }
  }

  // to prevent displaying correct answer at last index
  function shuffle(arr: string[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function checkAnswers(e: any) {
    document.querySelectorAll(".choice").forEach((choice) => {
      choice.classList.add("text-opacity-50");
    });

    chosenChoices.forEach((choice: string) => {
      document.getElementById(`${choice}`)?.classList.remove("bg-secondary_bg");
      document.getElementById(`${choice}`)?.classList.add("bg-wrong_answer_bg");
    });

    correctAnswers.forEach((answer: string) => {
      document
        .getElementById(`${answer}`)
        ?.classList.add("bg-correct_answer_bg");
      document.getElementById(`${answer}`)?.classList.remove("text-opacity-50");
    });
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
        chosenChoices,
        setChosenChoices,
        correctAnswers,
        checkAnswers,
        shuffle,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };

//replace i bir function yap tekrarlanabilir olsun
