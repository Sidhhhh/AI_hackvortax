import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./constats";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="editor-container">
      <div className="editor-panel">
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          options={{
            minimap: { enabled: false },
          }}
          height="100vh"
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      <Output editorRef={editorRef} language={language} />
      <style>
        {`.editor-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.editor-panel {
  width: 50%;
  margin-left: 250px;
}
`}
      </style>
    </div>
  );
};

export default CodeEditor;
