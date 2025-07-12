
import './Register.css'
import RegForm from './RegForm.jsx'
{/*si usa htmlFor perchè for in js esiste come già giustamente*/}
export default function Register(){
    return (
        <div id={"superContainerR"}>
            <div id={"loginContainer"}>
                <RegForm></RegForm>
            </div>

        </div>
    )
}