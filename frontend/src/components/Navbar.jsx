
import {Link} from "react-router-dom";
import './Navbar.css'
import {useEffect, useState} from "react";


export default function Navbar() {
    // Stato per salvare l'utente attualmente loggato (preso da localStorage)
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));

    useEffect(() => {
        // Ascolta i cambiamenti di localStorage (ad esempio da altre schede)
        const handleStorageChange = () => {
            setCurrentUser(localStorage.getItem('currentUser'));
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup dell'event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div id="navbar-container" className="container">
            <div className="row">
                <div className="col-auto"><Link to="/">Home</Link></div>

                {/* Mostra 'Register' se non c'è utente loggato */}
                {!currentUser && (
                    <div className="col-auto"><Link to="/register">Register</Link></div>
                )}

                {/* Mostra 'Dashboard' se l'utente è Admin */}
                {currentUser === 'Admin' && (
                    <div className="col-auto"><Link to="/dashboard">Dashboard</Link></div>
                )}

                {/* Mostra sempre 'Cart' se c'è un utente loggato */}
                {currentUser && (
                    <div className="col-auto"><Link to="/cart">Cart</Link></div>
                )}
            </div>
        </div>
    );
}