import { useContext } from "react";
import { Context, IData } from "../Context";
import { nanoid } from "nanoid";

function Quiz(props: IData) {
  const AppContext = useContext(Context);

  function updateChosenChoices(choice: string) {
    let arr: string[] | undefined = AppContext?.chosenChoices;
    arr![props.index] = choice;
    AppContext?.setChosenChoices(arr!);
  }

  function handleClickChoices(e: any) {
    for (let i = 0; i < 4; i++) {
      let element = document.getElementsByClassName(`${props.index}`)[i];
      element.classList.remove("bg-secondary_bg", "border-transparent");
    }

    updateChosenChoices(e.target.value);
    e.target.classList.add("bg-secondary_bg", "border-transparent");
  }

  return (
    <div>
      <p className={"text-primary font-karla font-bold "}>{props.question}</p>
      <div>
        {props.choices.map((choice) => {
          return (
            <button
              key={nanoid()}
              id={choice}
              className={`${props.index} choice text-primary font-inter font-medium text-xs border border-primary  px-2 py-1 rounded-lg mt-3 mr-3`}
              onClick={(e) => handleClickChoices(e)}
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
