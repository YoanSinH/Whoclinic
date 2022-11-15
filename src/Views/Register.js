import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
import Swal from "sweetalert2";

export function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repassword, setRepassword] = useState();
    const [error, setError] = useState("");

    const [user, setUser] = useState({
        email:"",
        password:"",
        repassword:"",
        rol:"",
    });
    
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(user.password !== user.repassword){
            setError("Las contraseñas no coinciden. 🙁");
        }else{
            try {
                await signup(user.email,user.password);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registrado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                navigate("/login");
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
                        setError("Error inesperado")
                        break;
                }   
            }
        }
    }

    return (
        <>
        <div className="imageBackground"></div>
            <div className="centered mb-3 container">
                <div className='item-container'>
                    <div className="form row justify-content-center align-self-center formcontainer">
                        <h2>Register</h2>
                        <p>{error}</p>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className='form-label'>Correo</label>
                                <input className="input form-control" type="email" placeholder='ejemplo@correo.com' name="email" id="email" value={email} onChange={handleChange} required></input>
                                <label className='form-label'>Contraseña</label>
                                <input className="input form-control" type="password" placeholder='***********' name="password" id="password" value={password} onChange={handleChange} required></input>
                                <label className='form-label'>Repetir Contraseña</label>
                                <input className="input form-control" type="password" placeholder='***********' name="repassword" id="repassword" value={repassword} onChange={handleChange} required></input>
                                <br />
                                <button className="btn buttonprimary btn-primary" type="submit">Registrarse</button>
                            </div>
                            <a href="/login" style={{textDecoration:"none", color:"black"}}><p>Ingresar a la Clinica Who</p></a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}