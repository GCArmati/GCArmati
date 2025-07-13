import {Link} from "react-router-dom";
import './Navbar.css'

export default function Navbar(){
    return(
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-xxl-2"}><Link to="/">Home</Link></div>
                <div className={"col-xxl-3"}><Link to="/dashboard">Dashboard</Link> {/*TODO Da inserire poi modifica Lucia*/}</div>
                <div className={"col-xxl-2"}><Link to="/login">Login</Link></div>
                <div className={"col-xxl-3"}><Link to="/cart">Cart</Link></div>
            </div>
        </div>
    )
}