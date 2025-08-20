import { Dashboard } from "./pages/Dashboard"
import { SharePage } from "./pages/SharePage"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { YoutubePage } from "./pages/YoutubePage"
import { RedditPage } from "./pages/RedditPage"
import { TwitterPage } from "./pages/TwitterPage"

function App() {
  return <div>
  <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/share/:shareId" element={<SharePage/>}/>
        <Route path="/universe" element={<Dashboard/>}/>
        <Route path="/youtube" element={<YoutubePage/>}/>
        <Route path="/reddit" element={<RedditPage/>}/>
        <Route path="/twitter" element={<TwitterPage/>}/>
      </Routes>
    </BrowserRouter></div> 
}
export default App 
