import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Sidebar from './SideBar'

export default function RoutePrivate({ isAutenticate, setIsAutenticate, children }) {

    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (!token) {
            setIsAutenticate(false)
            navigate('/login')
        } 

    }, [])

    return isAutenticate ? (
        <div className="d-flex">
            <Sidebar setIsAutenticate={setIsAutenticate} />
            <div className="w-100">
                {children}
            </div>
        </div>
    ) : null
}
