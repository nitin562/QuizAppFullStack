import React from "react";

export default function QuizOption({
  index,
  element,
  Selected,
  setselected,
  violated,
}) {
  // if user click on option then handleSelect will modify the selection state
  const HandleSelect = (e) => {
    if (violated) {
      //if question is already violated then no need to select new option as it will be meaning less
      return;
    }
    setselected(index);
  };

  return (
    <div
      onClick={HandleSelect}
      className={`w-full text-md md:text-xl  flex flex-row-reverse cursor-pointer border-b-2 gap-x-8 border-b-gray-400 justify-center md:justify-between  items-center gap-y-4 p-2 md:p-4 ${
        violated ? "bg-red-500/20" : ""
      } `}
    >
      {/* Choice detail */}
      <p
        className={`p-2 ${
          Selected === index
            ? "bg-blue-500/40 text-wrap text-white border-r-2"
            : ""
        } text-yellow-300 flex-1`}
      >
        {element}
      </p>
      {/* Checker circle */}
      <div
        className={`w-[1rem] h-[1rem] hidden md:block md:w-[2rem] md:h-[2rem] rounded-full ${
          Selected === index ? "bg-sky-500" : "bg-white"
        }`}
      />
    </div>
  );
}
