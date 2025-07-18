import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { register } from'../routes/authRoutes.js'


export default function RegForm(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate = useNavigate();

    function handleReset(e){
        e.preventDefault();
        setName('');
        setEmail('');
        setPassword('');
    }

    async function handleSubmit(e){
        e.preventDefault();
        const data=await register(email,password,name);
        alert(data.message);
        if(data.status===201) navigate('/login')

        setName('');
        setEmail('');
        setPassword('');


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Username">Username</label>
                    <input id="Username" type="text" className="form-control"  placeholder="Username..." onChange={(e)=>setName(e.target.value)} value={name} required/>
                </div>
                <div>
                    <label htmlFor="Email">Email address</label>
                    <input id="Email" type="email" className="form-control"  placeholder="Email..." onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                </div>
                <div >
                    <label htmlFor="Password">Password</label>
                    <input type="password" className="form-control" id="Password" placeholder="Password..." onChange={(e)=>setPassword(e.target.value)} value={password} required/>
                </div>
                <div id={"buttonContainer"} className={"list-group-horizontal-md"}>
                    <button type="submit" className="btn btn-success">Registrati</button>

                    <button type="reset" className="btn btn-danger" onClick={handleReset}>Cancella</button>

                    <Link to={"/login"}><button type="submit" className="btn btn-primary">Login</button></Link>
                </div>
                <p id={"testoInf"}>Se hai già un account clicca su login.</p>

            </form>
        </>
    )
}