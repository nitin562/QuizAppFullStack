import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import QuizPage from "./Components/Quiz/QuizPage";
import Result from "./Components/Result/Result";
export default function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/QuizPage" element={<QuizPage />} />
        <Route path="/result" element={<Result />} />

      </Routes>
    </div>
  );
}
