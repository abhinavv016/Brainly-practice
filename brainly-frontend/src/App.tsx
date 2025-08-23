import { Dashboard } from "./pages/Dashboard"
import { SharePage } from "./pages/SharePage"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { YoutubePage } from "./pages/YoutubePage"
import { RedditPage } from "./pages/RedditPage"
import { TwitterPage } from "./pages/TwitterPage"
import { PrivateRoute } from "./components/private"

function App() {
  return <div>
  <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="" element={<Signup/>}/>
        <Route 
          path="/share/:shareId" 
          element={<SharePage/>}
        />
        <Route 
          path="/dashboard" 
          element={ <PrivateRoute> <Dashboard/> </PrivateRoute>}
        />
        <Route 
          path="/universe" 
          element={<PrivateRoute><Dashboard/></PrivateRoute>}
        />
        <Route 
          path="/youtube"
          element={<PrivateRoute><YoutubePage/></PrivateRoute>}
          />
        <Route 
          path="/reddit" 
          element={<PrivateRoute><RedditPage/></PrivateRoute>}
          />
        <Route 
          path="/twitter" 
          element={<PrivateRoute><TwitterPage/></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter></div> 
}
export default App 
