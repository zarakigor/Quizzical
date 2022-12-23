import React, { useState, useEffect, createContext } from "react";

interface IProps {
  children: React.ReactNode;
}

interface IContext {
  difficulty: string | null;
  handleDifficulty: any; // any yi değiştir
}

// {} değil sanırım
const Context = createContext<IContext | null>(null);

function ContextProvider({ children }: IProps) {
  const [difficulty, setDifficulty] = useState(null);

  function handleDifficulty() {
    console.log("button çalışıyor");
  }

  return (
    <Context.Provider value={{ difficulty, handleDifficulty }}>
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };

// interface IProps {
//   difficulty: string;
// }

// const Context = createContext<IProps | null>(null);

// function ContextProvider({ children }) {
//   const [difficulty, setDifficulty] = useState<string>("");
//   return (
//     <Context.Provider
//       value={{
//         difficulty,
//       }}
//     ></Context.Provider>
//   );
// }

// export { ContextProvider, Context };
