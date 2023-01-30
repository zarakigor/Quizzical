import { useContext } from "react";
import { Context, IData } from "../Context";
import { nanoid } from "nanoid";

// any yi kaldır
function Quiz(props: IData) {
  const AppContext = useContext(Context);

  function shuffle(arr: string[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function handleChosenChoices(choice: string) {
    let arr: string[] | undefined = AppContext?.chosenChoices;
    arr![props.index] = choice;
    AppContext?.setChosenChoices(arr!);
  }

  function handleClick(e: any) {
    //console.log(e.target.value);
    console.log(props.index);
    console.log(props.correct_answer);

    for (let i = 0; i < 4; i++) {
      let element = document.getElementsByClassName(`${props.index}`)[i];
      element.classList.remove("bg-secondary_bg", "border-transparent");
    }

    handleChosenChoices(e.target.value);
    e.target.classList.add("bg-secondary_bg", "border-transparent");
    console.log(AppContext?.chosenChoices);
  }

  return (
    <div>
      <p className={"text-primary font-karla font-bold "}>{props.question}</p>
      <div>
        {shuffle(props.choices).map((choice) => {
          return (
            <button
              key={nanoid()}
              className={`${props.index} text-primary font-inter font-medium text-xs border border-primary  px-2 py-1 rounded-lg mt-3 mr-3`}
              onClick={(e) => handleClick(e)}
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
