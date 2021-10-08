const ViewQuestion = ({ question, idx }) => {
  return (
    <div>
      {question.question}
      <p>Choices:</p>
      {question.options.map((option, i) => (
        <label key={i} className="flex gap-2 items-center">
          <input type="radio" name={`question_${idx}`} value={option} />
          {option}
        </label>
      ))}
    </div>
  );
};

export default ViewQuestion;
