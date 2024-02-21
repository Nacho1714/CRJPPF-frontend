import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css'

import RoutePrivate from './components/RoutePrivate'

import Login from './pages/Login';
import Detail from './pages/Detail';

import Dashboard from './pages/Dashboard';

function App() {

    const navigate = useNavigate()
    const [isAutenticate, setIsAutenticate] = useState(false)

    useEffect(() => {

        const token = localStorage.getItem('token')

        token
            ? setIsAutenticate(true)
            : setIsAutenticate(false)

    }, [])

    function onLogin(token) {

        if (token) {
            localStorage.setItem('token', token)
            setIsAutenticate(true)
            navigate('/')
        } else {
            localStorage.removeItem('token')
            setIsAutenticate(false)
        }
    }

    return (

        <Routes>

            <Route path="/login" exact={true} element={<Login onLogin={onLogin} />} />

            <Route path="/" exact={true} element={
                <RoutePrivate isAutenticate={isAutenticate} setIsAutenticate={setIsAutenticate}>
                    <Dashboard />
                </RoutePrivate>
            } />

            <Route path="/visitor/:id" exact={true} element={
                <RoutePrivate isAutenticate={isAutenticate} setIsAutenticate={setIsAutenticate}>
                    <Detail />
                </RoutePrivate>
            } />

        </Routes>

    )
}

export default App
