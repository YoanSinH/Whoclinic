import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function UserSchedule(props) {
    const user = props.user;
    const [isOpen, setIsOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [data, setData] = React.useState({});
    const [doctor, setDoctor] = React.useState("");
    const [date, setDate] = React.useState("");

    const day = new Date();
    function formatDate(date){
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, month, day].join('-');
    }
    const today = formatDate(day);

    function confirm(doctor, date) {
        if (doctor === "" || date === "") {
            Swal.fire({
                title: 'Error',
                text: 'Por favor llene todos los campos',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            setData({
                doctor: doctor,
                pacient: user,
                medicaments: "",
                date: date,
                generalInformation: "",
                medicalHistory: "",
            });
            Swal.fire({
                title: '¿Confirmar Cita?',
                icon: 'question',
                text: `¿Está seguro de agendar la cita con ${doctor}? ${date}`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar Cita'
                }).then((result) => {
                    if (result.isConfirmed) {
                        async function createCita() {
                            let response = await axios.post(`https://whospitalback.vercel.app/citas`, data)
                            if (response.status == 200) {
                                Swal.fire({
                                    title: 'Cita Agendada',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                setIsOpen(false);
                            } else {
                                Swal.fire({
                                    title: 'Error al agendar cita',
                                    icon: 'error',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        }
                        createCita();
                    }
                })   
        }
    }

    console.log("as",user);
    return (
        <>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Doctor</label>
                    <select className="form-select" id="exampleFormControlInput1" onChange={e => setDoctor(e.target.value)}>
                        <option value={null}>Seleccionar --</option>
                        <option value={"garcia@gmail.com"}>Dr. Garcia</option>
                        <option value={"who@gmail.com"} >Dr. Who</option>
                        <option value={"juan@gmail.com"}>Dr. Juan</option>
                    </select>

                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Fecha</label>
                        <input type="date" className="form-control" id="exampleFormControlInput1" min={today} onChange={e => setDate(e.target.value)}/>
                    </div>
                    <button className="btn btn-primary buttonprimary" onClick={() => confirm(doctor,date)}>Agendar</button>
                </div>
            
        </>
    )
}