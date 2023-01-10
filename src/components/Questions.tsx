import { useContext } from "react";
import { Context, IData } from "../Context";
import { nanoid } from "nanoid";

function Questions() {
  const AppContext = useContext(Context);

  // correct answer in data is the last array element
  function shuffle(arr: string[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }
  return (
    <>
      {AppContext?.data.map((element: IData) => {
        return (
          <div key={nanoid()}>
            <p> {element.question}</p>
            <div>
              {shuffle(element.options!).map((option) => {
                return <p key={nanoid()}>{option}</p>;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Questions;
