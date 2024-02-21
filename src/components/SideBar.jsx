import { Link } from "react-router-dom";

import logoImg from "../assets/logo-caja.png"

import {
    FaTh,
    FaSignOutAlt,
} from "react-icons/fa";


function Sidebar({ setIsAutenticate }) {

    const onLogout = async () => {

        setIsAutenticate(false)
        localStorage.removeItem('token')
    }

    return (

        <div id="sidebar-container">

            <div className="logo mb-5">
                <img
                    src={logoImg}
                    alt="login-icon"
                    style={{ height: '5rem' }}
                    className="mb-3"
                />

                <p className="text-light h6">Panel de administración</p>
            </div>

            <div className="menu d-flex flex-column h-100">

                <div className="" style={{ height:"60%" }}>
                    <Link to="/" className="d-block text-light p-3"><FaTh /> Inicio</Link>
                </div>

                <div>
                    <Link to="/login" onClick={onLogout} className="d-block text-light p-3">
                        <FaSignOutAlt /> Cerrar Sesión
                    </Link>
                </div>

            </div>

        </div>

    )
}

export default Sidebar;