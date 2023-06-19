import { useEffect, useState } from "react";
import useQuestionBank from "../../Hooks/useQuestionBank";
import Question from "../Question/Question";
import "../../App.css";
import "./Game.css";

export default function Game() {
  const { questionBank } = useQuestionBank();
  const [roundNumber, setRoundNumber] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [roundQuestions, setRoundQuestions] = useState([]);

  useEffect(() => {
    if (!questionBank || questionBank.length === 0) {
      return;
    }
    const currentRoundQuestions = questionBank.filter(
      (question) => question.bin_id === roundNumber
    );
    setRoundQuestions(currentRoundQuestions);
  }, [roundNumber]);

  useEffect(() => {
    if (questionIndex === roundQuestions.length - 1) {
      setRoundNumber((prev) => prev + 1);
      setQuestionIndex(0);
    }
  }, [questionIndex]);

  const handleClick = (e) => {
    const answer = e.currentTarget.id;
    const isScam = roundQuestions[questionIndex].is_scam;
    if ((isScam && answer === "scam") || (!isScam && answer === "not-scam")) {
      console.log("Correct!");
    } else {
      console.log("Wrong!");
    }
    setQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="App">
      <main className="Container">
        <div className="Scam-Display">
          <Question content={roundQuestions[questionIndex]?.content} />
        </div>
        <div className="Buttons-Container">
          <button className="Button Red" onClick={handleClick} id="scam">
            Scam
          </button>
          <button className="Button Green" onClick={handleClick} id="not-scam">
            Not a Scam
          </button>
        </div>
      </main>
    </div>
  );
}