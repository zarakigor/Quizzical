import { useContext, useState } from "react";
import { Context, IData } from "../Context";
import { nanoid } from "nanoid";

// any yi kaldır
function Quiz(props: IData) {
  const AppContext = useContext(Context);

  function shuffle(arr: string[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function handleChosens(choice: string, index: number) {
    let arr: string[] | undefined = AppContext?.chosenChoices;
    arr![index] = choice;
    AppContext?.setChosenChoices(arr!);
  }

  function handleClick(e: any, index: number) {
    //console.log(e.target.value);
    console.log(props.index);

    for (let i = 0; i < 4; i++) {
      let element = document.getElementsByClassName(`${index}`)[i];
      element.classList.remove("bg-green-500");
    }

    handleChosens(e.target.value, index);
    e.target.classList.add("bg-green-500");
    console.log(AppContext?.chosenChoices);
  }

  return (
    <div className={"text-primary"}>
      <p className={"font-karla font-bold "}>{props.question}</p>
      <div>
        {shuffle(props.choices).map((choice) => {
          return (
            <button
              key={nanoid()}
              className={`${props.index} font-inter font-medium text-xs border border-primary px-2 py-1 rounded-lg mt-3 mr-3`}
              onClick={(e) => handleClick(e, props.index!)}
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
}

export default Quiz;
