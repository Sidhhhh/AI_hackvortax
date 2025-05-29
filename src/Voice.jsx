// import { useState, useRef } from 'react'
// import { backend_url } from './constant'
// import SpeakingAnimation from './components/SpeakingAnimation'
// import AnimatedWaveform from './components/AnimateWaveform'
// import botImage from './assets/bot.png'

// function Voice() {
//   const [isRecording, setIsRecording] = useState(false)
//   const [audioUrl, setAudioUrl] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [blobSize, setBlobSize] = useState(0)
//   const [audioMime, setAudioMime] = useState('audio/wav')
//   const [conversation, setConversation] = useState([]) // Add conversation state
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [language, setLanguage] = useState('en-IN')
//   const mediaRecorderRef = useRef(null)
//   const audioChunksRef = useRef([])
//   const recordStartTime = useRef(null)

//   // Check supported mime types
//   const getSupportedMimeType = () => {
//     if (window.MediaRecorder && MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
//       return 'audio/webm;codecs=opus'
//     } else if (window.MediaRecorder && MediaRecorder.isTypeSupported('audio/wav')) {
//       return 'audio/wav'
//     } else if (window.MediaRecorder && MediaRecorder.isTypeSupported('audio/mp3')) {
//       return 'audio/mp3'
//     } else {
//       return 'audio/webm'
//     }
//   }

//   // Start recording
//   const startRecording = async () => {
//     setError(null)
//     setAudioUrl(null)
//     setBlobSize(0)
//     try {
//       const mimeType = getSupportedMimeType()
//       setAudioMime(mimeType)
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//       const mediaRecorder = new window.MediaRecorder(stream, { mimeType })
//       audioChunksRef.current = []
//       mediaRecorder.ondataavailable = (e) => {
//         if (e.data.size > 0) audioChunksRef.current.push(e.data)
//       }
//       mediaRecorder.onstop = handleStop
//       mediaRecorderRef.current = mediaRecorder
//       mediaRecorder.start() // No timeslice argument, records until stop()
//       recordStartTime.current = Date.now()
//       setIsRecording(true)
//     } catch (err) {
//       setError('Microphone access denied or not available.')
//     }
//   }

//   // Stop recording
//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       const elapsed = Date.now() - recordStartTime.current
//       if (elapsed < 300) {
//         setTimeout(() => {
//           mediaRecorderRef.current.stop()
//           setIsRecording(false)
//         }, 300 - elapsed)
//       } else {
//         mediaRecorderRef.current.stop()
//         setIsRecording(false)
//       }
//     }
//   }

//   // Play audio from base64 string
//   const playBase64Audio = (base64) => {
//     const audio = new Audio(`data:audio/wav;base64,${base64}`)
//     setIsSpeaking(true)
//     audio.onended = () => setIsSpeaking(false)
//     audio.play()
//   }

//   // Handle stop event
//   const handleStop = async () => {
//     setLoading(true)
//     setError(null)
//     const audioBlob = new Blob(audioChunksRef.current, { type: audioMime })
//     setBlobSize(audioBlob.size)
//     if (audioBlob.size === 0) {
//       setError('No audio captured. Please speak clearly and try again.')
//       setLoading(false)
//       return
//     }
//     try {
//       let url = backend_url
//       if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//         url = 'http://localhost:8000'
//       } else {
//         url = 'http://backend:8000'
//       }
//       // Prepare conversation history for multi-turn
//       const history = conversation.map(turn => [
//         { role: 'user', content: turn.user },
//         { role: 'assistant', content: turn.assistant }
//       ]).flat();
//       const headers = {
//         'Content-Type': audioMime.startsWith('audio/') ? audioMime : 'audio/wav',
//         'X-Language-Code': language,
//       };
//       if (history.length > 0) {
//         headers['X-Chat-History'] = JSON.stringify(history);
//       }
//       const response = await fetch(url + '/voice-chat', {
//         method: 'POST',
//         body: audioBlob,
//         headers,
//       })
//       if (!response.ok) {
//         const errData = await response.json()
//         throw new Error(errData.detail || 'Server error')
//       }
//       const data = await response.json()
//       // Add to conversation
//       setConversation(prev => [
//         ...prev,
//         {
//           user: data.transcription,
//           assistant: data.response,
//           audio_base64: data.audio_base64
//         }
//       ])
//       // Play the assistant's audio
//       playBase64Audio(data.audio_base64)
//       setAudioUrl(null) // Don't show old audio player
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
//       <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
//         {/* Chat Window */}
//         <div className="flex-1 bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6 md:mb-0 max-h-[32rem] overflow-y-auto">
//           <h2 className="text-2xl font-bold mb-4 text-indigo-700">Conversation</h2>
//           {/* Face Card Animation with Bot Image */}
//           <div className="flex justify-center mb-4">
//             <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
//               {/* Animated waveform behind the bot image when listening */}
//               {isRecording && (
//                 <span className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
//                   <AnimatedWaveform />
//                 </span>
//               )}
//               {/* Bot Image as round icon */}
//               <img
//                 src={botImage}
//                 alt="Bot"
//                 className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-indigo-200 shadow-lg object-cover z-10"
//                 style={{ position: 'relative', zIndex: 2 }}
//               />
//               {/* Animated ring when talking or listening */}
//               {(isRecording || isSpeaking) && (
//                 <span className={`absolute inset-0 flex items-center justify-center z-0 pointer-events-none`}>
//                   <span className={`absolute w-full h-full rounded-full border-4 ${isSpeaking ? 'border-green-400' : 'border-indigo-400'} animate-pulse`}></span>
//                   <span className={`absolute w-full h-full rounded-full border-8 ${isSpeaking ? 'border-green-200/60' : 'border-indigo-200/60'} animate-ping`}></span>
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="w-full mb-2 max-h-96 overflow-y-auto">
//             {conversation.length === 0 && (
//               <div className="text-gray-400 text-center">No conversation yet. Start talking!</div>
//             )}
//             {conversation.map((turn, idx) => (
//               <div key={idx} className="mb-4">
//                 <div className="text-right">
//                   <span className="inline-block bg-indigo-100 text-indigo-700 rounded-lg px-3 py-1 mb-1 animate-fade-in">
//                     <b>You:</b> {turn.user}
//                   </span>
//                 </div>
//                 <div className="text-left flex items-center gap-2">
//                   <span className="inline-block bg-gray-100 text-gray-700 rounded-lg px-3 py-1 animate-fade-in">
//                     <b>Assistant:</b> {turn.assistant}
//                   </span>
//                   <button
//                     className="ml-2 text-indigo-500 underline text-xs"
//                     onClick={() => playBase64Audio(turn.audio_base64)}
//                     title="Replay audio"
//                   >
//                     ▶️
//                   </button>
//                   {/* Animated dots when loading and this is the last turn */}
//                   {loading && idx === conversation.length - 1 && (
//                     <span className="ml-2 animate-bounce text-indigo-400 text-lg">...</span>
//                   )}
//                 </div>
//               </div>
//             ))}
//             {/* Show animated dots if waiting for first output */}
//             {loading && conversation.length === 0 && (
//               <div className="flex justify-center items-center mt-4">
//                 <span className="animate-bounce text-indigo-400 text-2xl">...</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Talking Window */}
//         <div className="flex flex-col items-center justify-center flex-shrink-0 bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
//           <h1 className="text-3xl font-bold mb-4 text-indigo-700">Voice Assistant</h1>
//           <p className="mb-2 text-gray-600 text-center">Press and hold the button, speak your query, and get an AI-powered voice response!</p>
//           {/* Language Selector */}
//           <div className="mb-4 w-full flex flex-col items-center">
//             <label htmlFor="language-select" className="text-sm text-gray-700 mb-1">Select Language:</label>
//             <select
//               id="language-select"
//               className="border rounded px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//               value={language}
//               onChange={e => setLanguage(e.target.value)}
//               disabled={isRecording || loading}
//             >
//               <option value="en-IN">English</option>
//               <option value="hi-IN">Hindi</option>
//               <option value="bn-IN">Bengali</option>
//               <option value="gu-IN">Gujarati</option>
//               <option value="kn-IN">Kannada</option>
//               <option value="ml-IN">Malayalam</option>
//               <option value="mr-IN">Marathi</option>
//               <option value="od-IN">Odia</option>
//               <option value="pa-IN">Punjabi</option>
//               <option value="ta-IN">Tamil</option>
//               <option value="te-IN">Telugu</option>
//             </select>
//           </div>
//           <button
//             className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-lg transition-all duration-200 mb-6 relative ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'}`}
//             onMouseDown={startRecording}
//             onMouseUp={stopRecording}
//             onTouchStart={startRecording}
//             onTouchEnd={stopRecording}
//             disabled={loading}
//           >
//             {isRecording && (
//               <span className="absolute inset-0 flex items-center justify-center z-0">
//                 <AnimatedWaveform />
//               </span>
//             )}
//             <span className="z-10">
//               {isRecording ? (
//                 <span className="flex flex-col items-center">
//                   <span>Listening...</span>
//                   <span className="mt-2 flex gap-1">
//                     <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
//                     <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
//                     <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
//                   </span>
//                 </span>
//               ) : 'Hold to Talk'}
//             </span>
//           </button>
//           {/* Show SpeakingAnimation when assistant is speaking */}
//           {isSpeaking && <SpeakingAnimation />}
//           {loading && <div className="text-indigo-600 mb-2 flex items-center gap-2">Processing <span className="animate-spin inline-block w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full"></span></div>}
//           {error && <div className="text-red-500 mb-2">{error}</div>}
//           {blobSize > 0 && <div className="text-xs text-gray-400 mb-2">Audio size: {blobSize} bytes ({audioMime})</div>}
//           {audioUrl && (
//             <audio controls src={audioUrl} className="mt-4 w-full" />
//           )}
//         </div>
//       </div>
//       <footer className="mt-8 text-gray-400 text-xs">&copy; {new Date().getFullYear()} Voice Assistant Powered by Sarvam AI & Groq</footer>
//       {/* Animations CSS */}
//       <style>{`
//         .animate-fade-in {
//           animation: fadeIn 0.7s;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Voice


import { useState, useRef } from 'react'
import { backend_url } from './constant'
import SpeakingAnimation from './components/SpeakingAnimation'
import AnimatedWaveform from './components/AnimateWaveform'
import botImage from './assets/bot.png'

function Voice() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [blobSize, setBlobSize] = useState(0)
  const [audioMime, setAudioMime] = useState('audio/wav')
  const [conversation, setConversation] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [language, setLanguage] = useState('en-IN')
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const recordStartTime = useRef(null)

  const getSupportedMimeType = () => {
    if (window.MediaRecorder && MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
      return 'audio/webm;codecs=opus'
    } else if (window.MediaRecorder && MediaRecorder.isTypeSupported('audio/wav')) {
      return 'audio/wav'
    } else if (window.MediaRecorder && MediaRecorder.isTypeSupported('audio/mp3')) {
      return 'audio/mp3'
    } else {
      return 'audio/webm'
    }
  }

  const startRecording = async () => {
    setError(null)
    setAudioUrl(null)
    setBlobSize(0)
    try {
      const mimeType = getSupportedMimeType()
      setAudioMime(mimeType)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new window.MediaRecorder(stream, { mimeType })
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }
      mediaRecorder.onstop = handleStop
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      recordStartTime.current = Date.now()
      setIsRecording(true)
    } catch (err) {
      setError('Microphone access denied or not available.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      const elapsed = Date.now() - recordStartTime.current
      if (elapsed < 300) {
        setTimeout(() => {
          mediaRecorderRef.current.stop()
          setIsRecording(false)
        }, 300 - elapsed)
      } else {
        mediaRecorderRef.current.stop()
        setIsRecording(false)
      }
    }
  }

  const playBase64Audio = (base64) => {
    const audio = new Audio(`data:audio/wav;base64,${base64}`)
    setIsSpeaking(true)
    audio.onended = () => setIsSpeaking(false)
    audio.play()
  }

  const handleStop = async () => {
    setLoading(true)
    setError(null)
    const audioBlob = new Blob(audioChunksRef.current, { type: audioMime })
    setBlobSize(audioBlob.size)
    if (audioBlob.size === 0) {
      setError('No audio captured. Please speak clearly and try again.')
      setLoading(false)
      return
    }
    try {
      let url = backend_url
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        url = 'http://localhost:8000'
      } else {
        url = 'http://backend:8000'
      }
      const history = conversation.map(turn => [
        { role: 'user', content: turn.user },
        { role: 'assistant', content: turn.assistant }
      ]).flat();
      const headers = {
        'Content-Type': audioMime.startsWith('audio/') ? audioMime : 'audio/wav',
        'X-Language-Code': language,
      };
      if (history.length > 0) {
        headers['X-Chat-History'] = JSON.stringify(history);
      }
      const response = await fetch(url + '/voice-chat', {
        method: 'POST',
        body: audioBlob,
        headers,
      })
      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.detail || 'Server error')
      }
      const data = await response.json()
      setConversation(prev => [
        ...prev,
        {
          user: data.transcription,
          assistant: data.response,
          audio_base64: data.audio_base64
        }
      ])
      playBase64Audio(data.audio_base64)
      setAudioUrl(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
    <div className="voice-container">
      <div className="voice-inner">
        <div className="voice-chat-window">
          <h2 className="voice-title">Conversation</h2>
          <div className="voice-bot-image-container">
            <div className="voice-bot-image-wrapper">
              {isRecording && (
                <span className="voice-animated-bg">
                  <AnimatedWaveform />
                </span>
              )}
              <img src={botImage} alt="Bot" className="voice-bot-image" />
              {(isRecording || isSpeaking) && (
                <span className="voice-ring-wrapper">
                  <span className={`voice-ring-outer ${isSpeaking ? 'green' : 'indigo'}`}></span>
                  <span className={`voice-ring-ping ${isSpeaking ? 'green' : 'indigo'}`}></span>
                </span>
              )}
            </div>
          </div>
          <div className="voice-messages">
            {conversation.length === 0 && (
              <div className="voice-empty">No conversation yet. Start talking!</div>
            )}
            {conversation.map((turn, idx) => (
              <div key={idx} className="voice-turn">
                <div className="voice-user">
                  <span className="voice-bubble user"><b>You:</b> {turn.user}</span>
                </div>
                <div className="voice-assistant">
                  <span className="voice-bubble assistant"><b>Assistant:</b> {turn.assistant}</span>
                  <button className="voice-replay" onClick={() => playBase64Audio(turn.audio_base64)}>▶️</button>
                  {loading && idx === conversation.length - 1 && (
                    <span className="voice-loading-dots">...</span>
                  )}
                </div>
              </div>
            ))}
            {loading && conversation.length === 0 && (
              <div className="voice-first-loading">...</div>
            )}
          </div>
        </div>

        <div className="voice-talk-window">
          <h1 className="voice-main-title">Voice Assistant</h1>
          <p className="voice-desc">Press and hold the button, speak your query, and get an AI-powered voice response!</p>
          <div className="voice-language-selector">
            <label htmlFor="language-select">Select Language:</label>
            <select
              id="language-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              disabled={isRecording || loading}
            >
              <option value="en-IN">English</option>
              <option value="hi-IN">Hindi</option>
              <option value="bn-IN">Bengali</option>
              <option value="gu-IN">Gujarati</option>
              <option value="kn-IN">Kannada</option>
              <option value="ml-IN">Malayalam</option>
              <option value="mr-IN">Marathi</option>
              <option value="od-IN">Odia</option>
              <option value="pa-IN">Punjabi</option>
              <option value="ta-IN">Tamil</option>
              <option value="te-IN">Telugu</option>
            </select>
          </div>
          <button
            className={`voice-record-button ${isRecording ? 'recording' : ''}`}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            disabled={loading}
          >
            {isRecording && (
              <span className="voice-record-animation">
                <AnimatedWaveform />
              </span>
            )}
            <span className="voice-record-text">
              {isRecording ? (
                <span className="voice-bounce-dots">
                  <span>Listening...</span>
                  <span className="voice-dots">
                    <span className="dot" style={{ animationDelay: '0s' }}></span>
                    <span className="dot" style={{ animationDelay: '0.2s' }}></span>
                    <span className="dot" style={{ animationDelay: '0.4s' }}></span>
                  </span>
                </span>
              ) : 'Hold to Talk'}
            </span>
          </button>
          {isSpeaking && <SpeakingAnimation />}
          {loading && <div className="voice-processing">Processing <span className="spinner"></span></div>}
          {error && <div className="voice-error">{error}</div>}
          {blobSize > 0 && <div className="voice-blob-info">Audio size: {blobSize} bytes ({audioMime})</div>}
          {audioUrl && <audio controls src={audioUrl} className="voice-audio-player" />}
        </div>
      </div>
      <footer className="voice-footer">&copy; {new Date().getFullYear()} Voice Assistant Powered by Sarvam AI & Groq</footer>
    </div>
    <style>
      {`body, html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.voice-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #ebf4ff, #c3dafe);
  padding: 1rem;
}

.voice-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 64rem;
}

@media (min-width: 768px) {
  .voice-wrapper {
    flex-direction: row;
  }
}

.chat-window {
  flex: 1;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1.5rem;
  max-height: 32rem;
  overflow-y: auto;
}

.chat-heading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4c51bf;
  margin-bottom: 1rem;
}

.bot-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  width: 8rem;
  height: 8rem;
}

@media (min-width: 768px) {
  .bot-container {
    width: 8rem;
    height: 8rem;
  }
}

.bot-img {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  border: 4px solid #c3dafe;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.ring {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.ring-border {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  border: 4px solid #667eea;
  animation: pulse 2s infinite;
}

.ring-ping {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  border: 8px solid rgba(203, 213, 255, 0.6);
  animation: ping 1s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes ping {
  0% { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2); opacity: 0; }
}

.turn-user, .turn-assistant {
  display: inline-block;
  border-radius: 0.5rem;
  padding: 0.25rem 0.75rem;
  margin-bottom: 0.25rem;
  animation: fadeIn 0.7s;
}

.turn-user {
  background-color: #ebf4ff;
  color: #4c51bf;
  text-align: right;
}

.turn-assistant {
  background-color: #f7fafc;
  color: #4a5568;
  text-align: left;
}

.chat-replay {
  margin-left: 0.5rem;
  color: #5a67d8;
  font-size: 0.75rem;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
}

.chat-loading {
  margin-left: 0.5rem;
  color: #a3bffa;
  font-size: 1.25rem;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.talking-window {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 2rem;
  max-width: 28rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.voice-title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #4c51bf;
  margin-bottom: 1rem;
}

.voice-subtext {
  margin-bottom: 0.5rem;
  color: #718096;
  text-align: center;
}

.language-select {
  margin-bottom: 1rem;
  width: 100%;
  text-align: center;
}

.language-select label {
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 0.25rem;
  display: block;
}

.language-select select {
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  color: #4a5568;
}

.record-button {
  width: 8rem;
  height: 8rem;
  border-radius: 9999px;
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  transition: background-color 0.2s;
}

.record-button.active {
  background-color: #f56565;
  animation: pulse 1.5s infinite;
}

.record-button.inactive {
  background-color: #5a67d8;
}

.record-button.inactive:hover {
  background-color: #434190;
}

.listening-dots {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.listening-dot {
  width: 0.75rem;
  height: 0.75rem;
  background: white;
  border-radius: 9999px;
  animation: bounce 1s infinite;
}

.processing {
  color: #5a67d8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.processing-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #a3bffa;
  border-top-color: transparent;
  border-radius: 9999px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-text {
  color: #f56565;
  margin-bottom: 0.5rem;
}

.audio-info {
  font-size: 0.75rem;
  color: #a0aec0;
  margin-bottom: 0.5rem;
}

footer {
  margin-top: 2rem;
  color: #a0aec0;
  font-size: 0.75rem;
}

.animate-fade-in {
  animation: fadeIn 0.7s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`}
    </style>
    </div>
  )
}

export default Voice

