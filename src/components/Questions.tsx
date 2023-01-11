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
    <div className={"mt-10 mx-10"}>
      {AppContext?.data.map((element: IData) => {
        return (
          <div key={nanoid()} className={"text-primary"}>
            <p className={"font-karla font-bold "}>{element.question}</p>
            <div>
              {shuffle(element.options!).map((option) => {
                return (
                  <button
                    key={nanoid()}
                    className={
                      "font-inter font-medium text-xs border border-primary px-2 py-1 rounded-lg mt-3 mr-3"
                    }
                    value={option}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <hr className={"text-secondary_bg my-4"}></hr>
          </div>
        );
      })}
    </div>
  );
}

export default Questions;

// mr3 button daki , onu flexe gride bağlamaya çalış
