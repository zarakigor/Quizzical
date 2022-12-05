import React from "react";

function Login() {
  return (
    <div className={"text-primary flex flex-col items-center"}>
      <h1 className={"font-karla font-bold text-3xl"}>Quizzical</h1>
      <h3 className={"font-inter mt-2 mb-7"}>Some description if needed</h3>
      <button
        className={
          "text-secondary font-medium bg-primary_bg py-4 px-14 rounded-2xl"
        }
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Login;
