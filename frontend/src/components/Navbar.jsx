
import {Link} from "react-router-dom";
import './Navbar.css'

export default function Navbar(){
    return(
        <div id="navbar-container" className={"container"}> {/*aggiunto identificativo*/}
            <div className={"row"}>
                <div className={"col-auto"}><Link to="/">Home</Link></div>
                <div className={"col-auto"}><Link to="/dashboard">Dashboard</Link> {/*TODO Da inserire poi modifica Lucia*/}</div>
                <div className={"col-auto"}><Link to="/register">Register</Link></div>
                <div className={"col-auto"}><Link to="/cart">Cart</Link></div>
            </div>
        </div>
    )
}
