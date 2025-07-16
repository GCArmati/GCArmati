
import {Link, useNavigate} from "react-router-dom";
import './Login.css'
import {useState} from "react";
import {login} from "../routes/authRoutes.js";
import {create} from "../routes/componentRoutes.js";

export default function Login({userLogin,setUserLogin}){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate = useNavigate()

    function handleReset(e){
        e.preventDefault();
        setEmail('');
        setPassword('');
    }

    async function handleSubmit(e){
        e.preventDefault();

        try {
            const response=await login(email,password);
            alert(response.message||response.error)
            setUserLogin(localStorage.getItem('currentUser'))
            navigate('/');
        } catch (error) {

        }

        setEmail('');
        setPassword('');


    }

    return (
        <>
            <p id={"testoSup"}>Modulo di Accesso</p>
            <div id={"superContainerL"}>
                <div id={"loginContainer"}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="Email">Email address</label>
                            <input id="Email" required type="email" className="form-control"  placeholder="Email..." onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        </div>
                        <div >
                            <label htmlFor="Password">Password</label>
                            <input type="password" required className="form-control" id="Password" placeholder="Password..." onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        </div>
                        <div id={"buttonContainer"} className={"list-group-horizontal-md mb-3"}>
                            <button type="submit" className="btn btn-success">Accedi</button>

                            <button type="reset" className="btn btn-danger" onClick={handleReset}>Cancella</button>

                            <Link to={"/register"}><button type="submit" className="btn btn-primary">Torna al register</button></Link>
                        </div>

                    </form>
                </div>

            </div>
        </>

    )
}