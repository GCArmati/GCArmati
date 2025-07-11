import './Header.css'
import Navbar from "./Navbar.jsx";
export default function Header(){
    return  (
        <header className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col-6 col-md-9"}><h1>PC-Builder</h1></div>
                <div className={"col-6 col-md-3"}><Navbar></Navbar></div>
            </div>

        </header>
    );
}