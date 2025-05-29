import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import RingLoader from "react-spinners/RingLoader";

const CodeReviewer = () => {
  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'bash', label: 'Bash' }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("");
  const ai = new GoogleGenAI({ apiKey: "AIzaSyCvCL_ZMrDEJ7Us5nHfx_E45FQ7GRvobz0" }); // Replace this with your actual key
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#18181b',
      borderColor: '#3f3f46',
      color: '#fff',
      width: "100%"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#18181b',
      color: '#fff',
      width: "100%"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#27272a' : '#18181b',
      color: '#fff',
      cursor: 'pointer'
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
      width: "100%"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a1a1aa',
      width: "100%"
    }),
  };

  async function reviewCode() {
    setResponse("");
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ A list of any potential bugs or logical errors, if found.
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.

Code: ${code}
`,
    });
    setResponse(response.text);
    setLoading(false);
  }

  return (
    <>
      <div className="main-container">
        <div className="left-panel">
          <div className="tabs-bar">
            <Select
              value={selectedOption}
              onChange={(e) => { setSelectedOption(e) }}
              options={options}
              styles={customStyles}
            />
            <button className="btnNormal" onClick={() => {
              if (code === "") {
                alert("Please enter code first");
              } else {
                reviewCode();
              }
            }}>
              Review
            </button>
          </div>

          <Editor height="100%" theme='vs-dark' language={selectedOption.value} value={code} onChange={(e) => { setCode(e) }} />
        </div>

        <div className="right-panel">
          <div className="top-tab">
            <p className='response-label'>Response</p>
          </div>
          {loading && <RingLoader color='#9333ea' />}
          <Markdown>{response}</Markdown>
        </div>
        <style>
            {`.main-container {
  display: flex;
  justify-content: space-between;
  height: 100vh;
  margin-left: 260px;
}

.left-panel {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.right-panel {
  width: 50%;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  background-color:rgb(245, 245, 255);
  color: #000000;
}

.tabs-bar {
  margin-top: 20px;
  padding: 0 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btnNormal {
  background-color: #18181b;
  color: white;
  padding: 8px 16px;
  border: none;
  min-width: 120px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btnNormal:hover {
  background-color:rgb(124, 124, 131);
}

.top-tab {
  border-top: 1px solid #27272a;
  border-bottom: 1px solid #27272a;
  height: 60px;
  display: flex;
  align-items: center;
}

.response-label {
color: black;
  font-weight: 700;
  font-size: 17px;
}
`}
        </style>
      </div>
    </>
  );
};

export default CodeReviewer;
