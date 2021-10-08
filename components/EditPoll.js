import { useState } from "react";
import EditQuestion from "./EditQuestion";
import { supabase } from "utils/supabaseClient";

const EditPoll = ({ poll }) => {
  const [title, setTitle] = useState(poll.title);
  const [questions, setQuestions] = useState(poll.questions);
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: [],
        creator_id: poll.creator_id,
        poll_id: poll.id,
      },
    ]);
  };
  const setQuestion = (newQuestion, idx) => {
    questions[idx] = newQuestion;
    setQuestions([...questions]);
  };
  const handleSave = async () => {
    const { error } = await supabase
      .from("questions")
      .upsert(questions, { returning: "minimal" });
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl px-8 sm:px-16 mx-auto py-16">
        <div className="flex justify-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-semibold border-gray-300 border-2 rounded-lg"
          />
        </div>
        <button
          onClick={() => handleAddQuestion()}
          className="bg-blue-500 text-white font-semibold text-xl px-4 py-2 rounded-lg shadow-md"
        >
          Add question
        </button>
        <button
          onClick={() => handleSave()}
          className="bg-blue-500 text-white font-semibold text-xl px-4 py-2 rounded-lg shadow-md"
        >
          Save
        </button>
        {questions.map((question, idx) => (
          <EditQuestion
            key={idx}
            question={question}
            idx={idx}
            setQuestion={setQuestion}
          />
        ))}
      </div>
    </div>
  );
};

export default EditPoll;
