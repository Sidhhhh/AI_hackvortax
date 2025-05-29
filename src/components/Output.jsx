import { useState } from "react";
import { executeCode } from "./API";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
      setErrorMessage(result.stderr || "");
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="output-container">
      <div className="output-header">Output</div>
      <button
        className="run-button"
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>

      <div className={`output-box ${isError ? "error" : ""}`}>
        {output
          ? output.map((line, i) => <div key={i}>{line}</div>)
          : 'Click "Run Code" to see the output here'}
      </div>

      {isError && errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
      <style>
        {`.output-container {;
  width: 50%;
}

.output-header {
  margin-bottom: 0.5rem;
  font-size: 1.125rem; /* similar to Chakra's lg */
  font-weight: bold;
}

.run-button {
  padding: 0.5rem 1rem;
  border: 1px solid green;
  background-color: transparent;
  color: green;
  border-radius: 4px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.run-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.run-button:hover:not(:disabled) {
  background-color: rgba(0, 128, 0, 0.1);
}

.output-box {
  height: 100vh;
  padding: 0.5rem;
  border: 1px solid #333;
  border-radius: 4px;
  color: white;
  overflow-y: auto;
  white-space: pre-wrap;
  background-color: #1e1e1e;
}

.output-box.error {
  color: #f87171; /* red-400 */
  border-color: #f43f5e; /* red-500 */
}

.error-message {
  margin-top: 0.5rem;
  color: #f43f5e;
}
`}
      </style>
    </div>
  );
};

export default Output;
