import { useState } from 'react'
import LandingPage from './components/LandingPage'
import SideBar from './components/SideBar'
import ChatBot from './pages/ChatBot'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import CodeReviewer from './pages/CodeReviewer'
import CodeEditor from "./components/CodeEditor";
import QuizApp from './pages/Quiz'
import Voice from './Voice'
import VideoConference from './pages/Virtual_classroom'

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: "/",
      element:<><SideBar /><LandingPage /></>
    },
    {
      path:"/chatbot",
      element:<><SideBar /><ChatBot /></>
    },
    {
      path:"/virtual_classroom",
      element:<><SideBar /><VideoConference /></>
    },
    {
      path:"/codereviewer",
      element:<><SideBar /><CodeReviewer /></>
    },
    {
      path:"/ai_quiz",
      element:<><SideBar /><QuizApp /></>
    },
    {
      path:"/code_editor",
      element:<><SideBar /><CodeEditor /></>
    },
    {
      path:"/voice",
      element:<><SideBar /><Voice /></>
    },
  ])
  

  return (
    <>
       {/* <LandingPage/> */}
      {/* <SideBar/> */}
      
      {/* <ChatBot/> */}
      {/* <VideoConference/> */}
       <RouterProvider router={router} />
       
       {/* <Button/> */}
       {/* <CodeReviewer/> */}
    </>
  )
}


export default App;
