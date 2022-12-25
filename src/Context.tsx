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

  function handleDifficulty(event: React.MouseEvent<HTMLButtonElement>): void {
    console.log(event.currentTarget.value);
    setDifficulty(event.currentTarget.value);
  }

  function startQuiz() {
    if (difficulty) {
      setIsQuestionsReady(true);
    }
  }

  return (
    <Context.Provider
      value={{ difficulty, handleDifficulty, isQuestionsReady, startQuiz }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
