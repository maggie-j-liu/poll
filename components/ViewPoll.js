import ViewQuestion from "./ViewQuestion";
import { useState } from "react";
const ViewPoll = ({ poll, creator, questions }) => {
  const [questionNum, setQuestionNum] = useState(0);
  const back = () => {
    setQuestionNum((q) => q - 1);
  };
  const next = () => [setQuestionNum((q) => q + 1)];
  return (
    <div>
      <h1>{poll.title}</h1>
      <h2>by {creator}</h2>
      <ViewQuestion question={questions[questionNum]} idx={questionNum} />
      <button
        className="text-white font-semibold bg-blue-500 px-4 py-2 disabled:saturate-50 disabled:cursor-not-allowed"
        disabled={questionNum === 0}
        onClick={() => back()}
        type="button"
      >
        Back
      </button>
      <button
        className="text-white font-semibold bg-blue-500 px-4 py-2 disabled:saturate-50 disabled:cursor-not-allowed"
        disabled={questionNum === questions.length - 1}
        onClick={() => next()}
        type="button"
      >
        Next
      </button>
    </div>
  );
};

export default ViewPoll;
