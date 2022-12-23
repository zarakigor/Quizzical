import { useContext } from "react";
import { Context } from "./Context";
import Login from "./components/Login";
import Questions from "./components/Questions";
import useFetch from "./useFetch";

function App() {
  const AppContext = useContext(Context);

  // burayı değiştir çalışmıyor
  //const asd = useFetch({ difficulty: difficulty });

  console.log(useContext(Context));

  return (
    <div className={"flex justify-center items-center h-screen"}>
      {AppContext?.difficulty ? <Questions /> : <Login />}
    </div>
  );
}

export default App;

// https://opentdb.com/api.php?amount=5&difficulty=medium
