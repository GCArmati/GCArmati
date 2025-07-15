import './Header.css'
import Navbar from "./Navbar.jsx";
export default function Header({userLogin,setUserLogin}){
    return  (
        <header className={"container-fluid sticky-top"}>
            <div className={"row"}>
                <div className={"col-6 col-md-9"}><h1 className="pageName">PC-Builder</h1></div>
                <div className={"col-6 col-md-3"}><Navbar userLogin={userLogin} setUserLogin={setUserLogin}></Navbar></div>
            </div>

        </header>
    );
}