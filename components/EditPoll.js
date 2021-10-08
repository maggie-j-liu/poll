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
    const hasId = [];
    const hasIdOrder = [];
    const noId = [];
    const noIdOrder = [];
    for (let i = 0; i < questions.length; i++) {
      (questions[i].id ? hasId : noId).push(questions[i]);
      (questions[i].id ? hasIdOrder : noIdOrder).push(i);
    }
    await supabase.from("questions").upsert(hasId, { returning: "minimal" });
    const { data } = await supabase.from("questions").insert(noId);
    const newQuestions = [];
    let i = 0;
    let j = 0;
    while (i < hasId.length && j < noId.length) {
      if (hasIdOrder[i] < noIdOrder[j]) {
        newQuestions.push(hasId[i]);
        i++;
      } else {
        newQuestions.push(data[j]);
        j++;
      }
    }
    for (let ii = i; ii < hasId.length; ii++) {
      newQuestions.push(hasId[ii]);
    }
    for (let jj = j; jj < data.length; jj++) {
      newQuestions.push(data[jj]);
    }
    const newQuestionIds = newQuestions.map((q) => q.id);
    await supabase
      .from("polls")
      .update({ questions: newQuestionIds })
      .eq("id", poll.id);
    setQuestions(newQuestions);
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
