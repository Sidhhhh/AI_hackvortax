import React, { useEffect, useRef, useState } from "react";
import "../style.css";

const API_KEY = "AIzaSyCvCL_ZMrDEJ7Us5nHfx_E45FQ7GRvobz0"; // Replace with your real key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const getMimeType = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  switch (ext) {
    case "txt": return "text/plain";
    case "csv": return "text/csv";
    case "pdf": return "application/pdf";
    case "jpg":
    case "jpeg": return "image/jpeg";
    case "png": return "image/png";
    case "gif": return "image/gif";
    default: return "application/octet-stream";
  }
};




const ChatBot = () => {
  const containerRef = useRef(null);
  const chatsRef = useRef(null);
  const fileInputRef = useRef(null);
  const promptInputRef = useRef(null);
  const wrapperRef = useRef(null);

  const [fileData, setFileData] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("themeColor") === "light_mode");
  const [botResponding, setBotResponding] = useState(false);
  const [typingInterval, setTypingInterval] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme);
    document.body.classList.toggle("chats-active", chatHistory.length > 0);
    localStorage.setItem("themeColor", theme ? "light_mode" : "dark_mode");
  }, [theme, chatHistory.length]);

  const scrollToBottom = () => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  };

  const createMessageElement = (content, classes) => {
    const div = document.createElement("div");
    div.className = `message ${classes}`;
    div.innerHTML = content;
    return div;
  };

  const typingEffect = (text, textElement, botMsgDiv) => {
    textElement.textContent = "";
    const words = text.split(" ");
    let wordIndex = 0;

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        textElement.textContent += (wordIndex === 0 ? "" : " ") + words[wordIndex++];
        scrollToBottom();
      } else {
        clearInterval(interval);
        botMsgDiv.classList.remove("loading");
        document.body.classList.remove("bot-responding");
      }
    }, 40);

    setTypingInterval(interval);
  };

  const generateResponse = async (botMsgDiv, userMessage, fileData) => {
    const textElement = botMsgDiv.querySelector(".message-text");
    controllerRef.current = new AbortController();

    const userPart = {
      role: "user",
      parts: [
        { text: userMessage },
      ...(fileData.data
  ? [{
      inline_data: {
        mimeType: fileData.mime_type,
        data: fileData.data
      }
    }]
  : []),

      ],
    };

    const updatedHistory = [...chatHistory, userPart];
    setChatHistory(updatedHistory);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: updatedHistory }),
        signal: controllerRef.current.signal,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      const responseText = data.candidates[0].content.parts[0].text.replace(/\\([^]+)\\*/g, "$1").trim();
      typingEffect(responseText, textElement, botMsgDiv);
      setChatHistory((prev) => [...prev, { role: "model", parts: [{ text: responseText }] }]);
    } catch (error) {
      textElement.textContent = error.name === "AbortError" ? "Response generation stopped." : error.message;
      textElement.style.color = "#d62939";
      botMsgDiv.classList.remove("loading");
      document.body.classList.remove("bot-responding");
      scrollToBottom();
    } finally {
      setFileData({});
      setBotResponding(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = promptInputRef.current.value.trim();
    if (!userMessage || botResponding) return;

    setBotResponding(true);
    promptInputRef.current.value = "";

    const userMsgHTML = `
      <p class="message-text"></p>
      ${
        fileData.data
          ? fileData.isImage
            ? `<img src="data:${fileData.mimeType};base64,${fileData.data}" class="img-attachment" />`
            : `<p class="file-attachment"><span class="material-symbols-rounded">description</span>${fileData.fileName}</p>`
          : ""
      }
    `;
    const userMsgDiv = createMessageElement(userMsgHTML, "user-message");
    userMsgDiv.querySelector(".message-text").textContent = userMessage;
    chatsRef.current.appendChild(userMsgDiv);
    scrollToBottom();

    setTimeout(() => {
      const botMsgHTML = `<img class="avatar" src="gemini.svg" /><p class="message-text">just a sec...</p>`;
      const botMsgDiv = createMessageElement(botMsgHTML, "bot-message loading");
      chatsRef.current.appendChild(botMsgDiv);
      scrollToBottom();
      generateResponse(botMsgDiv, userMessage, fileData);
    }, 600);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      fileInputRef.current.value = "";
      const base64String = e.target.result.split(",")[1];
      setFileData({
        fileName: file.name,
        data: base64String,
        mime_type: file.type || getMimeType(file.name),
        isImage,
      });
    };
  };

  const stopResponse = () => {
    controllerRef.current?.abort();
    setFileData({});
    clearInterval(typingInterval);
    const botDiv = chatsRef.current.querySelector(".bot-message.loading");
    if (botDiv) botDiv.classList.remove("loading");
    document.body.classList.remove("bot-responding");
  };

  const deleteChats = () => {
    chatsRef.current.innerHTML = "";
    setChatHistory([]);
    setFileData({});
    setBotResponding(false);
    document.body.classList.remove("chats-active", "bot-responding");
  };

  const handleSuggestionClick = (text) => {
    promptInputRef.current.value = text;
    handleSubmit(new Event("submit", { cancelable: true }));
  };

  const toggleTheme = () => setTheme((prev) => !prev);

  return (
    <div className="container" ref={containerRef}>
      <header className="app-header">
        <h1 className="heading">Hello, there</h1>
        <h4 className="sub-heading">How can I help you today?</h4>
      </header>

      <ul className="suggestions">
        {[
          "Design a home office setup for remote work under $500.",
          "How can I level up my web development expertise in 2025?",
          "Suggest some useful tools for debugging JavaScript code.",
          "Create a React JS component for the simple todo list app.",
        ].map((text, i) => (
          <li key={i} className="suggestions-item" onClick={() => handleSuggestionClick(text)}>
            <p className="text">{text}</p>
            <span className="icon material-symbols-rounded">
              {["draw", "lightbulb", "explore", "code_blocks"][i]}
            </span>
          </li>
        ))}
      </ul>

      <div className="chats-container" ref={chatsRef}></div>

      <div className="prompt-container">
        <div className="prompt-wrapper" ref={wrapperRef}>
          <form className="prompt-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Ask Anything..." className="prompt-input" required ref={promptInputRef} />
            <div className="prompt-actions">
              <div className={`file-upload-wrapper ${fileData.data ? "active" : ""} ${fileData.isImage ? "img-attached" : "file-attached"}`}>
                <img src={fileData.isImage ? `data:${fileData.mime_type};base64,${fileData.data}` : "#"} className="file-preview" alt="" />
                <input
                  id="file-input"
                  type="file"
                  accept="image/*, .pdf, .txt, .csv"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button type="button" className="file-icon material-symbols-rounded">description</button>
                <button type="button" id="cancel-file-btn" className="material-symbols-rounded" onClick={() => setFileData({})}>close</button>
                <button type="button" id="add-file-btn" className="material-symbols-rounded" onClick={() => fileInputRef.current.click()}>attach_file</button>
              </div>
              <button type="button" id="stop-response-btn" className="material-symbols-rounded" onClick={stopResponse}>stop_circle</button>
              <button type="submit" id="send-prompt-btn" className="material-symbols-rounded">arrow_upward</button>
            </div>
          </form>
          <button id="delete-chats-btn" className="material-symbols-rounded" onClick={deleteChats}>delete</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
