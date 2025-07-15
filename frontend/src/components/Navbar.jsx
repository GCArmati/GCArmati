
import {Link} from "react-router-dom";
import './Navbar.css'
import {useEffect, useState} from "react";
import {logoutFetch} from '../routes/authRoutes.js'


export default function Navbar() {
    const [currentUser, setCurrentUser] = useState(() => localStorage.getItem("currentUser"));

    // Ascolta modifiche al localStorage (es. da login o altre parti della SPA)
    useEffect(() => {
        const handleStorageChange = () => {
            setCurrentUser(localStorage.getItem("currentUser"));
        };

        // Eventi personalizzati per aggiornare manualmente da altri componenti
        window.addEventListener("userChanged", handleStorageChange);
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("userChanged", handleStorageChange);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogout = async () => {
        await logoutFetch();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("accessToken");
    }

    return (
        <div id="navbar-container" className="container">
            <div className="row">
                <div className="col-auto"><Link to="/">Home</Link></div>

                {currentUser === null && (
                    <div className="col-auto"><Link to="/register">Register</Link></div>
                )}

                {currentUser === "Admin" && (
                    <div className="col-auto"><Link to="/dashboard">Dashboard</Link></div>
                )}

                {currentUser !== null && (
                    <>
                        <div className="col-auto"><Link to="/cart">Cart</Link></div>
                        <button className={"col-auto"} onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}