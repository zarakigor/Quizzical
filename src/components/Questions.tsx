import { useContext } from "react";
import { Context, IData } from "../Context";
import { nanoid } from "nanoid";

function Questions() {
  const AppContext = useContext(Context);

  return (
    <>
      {AppContext?.data.map((element: IData) => {
        return (
          <div key={nanoid()}>
            <p> {element.question}</p>
            <div>
              {element.options!.map((option) => {
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
