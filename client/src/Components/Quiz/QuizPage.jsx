import React, { useEffect, useRef, useState } from "react";
import QuizOption from "./QuizOption";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import links from "../../../apikey";

export default function QuizPage() {
  const nav = useNavigate(); //navigator
  const [selected, setselected] = useState(5); //option selection state,intial value is 5 that no choosen currently
  const [violated, setviolated] = useState(false); //if user change tabs
  const [fullScreen, setfullScreen] = useState(false); //state of full screen mode
  const [Qno, setQno] = useState(Number(localStorage.getItem("current")) || 1); //Question Number
  const fullScreenRef = useRef(); //Reference of ultimate parent of page
  const [Data, setData] = useState(null); // Current Data Quesition and options
  const FetchQuestion = async () => {
    //Fetch the Question according to Qno from backend
    const url = `${links.QuesLink}?Qno=${Qno}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.success) {
      //successfully
      setData(result.data); //set data to state
      //load already saved data if present from localStorage, we can use redux when it is scaled
      const savedData = JSON.parse(localStorage.getItem("SavedData"));
      if (!savedData || savedData[Qno - 1] === null) {
        //if no data is there
        return;
      }
      //set existed data like selection, violation in states
      setselected(Math.abs(savedData[Qno - 1])); //if it is negative
      setviolated(savedData[Qno - 1] < 0);
    }
  };

  const HandleNext = () => {
    //Next Question
    if (Qno === 10) {
      //After last Question
      localStorage.setItem("Completed", true); //denotes you have completed the quiz
      nav("/result");
      return;
    }
    if (selected === 5 && !violated) {
      //if no option is selected
      alert("You can't skip any Question");
      return;
    }
    setselected(5); //revert back to initial stage
    localStorage.setItem("current", Qno + 1); //storing current qno
    setviolated(false); //setting false to violation
    setQno((prev) => prev + 1); //Qno to Qno+1
  };
  const HandleBack = () => {
    //Going back
    localStorage.setItem("current", Qno - 1);
    setselected(5);
    setviolated(false);
    setQno((prev) => prev - 1);
  };
  const handleSave = () => {
    //Save current user Answer Arr to localStorage with taking care of violation
    if (selected !== 5 || violated) {
      //if there is no option selected or user have done violation(even option is not selected, still violation will be stored as -5)
      let savedData = new Array(10);
      let ExistedData = localStorage.getItem("SavedData");
      if (ExistedData) savedData = [...JSON.parse(ExistedData)];

      //if question is violated then save it as negative

      savedData[Qno - 1] = violated ? -selected : selected;
      localStorage.setItem("SavedData", JSON.stringify(savedData));
    }
  };
  const handleFullScreen = async () => {
    //enable full screen if it i not, then showing modal for enable button
    const isFullScreen = document.fullscreenElement; //return null or an element
    if (!isFullScreen && fullScreenRef.current.requestFullscreen) {
      //if fullscreen is not then enable it
      setfullScreen(true);
      fullScreenRef.current.requestFullscreen();
    }
  };
  const changeScreenState = () => {
    //on full screen mode change
    setfullScreen(!!document.fullscreenElement);
  };
  const HandleToggleViolation = () => {
    //if user change the tab
    //i can make the option value to its negative that denotes it is violated
    setviolated(true);
  };
  useEffect(() => {
    //fetch Question on every Qno change
    FetchQuestion();
  }, [Qno]);
  useEffect(() => {
    // do save on every selection, Qno , Violation change
    handleSave();
  }, [selected, Qno, violated]);

  useEffect(() => {
    //adding fullscreenChange event - call every time when full screen mode is change by user
    document.addEventListener("fullscreenchange", changeScreenState);
    //adding changing tab event called blur- invoked every time the page become unfocused
    window.addEventListener("blur", HandleToggleViolation);
    return () => {
      document.removeEventListener("fullscreenchange", changeScreenState);
      window.removeEventListener("blur", HandleToggleViolation);
    };
  }, []);
  return (
    <div
      ref={fullScreenRef}
      className='w-full h-full flex justify-center items-center bg-black/60 before:contents-[""] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:z-[-10]  before:bg-[url("./images/Bg2.avif")] before:bg-no-repeat before:bg-center before:bg-cover'
    >
      {Data && (
        <div className="w-full md:w-3/4 h-full flex items-center flex-col gap-y-4 p-4 overflow-y-auto scrollbar">
          {/* Question */}
          <p className='text-3xl md:text-5xl first-letter:text-red-400 font-["Ubuntu"] text-center text-white'>
            Question-
            <span className="text-emerald-400 font-bold text-5xl md:text-7xl">
              {Qno}
            </span>
          </p>
          {/* Showing Violated Question tag */}
          <div
            className={`${
              violated ? "block" : "hidden"
            } w-fit  text-sm md:text-lg p-2  rounded-xl bg-red-500 text-white`}
          >
            Rules Violation here- Toggling Tabs
          </div>
          {/* Question detail */}
          <div className="w-full flex-1 text-white p-4">
            <p className="my-4 text-xl md:text-3xl font-['BerlinSansFB'] font-bold p-3 py-4 bg-rose-500/40 rounded-lg ">
              {Data.Question}
            </p>
            {/* Option container */}
            <div className="flex flex-col px-4 gap-y-3">
              {Data.Options.map((element, index) => {
                return (
                  <QuizOption
                    Selected={selected}
                    setselected={setselected}
                    key={index}
                    index={index}
                    element={element}
                    violated={violated}
                  />
                );
              })}
            </div>
          </div>
          {/* Next and Back buttons */}
          <div className="w-full h-[5rem]  items-center justify-between flex  p-4 ">
            <button
              className={`text-white text-sm md:text-xl p-2 border-2 hover:bg-red-600 hover:border-transparent duration-200 transition-all rounded-lg ${
                Qno === 1 ? "invisible" : "visible"
              }`}
              disabled={Qno === 1}
              onClick={HandleBack}
            >
              Back
            </button>

            <button
              className="text-white text-sm md:text-xl p-2 border-2 hover:bg-green-600 hover:border-transparent duration-200 transition-all rounded-lg "
              onClick={HandleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* showing modal to request user to enable full screen mode  */}
      {!fullScreen && <Modal handleClick={handleFullScreen} />}
    </div>
  );
}
