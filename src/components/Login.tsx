import { useContext } from "react";
import { Context } from "../Context";

function Login() {
  const AppContext = useContext(Context);
  return (
    <div
      className={
        "flex flex-col items-center justify-center h-screen text-primary"
      }
    >
      <h1 className={"font-karla font-bold text-3xl"}>Quizzical</h1>
      <h3 className={"font-inter mt-2 mb-7"}>burayi en sonda sil</h3>

      <select onChange={AppContext?.handleCategory}>
        <option value="">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musical &Theaters</option>
        <option value="14">Entertainment: Televison</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="29">Entertainment: Comics</option>
        <option value="31">Entertainment: Japanese Anime & Manga</option>
        <option value="32">Entertainment: Cartoon & Animations</option>
        <option value="17">Science & Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="30">Science: Gadgets</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
      </select>

      <div>
        <button
          className={`text-sm mx-1 border-primary border-2 rounded-2xl py-2 px-2 ${
            AppContext?.difficulty === "easy"
              ? "bg-primary_bg text-secondary border-transparent"
              : ""
          }`}
          onClick={AppContext?.handleDifficulty}
          value="easy"
        >
          Easy
        </button>
        <button
          className={`text-sm mx-1 border-primary border-2 rounded-2xl py-2 px-2 ${
            AppContext?.difficulty === "medium"
              ? "bg-primary_bg text-secondary border-transparent"
              : ""
          }`}
          onClick={AppContext?.handleDifficulty}
          value="medium"
        >
          Medium
        </button>
        <button
          className={`text-sm mx-1 border-primary border-2 rounded-2xl py-2 px-2 ${
            AppContext?.difficulty === "hard"
              ? "bg-primary_bg text-secondary border-transparent"
              : ""
          }`}
          onClick={AppContext?.handleDifficulty}
          value="hard"
        >
          Hard
        </button>
      </div>

      <button
        className={
          "text-secondary font-medium bg-primary_bg mt-4 py-4 px-14 rounded-2xl"
        }
        onClick={AppContext?.startQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Login;
