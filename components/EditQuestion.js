const EditQuestion = ({ question, idx, setQuestion }) => {
  const handleQuestionChange = (newQuestion) => {
    const tmp = question;
    tmp.question = newQuestion;
    setQuestion(tmp, idx);
  };
  const handleOptionChange = (newOption, i) => {
    const tmp = question;
    tmp.options[i] = newOption;
    setQuestion(tmp, idx);
  };
  const handleAddOption = () => {
    const tmp = question;
    tmp.options.push("");
    setQuestion(tmp, idx);
  };
  return (
    <div>
      <input
        type="text"
        value={question.question}
        onChange={(e) => handleQuestionChange(e.target.value)}
      />
      <button
        onClick={() => handleAddOption()}
        className="text-white font-semibold text-lg bg-red-500 px-4 py-2 rounded-lg shadow-md"
      >
        Add Option
      </button>
      <ul>
        {question.options.map((option, i) => (
          <li key={i}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e.target.value, i)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditQuestion;
