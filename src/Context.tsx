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

  const [data, setData] = useState<any[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  // const [data, setData] = useState({
  //   question: "",
  //   answers: [],
  //   correct_answer: "",
  // });

  function handleDifficulty(event: React.MouseEvent<HTMLButtonElement>): void {
    console.log(event.currentTarget.value);
    setDifficulty(event.currentTarget.value);
  }

  function startQuiz() {
    if (difficulty) {
      setIsQuestionsReady(true);
      filterCorrectAnswers();
      //console.log(data[0]);
    }
  }
  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        //setData(data.results);

        // console.log(data.results[0].correct_answer);
        // console.log(data.results[0]?.incorrect_answers);
        // for (let i = 0; i < 5; i++) {
        //   console.log(data.results[i]);
        // }
        setData(data.results);
      });
  }, [difficulty]);

  function filterCorrectAnswers() {
    setCorrectAnswers(data.map((x) => x.correct_answer));
  }
  console.log(correctAnswers);

  return (
    <Context.Provider
      value={{ difficulty, handleDifficulty, isQuestionsReady, startQuiz }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
