// import React, { useState } from "react";
// import axios from "axios";

// function QuizApp() {
//   const [topic, setTopic] = useState("");
//   const [quiz, setQuiz] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchQuiz = async () => {
//     if (!topic.trim()) {
//       setError("Please enter a topic.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post("http://localhost:5000/generate-quiz", {
//         topic,
//       });
//       setQuiz(response.data.quiz);
//       setSelectedAnswers({});
//       setSubmitted(false);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load quiz.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswerChange = (questionIndex, optionKey) => {
//     if (!submitted) {
//       setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionKey });
//     }
//   };

//   const handleSubmit = () => {
//     setSubmitted(true);
//   };

//   const getScore = () => {
//     let score = 0;
//     quiz.forEach((q, idx) => {
//       if (selectedAnswers[idx] === q.answer) score++;
//     });
//     return score;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
//       <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-semibold text-center mb-4">Gemini Quiz App</h1>

//         <div className="mb-4 flex gap-2">
//           <input
//             type="text"
//             placeholder="Enter topic..."
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             className="flex-1 p-3 border border-gray-300 rounded-md"
//           />
//           <button
//             onClick={fetchQuiz}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Generate Quiz"}
//           </button>
//         </div>

//         {error && <p className="text-red-600 mb-2">{error}</p>}

//         {quiz.length > 0 && (
//           <div className="space-y-6 mt-4">
//             {quiz.map((q, index) => (
//               <div key={index}>
//                 <h3 className="font-medium mb-2">{index + 1}. {q.question}</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {Object.entries(q.options).map(([key, value]) => {
//                     const isSelected = selectedAnswers[index] === key;
//                     const isCorrect = submitted && key === q.answer;
//                     const isWrong = submitted && isSelected && key !== q.answer;

//                     return (
//                       <label
//                         key={key}
//                         className={`p-2 border rounded-md cursor-pointer flex items-center
//                           ${isSelected ? "border-indigo-500" : ""}
//                           ${isCorrect ? "bg-green-100 border-green-600" : ""}
//                           ${isWrong ? "bg-red-100 border-red-600" : ""}
//                         `}
//                       >
//                         <input
//                           type="radio"
//                           name={`question-${index}`}
//                           value={key}
//                           disabled={submitted}
//                           checked={isSelected}
//                           onChange={() => handleAnswerChange(index, key)}
//                           className="mr-2"
//                         />
//                         {key}. {value}
//                       </label>
//                     );
//                   })}
//                 </div>
//                 {submitted && (
//                   <p className="mt-1 text-sm text-green-600">
//                     Correct Answer: {q.answer}
//                   </p>
//                 )}
//               </div>
//             ))}
//             {!submitted && (
//               <button
//                 onClick={handleSubmit}
//                 className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//               >
//                 Submit Answers
//               </button>
//             )}
//             {submitted && (
//               <p className="text-xl text-center font-semibold text-blue-600">
//                 Your Score: {getScore()} / {quiz.length}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//       <style>
//         {`.App {
//   text-align: center;
// }

// .App-logo {
//   height: 40vmin;
//   pointer-events: none;
// }

// @media (prefers-reduced-motion: no-preference) {
//   .App-logo {
//     animation: App-logo-spin infinite 20s linear;
//   }
// }

// .App-header {
//   background-color: #282c34;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   font-size: calc(10px + 2vmin);
//   color: white;
// }

// .App-link {
//   color: #61dafb;
// }

// @keyframes App-logo-spin {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }
//   body {
//   margin: 0;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
//     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
//     sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }

// code {
//   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
//     monospace;
// }
// `}
//       </style>
//     </div>
//   );
// }

// export default QuizApp;


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
