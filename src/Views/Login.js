import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
import Swal from "sweetalert2";

export function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const [user, setUser] = useState({
        email:"",
        password:""
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    const Register = async e => {
        navigate("/");
    }

    const handleLogin = async() => {
        try {
            await login(user.email,user.password)
            navigate("/");
        } catch (error) {
            switch (error.code){
                case "auth/internal-error":
                    setError("No ha digitado los campos correctamente. 🙁");
                    break;
                case "auth/invalid-email":
                    setError("El email digitado es inválido. 🙁");
                    break;
                case "auth/weak-password":
                    setError("La contraseña debe tener como mínimo 6 caracteres. 🙁");
                    break;
                case "auth/email-already-in-use":
                    setError("El correo digitado ya está en uso. 🙁");
                    break;
                default:
                    setError("Error al iniciar sesión. 🙁");
                    break;
            }
        }
    }

    return (
        <>
        <div className="imageBackground"></div>
            <div className="centered mb-3 container">
                <div className='item-container'>
                    <div className="form row justify-content-center align-self-center formcontainer">
                        <h4>Iniciar Sessión</h4>
                        <p>{error}</p>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className='form-label'>Correo</label>
                                <input className="input form-control" type="email" placeholder='ejemplo@correo.com' name="email" id="email" value={email} onChange={handleChange} required></input>
                                <label className="form-label">Contraseña</label>
                                <input className="input form-control" type="password" placeholder='***********' name="password" id="password" value={password} onChange={handleChange} required></input>
                                <br />
                                <button className="btn buttonprimary btn-primary" onClick={handleLogin}>Entrar</button>
                            </div>
                            <a href="/register" style={{textDecoration:"none", color:"black"}}><p>Registrarse a la Clinica Who</p></a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}