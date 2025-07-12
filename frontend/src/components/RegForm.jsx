import {Link} from "react-router-dom";


export default function RegForm(){
    return (
        <>
            <form>
                <div>
                    <label htmlFor="Username">Username</label>
                    <input id="Username" type="text" className="form-control"  placeholder="Username..."/>
                </div>
                <div>
                    <label htmlFor="Email">Email address</label>
                    <input id="Email" type="email" className="form-control"  placeholder="Email..."/>
                </div>
                <div >
                    <label htmlFor="Password">Password</label>
                    <input type="password" className="form-control" id="Password" placeholder="Password..."/>
                </div>
                <div id={"buttonContainer"} className={"list-group-horizontal-md"}>
                    <button type="submit" className="btn btn-success">Registrati</button>

                    <button type="reset" className="btn btn-danger">Cancella</button>

                    <Link to={"/login"}><button type="submit" className="btn btn-primary">Login</button></Link>
                </div>

            </form>
        </>
    )
}