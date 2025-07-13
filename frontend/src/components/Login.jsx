
import {Link} from "react-router-dom";
import './Login.css'
import {useState} from "react";
import {login} from "../routes/authRoutes.js";

export default function Login(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    async function handleSubmit(e){
        e.preventDefault();
        const response=await login(email,password);
        //if

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
                            <input id="Email" type="email" className="form-control"  placeholder="Email..." onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        </div>
                        <div >
                            <label htmlFor="Password">Password</label>
                            <input type="password" className="form-control" id="Password" placeholder="Password..." onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        </div>
                        <div id={"buttonContainer"} className={"list-group-horizontal-md"}>
                            <button type="submit" className="btn btn-success">Accedi</button>

                            <button type="reset" className="btn btn-danger">Cancella</button>

                            <Link to={"/register"}><button type="submit" className="btn btn-primary">Torna al register</button></Link>
                        </div>

                    </form>
                </div>

            </div>
        </>

    )
}