import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Dashboard from "./components/Dashboard.jsx";
import FormModifyComponent from "./components/FormModifyComponent.jsx";
import CategoryList from "./components/CategoryList.jsx";


function App() {
    return (
    <div className={"d-flex flex-column min-vh-100"}>
        <Header></Header>
        <main className={"flex-fill p-3"}>
            <Routes>
                <Route path={"/"} element={<Home />}/>
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/cart"} element={<Cart/>}/>
                <Route path={"/dashboard"} element={<Dashboard />} />
                <Route path={"/modify"} element={<FormModifyComponent/>} />
                <Route path={"/category"} element={<CategoryList />} />
            </Routes>
        </main>
        <Footer></Footer>
    </div>
  )
}

export default App
