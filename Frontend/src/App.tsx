import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Chat from './pages/Chat'
import Notfound from './pages/NotFound'
import { useAuth } from './context/Context'
function App() {
  const auth=useAuth();
  console.log(useAuth()?.isLoggedIn);
  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        {auth?.isLoggedIn && auth.user && (<Route path="/chat" element={<Chat/>}/>)}
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </main>
  )
}

export default App
