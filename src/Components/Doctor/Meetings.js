import React from "react";
//import { UserSchedule } from "./Schedule";
import axios from "axios";
import Swal from "sweetalert2";

export function DoctorMeetings(params) {
    const data = params.data;
    const email = params.user;
    const [meetings, setMeetings] = React.useState();
    const [active, setActive] = React.useState("0");
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const empezarCita = (id, index) => {
        Swal.fire({
            title: '¿Empezar Cita?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Empezar Cita'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    async function deleteCita() {
                        let response = await axios.get(`https://whospitalback.vercel.app/citas` + id)
                        if(response.status == 200) {
                            setMeetings(response.data.info);
                        }else{
                            Swal.fire({
                                title: 'Error al empezar la cita',
                                icon: 'error',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                    deleteCita();
                } catch (error) {
                    Swal.fire({
                        title: 'Error al empezar la cita',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        })
    }
    
    const handleClick = (e) => {
        if (active === "0") {
            setActive("1");
        } else {
            setActive("0");   
        }
    };
    

    return (
        <>
            <h2>Tus Citas</h2>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body cardbody">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Paciente</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((meeting, index) => (
                                    <tr key={meeting.id}>
                                        <td>{meeting.date}</td>
                                        <td>{meeting.doctor}</td>
                                        <td><button className="btn btn-primary" onClick={() => empezarCita(meeting._id, index)}>Empezar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*active === '1' ? <UserSchedule user={email} /> : ""*/}
        </>
    );
}