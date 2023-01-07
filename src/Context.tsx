import React, { useState, useEffect, createContext } from "react";

interface IContextProvider {
  children: React.ReactNode;
}

interface IContext {
  difficulty: string | null;
  isQuestionsReady: boolean;
  handleDifficulty: (event: React.MouseEvent<HTMLButtonElement>) => void;
  startQuiz: () => void;
}

// {} değil sanırım
// const Context = createContext({} as IContext);
const Context = createContext<IContext | null>(null);

function ContextProvider({ children }: IContextProvider) {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [isQuestionsReady, setIsQuestionsReady] = useState<boolean>(false);

  const [data, setData] = useState<object[]>([]);
  //const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  function handleDifficulty(event: React.MouseEvent<HTMLButtonElement>): void {
    console.log(event.currentTarget.value);
    setDifficulty(event.currentTarget.value);
  }

  function startQuiz() {
    if (difficulty) {
      setIsQuestionsReady(true);
      console.log(data[0]);
      //console.log(data[0].incorrect_answers);
    }
  }
  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        let arrayOfQuestions = [];

        for (let i = 0; i < 5; i++) {
          let questionPackage: {
            question: string;
            correct_answer: string;
            options: string[];
          } = {
            question: data.results[i]?.question,
            correct_answer: data.results[i]?.correct_answer,
            options: [
              ...data.results[i]?.incorrect_answers,
              data.results[i]?.correct_answer,
            ],
          };
          arrayOfQuestions.push(questionPackage);
        }
        setData(arrayOfQuestions);
      });
  }, [difficulty]);

  return (
    <Context.Provider
      value={{ difficulty, handleDifficulty, isQuestionsReady, startQuiz }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
