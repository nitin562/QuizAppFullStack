const { TryCatchWrapper } = require("../Helper/TryCatchWrapper");
const fs=require("fs")
const ApiError = require("../Helper/ApiError");

const ApiResponse = require("../Helper/ApiResponse");

const APIResponse = require("../Helper/ApiResponse");

// Fetch Questions and Answers from jsonFile
const ExtractQuestions=async()=>{
  try {
    const data=await fs.promises.readFile("./QuizData.json","utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
    throw new Error("Server is Down")
  }
}
const ExtractAnswers=async()=>{
  try {
    const data=await fs.promises.readFile("./Answer.json","utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
    throw new Error("Server is Down")
  }
}




const GetQuestion = TryCatchWrapper(async(req, res) => {
  const QuestionNumber = req.query?.Qno;
  if (!QuestionNumber) { //if Qno is not found
    return res.send(new ApiError(400, "No Question Number", "No-Qno"));
  }
  if (!(QuestionNumber > 0 && QuestionNumber < 11)) {//invalid Qno
    return res.send( 
      new ApiError(400, "Invalid Question Number", "Invalid-Qno")
    );
  }
  const QuizArr=await ExtractQuestions()
  const Question = QuizArr[QuestionNumber - 1]; //get Question from array via Qno-1 and return it as response
  
  return res.send(new ApiResponse(200, Question, "Question", true));
});

const GetAnswers = TryCatchWrapper(async(req, res) => {
  const Answers=await ExtractAnswers()
  //return Answer of corresponding question at index Qno-1 from Answers array
  return res.send(
    new ApiResponse(200, Answers, "Answer", true)
  );
});

module.exports = { GetQuestion, GetAnswers };
