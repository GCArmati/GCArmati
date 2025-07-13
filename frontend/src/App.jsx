import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";


function App() {
    return (
    <div className={"d-flex flex-column min-vh-100"}>
        <Header></Header>
        <main className={"flex-fill p-3"}>
            <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<Login />} />
            </Routes>
        </main>
        <Footer></Footer>
    </div>
  )
}

export default App
