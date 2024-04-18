import React from "react";

import { useNavigate } from "react-router-dom";
export default function Home() {
  const nav = useNavigate();
  const HandleClick = () => {
    nav("/QuizPage"); //navigate to quiz page
  };
  return (
    <div className="w-full h-full flex justify-center items-center  gap-x-4 bg-black/50 before:contents-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0  before:bg-[url('./images/Bg.webp')] before:z-[-10] before:bg-center before:bg-cover before:bg-no-repeat ">
      <div className="border-2 p-2 rounded-xl flex gap-x-4 hover:bg-black/40  hover:border-black/10 transition-all duration-300 hover:drop-shadow-[0_0_0.4rem_#fff]" onClick={HandleClick}>
        <button className="  text-white font-['Ubuntu'] text-3xl   ">
          Start Quiz
        </button>
        <i className="fa-solid fa-play text-green-500 text-3xl"></i>
      </div>
    </div>
  );
}
