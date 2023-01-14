import { useContext, useState } from "react";
import { Context, IData } from "../Context";
import { nanoid } from "nanoid";

function Questions() {
  const AppContext = useContext(Context);

  const [chosenChoices, setChosenChoices] = useState(["", "", "", "", ""]);

  function handleChoices(index: number, choice: string) {
    //console.log(index);
    let arr = chosenChoices;
    arr[index] = choice;
    setChosenChoices(arr);
    console.log(chosenChoices);
  }

  // correct answer in data is the last array element
  function shuffle(arr: string[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }
  return (
    <div className={"mt-10 mx-10"}>
      {AppContext?.data.map((element: IData, index) => {
        return (
          <div key={nanoid()} className={"text-primary"}>
            <p className={"font-karla font-bold "}>{element.question}</p>
            <div>
              {shuffle(element.choices!).map((choice) => {
                //console.log(index, choice);
                return (
                  <button
                    key={nanoid()}
                    onClick={() => handleChoices(index, choice)}
                    className={`font-inter font-medium text-xs border border-primary px-2 py-1 rounded-lg mt-3 mr-3 ${
                      AppContext?.data[index].correct_answer === choice
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                    value={choice}
                  >
                    {choice}
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
