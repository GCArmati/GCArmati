
import {Link, useNavigate} from "react-router-dom";
import './Navbar.css'
import {logoutFetch} from '../routes/authRoutes.js'


export default function Navbar({userLogin, setUserLogin}) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        setUserLogin(null);
        await logoutFetch();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("accessToken");

        alert('Logout effettuato.')
        navigate('/');
    }

    return (
        <div id="navbar-container" className="container">
            <div className="row">
                <div className="col-auto"><Link to="/">Home</Link></div>

                {(userLogin === null) && (
                    <div className="col-auto"><Link to="/register">Register</Link></div>
                )}

                {userLogin === "Admin" && (
                    <div className="col-auto"><Link to="/dashboard">Dashboard</Link></div>
                )}

                {userLogin !==null && (
                    <>
                        <div className="col-auto"><Link to="/cart">Cart</Link></div>
                        <button className={"col-auto"} onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}