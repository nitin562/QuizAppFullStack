import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Result() {
  // following states will store the value of correctness, incorrectness, violation,marks score.
  const [Correct, setcorrect] = useState(0)
  const [InCorrect, setinCorrect] = useState(0)
  const [Violation, setViolation] = useState(0)
  const [Marks, setMarks] = useState(0)
  const nav=useNavigate() //navigator
  const FetchAnswers=async()=>{ //fetch an array of answers from server
    const url="http://localhost:8000/api/quiz/Answer"
    const response=await fetch(url)
    const result=await response.json()
    if(result.success){
      CalculateStats(result.data[0].Answers) //evaluate user answer with correct answers
    }else{
      alert(result.message)
    }
  }
  const CalculateStats=(AnswerArr)=>{
    const userArr=JSON.parse(localStorage.getItem("SavedData"))//get user answer array
    //store correct,violate, incorrect score
    let Violate=0
    let correct=0
    let incorrect=0
    userArr.forEach((element,index)=>{
  
      if(element<0){//if element is negative then it will be a violation
        //violate
        Violate++;
      }
      else if(element===Number.parseInt(AnswerArr[index],36)-10){ //base 36 is used to convert Char to Number, A-10 B-11...
        // if element is correct then increment
        correct++;
      }
     
      else{
        //decrement
        incorrect++;
      }
    })
    //for percentage = x*100/10==x*10
    let marks=((correct)-(Violate))*10
// Modifying states
    setcorrect(correct*10)
    setinCorrect(incorrect*10)
    setViolation(Violate*10)
    setMarks(marks<0?0:marks)
  }
  const HandleExit=()=>{//on exit, clearout the localstorage
    localStorage.clear()
    nav("/")

  }
  useEffect(()=>{
    //if there is completed tag in localstorge then you are authorized to see result as you have not completed the quiz
    if(!localStorage.getItem("Completed")){
      nav("/")
    }
    FetchAnswers()//fetch answers
  },[])
  return (
    <div className='w-full h-full flex justify-center items-center bg-black/50 before:contents-[""] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:z-[-10]  before:bg-[url("./images/ResultBg.png")] before:bg-no-repeat before:bg-center before:bg-cover p-2 '>
      {/* Quiz Result container */}
      <div className="w-full md:w-3/4 h-full backdrop-blur-lg backdrop-brightness-50 scrollbar p-2 md:p-4">
        <p className='font-["Ubuntu"] text-center my-8 text-7xl text-teal-400 drop-shadow-[0_0_0.2rem_currentColor]'>
          Quiz Result
        </p>
        <div className="w-full p-2 md:p-4 min-h-[9rem] md:min-h-[14rem] flex justify-center items-center gap-x-[8rem] gap-y-8 flex-wrap">
          {/* Correctness */}
          <div className={`h-[15rem] border-2 w-[15rem] p-2 rounded-full flex flex-col relative justify-center items-center overflow-hidden`}>
            <div className={`w-full absolute bottom-0 bg-green-500/50 `} style={{height:`${Correct}%`}}></div>
            <p className="text-5xl drop-shadow-[0_0_0.3rem_currentColor] text-green-400">
              {Correct}%
            </p>
            <p className="text-xl font-thin text-white">Correctness</p>
            <p className="text-white flex items-center text-md my-2">
              Marking:
              <span className="text-xl mx-3 drop-shadow-[0_0_0.4rem_#fff]">
                1
              </span>
            </p>
          </div>
          {/* Incorrectness */}
          <div className={`h-[15rem] border-2 w-[15rem] p-2 rounded-full flex flex-col relative justify-center items-center overflow-hidden`}>
            <div className={`w-full absolute bottom-0 bg-red-500/50 `} style={{height:`${InCorrect}%`}}></div>
            <p className="text-5xl drop-shadow-[0_0_0.3rem_currentColor] text-red-300">
              {InCorrect}%
            </p>
            <p className="text-xl font-thin text-white">Incorrectness</p>
            <p className="text-white flex items-center text-md my-2">
              Marking:
              <span className="text-xl mx-3 drop-shadow-[0_0_0.4rem_#fff]">
                0
              </span>
            </p>
            {/* Violation */}
          </div>
          <div className={`h-[15rem] border-2 w-[15rem] p-2 rounded-full flex flex-col relative justify-center items-center overflow-hidden`}>
            <div className={`w-full absolute bottom-0 bg-gray-500/50 `} style={{height:`${Violation}%`}}></div>
            <p className="text-5xl drop-shadow-[0_0_0.3rem_currentColor] text-stone-400">
              {Violation}%
            </p>
            <p className="text-xl font-thin text-white">Violation</p>
            <p className="text-white flex items-center text-md my-2">
              Marking:
              <span className="text-xl mx-3 drop-shadow-[0_0_0.4rem_#fff]">
                -1
              </span>
            </p>
          </div>
          {/* Marks */}
          <div className={`h-[15rem] border-2 w-[15rem] p-2 rounded-full flex flex-col relative justify-center items-center overflow-hidden`}>
            <div className={`w-full absolute bottom-0 bg-blue-500/50 `} style={{height:`${Marks}%`}}></div>
            <p className="text-5xl drop-shadow-[0_0_0.3rem_currentColor] text-blue-400">
              {Marks}%
            </p>
            <p className="text-xl font-thin text-white">Total Score</p>
            <p className="text-white flex items-center text-xl my-2">
              Marks:
              <span className="text-xl mx-3 drop-shadow-[0_0_0.4rem_#fff]">
                {Marks/10}
              </span>
            </p>
          </div>
        </div>
        {/* Exit btn */}
        <button className="text-xl text-white p-2 bg-blue-500 rounded-lg float-right mx-5 hover:scale-125 transition-all duration-200" onClick={HandleExit}>Exit</button>
      </div>
    </div>
  );
}
