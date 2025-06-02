import React, { useState } from "react";
import axios from "axios";

function QuizApp() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/generate-quiz", {
        topic,
      });
      setQuiz(response.data.quiz);
      setSelectedAnswers({});
      setSubmitted(false);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, optionKey) => {
    if (!submitted) {
      setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionKey });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="app-container">
      <div className="quiz-box">
        <h1 className="quiz-title">AI Quiz Generator</h1>

        <div className="topic-input-section">
          <input
            type="text"
            placeholder="Enter topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="topic-input"
          />
          <button
            onClick={fetchQuiz}
            className="generate-btn"
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate Quiz"}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        {quiz.length > 0 && (
          <div className="question-list">
            {quiz.map((q, index) => (
              <div key={index} className="question-block">
                <h3 className="question-text">{index + 1}. {q.question}</h3>
                <div className="options-grid">
                  {Object.entries(q.options).map(([key, value]) => {
                    const isSelected = selectedAnswers[index] === key;
                    const isCorrect = submitted && key === q.answer;
                    const isWrong = submitted && isSelected && key !== q.answer;

                    return (
                      <label
                        key={key}
                        className={`option-label ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={key}
                          disabled={submitted}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(index, key)}
                          className="option-radio"
                        />
                        {key}. {value}
                      </label>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="correct-answer">
                    Correct Answer: {q.answer}
                  </p>
                )}
              </div>
            ))}
            {!submitted && (
              <button
                onClick={handleSubmit}
                className="submit-btn"
              >
                Submit Answers
              </button>
            )}
            {submitted && (
              <p className="score-text">
                Your Score: {getScore()} / {quiz.length}
              </p>
            )}
          </div>
        )}
      </div>
      <style>
        {`
        .app-container {
  min-height: 100vh;
  background-color: rgb(213, 213, 234);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1.5rem;
   color: #000000;
}

.quiz-box {
  width: 100%;
  max-width: 768px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.quiz-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.topic-input-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.topic-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.generate-btn {
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}

.generate-btn:hover {
  background-color:rgb(0, 0, 0);
}

.question-list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question-block {
}

.question-text {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.option-label {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.option-radio {
  margin-right: 0.5rem;
}

.option-label.selected {
  border-color:rgb(0, 0, 0);
}

.option-label.correct {
  background-color: #dcfce7;
  border-color: #16a34a;
}

.option-label.wrong {
  background-color: #fee2e2;
  border-color: #dc2626;
}

.correct-answer {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #16a34a;
}

.submit-btn {
  background-color: #16a34a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #15803d;
}

// .score-text {
//   text-align: center;
//   font-size: 1.25rem;
//   font-weight: 600;
//   color:rgb(0, 0, 0);
// }
`}
      </style>
    </div>
  );
}

export default QuizApp;
