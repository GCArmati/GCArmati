import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
    <>
        <Header></Header>
        <Routes>
            <Route path={"/"} element={<Home />}/>
        </Routes>
        <Footer></Footer>

    </>
  )
}

export default App
