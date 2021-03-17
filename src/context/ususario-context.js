import React, { useEffect, useState, useMemo } from 'react';
import serviceAuth from '../services/serviceAuth';

const UserContext = React.createContext();

export const UserProvider = (props) => {

    const [usuario, setUsuario] = useState({})

    const chartSelectedID = localStorage.getItem('estid')

    useEffect(()=> {
        if (chartSelectedID) {
            getUserInfo()
        }
    }, [])

    const getUserInfo = async () => {
        await serviceAuth.login().then(res => {
            setUsuario(res)
        })
    }

    const value = useMemo(() => {
        return ({
            usuario
        })
    }, [usuario])

    return <UserContext.Provider value={value} {...props}/>

}

export const useUsuario = () => {
    const context = React.useContext(UserContext)
    if (!context) {
        throw new Error('El usuario debe estar dentro del proveedor UserContext')
    }
    return context
}