import React from 'react'
import { useAuth } from '../Components/AuthContext'
import { Loading } from '../Components/Loading';

import { User } from '../Components/User/User';
import { Doctor } from '../Components/Doctor/Doctor';

export function Home(){
    const {rolUser, loading, user } = useAuth();

    if(loading){return <Loading/>}

    function renderByRol(rol) {
        switch (rol) {
            case "admin":
                return <h1>Admin</h1>
            case "user":
                return <User user={user}/>
            case "doctor":
                return <Doctor user={user}/>
            default:
                return <h1>Bloqueado</h1>
        }
    }

    return (
        <>
        <div>
            {renderByRol(rolUser)}
        </div>
        </>
    )
}
