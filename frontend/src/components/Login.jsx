
import {Link} from "react-router-dom";
import './Login.css'

export default function Login(){
    return (
            <div id={"superContainerL"}>
                <div id={"loginContainer"}>
                    <form>
                        <div>
                            <label htmlFor="Email">Email address</label>
                            <input id="Email" type="email" className="form-control"  placeholder="Email..."/>
                        </div>
                        <div >
                            <label htmlFor="Password">Password</label>
                            <input type="password" className="form-control" id="Password" placeholder="Password..."/>
                        </div>
                        <div id={"buttonContainer"} className={"list-group-horizontal-md"}>
                            <button type="submit" className="btn btn-success">Accedi</button>

                            <button type="reset" className="btn btn-danger">Cancella</button>

                            <Link to={"/register"}><button type="submit" className="btn btn-primary">Torna al register</button></Link>
                        </div>

                    </form>
                </div>

            </div>
    )
}