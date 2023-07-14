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
  handleDifficulty: (event: {
    currentTarget: { value: React.SetStateAction<string | null> };
  }) => void;
  category: string | null;
  handleCategory: (event: {
    currentTarget: { value: React.SetStateAction<string | null> };
  }) => void;
  areQuestionsReady: boolean;
  startQuiz: React.MouseEventHandler<HTMLButtonElement> | undefined;
  IsQuizStarted: boolean;
  restartTheGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
  data: Array<IData>;
  chosenChoices: string[];
  setChosenChoices: React.Dispatch<React.SetStateAction<string[]>>;
  correctAnswers: string[];
  checkAnswers: React.MouseEventHandler<HTMLButtonElement>;
  shuffle: (arr: string[]) => string[];
}

const Context = createContext<IContext | null>(null);

function ContextProvider({ children }: IContextProvider) {
  const [difficulty, setDifficulty] = useState<string | null>("");
  const [category, setCategory] = useState<string | null>("");
  const [areQuestionsReady, setAreQuestionsReady] = useState<boolean>(false);
  const [IsQuizStarted, setIsQuizStarted] = useState<boolean>(false);

  const [data, setData] = useState<Array<IData>>([]);
  const [chosenChoices, setChosenChoices] = useState(["", "", "", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  function handleDifficulty(event: {
    currentTarget: { value: React.SetStateAction<string | null> };
  }) {
    setDifficulty(event.currentTarget.value);
    setAreQuestionsReady(true);
  }

  function handleCategory(event: {
    currentTarget: { value: React.SetStateAction<string | null> };
  }) {
    setCategory(event.currentTarget.value);
    setAreQuestionsReady(true);
  }

  function restartTheGame() {
    setCategory("");
    setDifficulty("");
    setAreQuestionsReady(false);
    setIsQuizStarted(false);
  }

  function startQuiz() {
    setIsQuizStarted(true);
  }

  // to prevent displaying correct answer at last index
  function shuffle(arr: string[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function checkAnswers(e: any): void {
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
      `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
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
  }, [category, difficulty]);

  return (
    <Context.Provider
      value={{
        difficulty,
        handleDifficulty,
        category,
        handleCategory,
        areQuestionsReady,
        startQuiz,
        IsQuizStarted,
        restartTheGame,
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
