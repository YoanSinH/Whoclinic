import React from "react";
import { UserSchedule } from "./Schedule";
import axios from "axios";
import Swal from "sweetalert2";

export function UserMeetings(params) {
    const data = params.data;
    const email = params.user;
    const [active, setActive] = React.useState("0");
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const cancelCita = (id, index) => {
        Swal.fire({
            title: '¿Cancelar Cita?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cancelar Cita'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    async function deleteCita() {
                        let response = await axios.delete(`https://whospitalback.vercel.app/citas` + id)
                        if(response.status == 200) {
                            Swal.fire({
                                title: 'Cita Cancelada',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            data.splice(index, 1);
                            forceUpdate();
                        }else{
                            Swal.fire({
                                title: 'Error al cancelar cita',
                                icon: 'error',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                    deleteCita();
                } catch (error) {
                    Swal.fire({
                        title: 'Error al cancelar cita',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        })
    }
    
    const handleClick = (e) => {
        /*if (e.target.id === "1") {
            setActive("1");
        } else {
            setActive("0");
        }*/
        if (active === "0") {
            setActive("1");
        } else {
            setActive("0");   
        }
        //setActive(e.target.id);
    };
    

    return (
        <>
            <h2>Tus Citas</h2>
            <div>
                <button id="1" onClick={handleClick} className="btn btn-primary buttonprimary">Agendar Cita</button>
            </div>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body cardbody">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Doctor</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((meeting, index) => (
                                    <tr key={meeting.id}>
                                        <td>{meeting.date}</td>
                                        <td>{meeting.doctor}</td>
                                        <td><button className="btn btn-primary" onClick={() => cancelCita(meeting._id, index)}>Cancelar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {active === '1' ? <UserSchedule user={email} /> : ""}
        </>
    );
}