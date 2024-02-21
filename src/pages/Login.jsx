import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useSnackbar } from 'notistack';

import logoImg from "../assets/logo-caja.png"

import {
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

// Reglas de validación
import LoginSchema from '../schemas/LoginSchema';

// API
import UsersService from '../services/user.service';

export default function Login({ onLogin }) {

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    const initialValues = {
        profile: '',
        password: '',
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = async (values, { resetForm }) => {

        setLoading(true);

        const { profile, password } = values

        try {
            const {token} = await UsersService.login(profile, password)
            onLogin(token)
        } catch (errorMessage) {
            setLoading(false);
            enqueueSnackbar(errorMessage, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }
    }

    return (

        <section>
            <div className="row g-0">

                <div className="col-lg-7 img-1 d-none d-lg-block">

                    <div className="carousel-item min-vh-100 active">

                        <div className="carousel-caption d-none d-md-block">

                            <h5 className="font-weight-bold">Caja de Retiros, Jubilaciones y Pensiones de la Policía Federal</h5>

                            <span className="badge text-bg-info">Control de Visitantes</span>

                        </div>

                    </div>

                </div>

                <div className="col-lg-5 bg-dark d-flex flex-column align-items-end min-vh-100">

                    <div className="px-lg-5 pt-lg-4 pb-lg-3 p-4 mb-3 w-100">
                        <img
                            src={logoImg}
                            alt="login-icon"
                            style={{ height: '7rem' }}
                            className='img-fluid'
                        />
                    </div>

                    <div className="form-login w-100 px-lg-5 py-lg-4 p-4 h-100 d-flex flex-column justify-content-between">

                        <h2 className="font-weight-bold mb-4 h1 text-light">Bienvenido a CRJPPF</h2>

                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={LoginSchema}
                        >

                            {({ errors }) => (

                                <Form className="mb-5 h-75">

                                    <div className="d-flex flex-column h-100 justify-content-between">

                                        <div>

                                            {/* profile */}
                                            <div className="mb-4">

                                                <label className="form-label font-weight-bold text-light" htmlFor="profile">Perfil</label>

                                                <Field
                                                    className='form-control border-0 mb-2'
                                                    placeholder="Perfil"
                                                    name='profile'
                                                    id='profile'
                                                />

                                                <ErrorMessage
                                                    name='profile'
                                                    component={() => (
                                                        <div className="text-warning">
                                                            {errors.profile}
                                                        </div>
                                                    )}
                                                />

                                            </div>

                                            {/* password */}
                                            <div className="mb-4">

                                                <label className="form-label font-weight-bold text-light" htmlFor="password">Contraseña</label>

                                                <div className="input-group">

                                                    <Field
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="form-control border-0 mb-2"
                                                        placeholder="Contraseña"
                                                        name="password"
                                                        id="password"
                                                    />

                                                    <span
                                                        id="password-toggle"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '40%',
                                                            right: '1rem',
                                                            transform: 'translateY(-50%)',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                    </span>

                                                </div>

                                                <ErrorMessage
                                                    name='password'
                                                    component={() => (
                                                        <div className="text-warning">
                                                            {errors.password}
                                                        </div>
                                                    )}
                                                />

                                            </div>

                                        </div>

                                        {loading ? (
                                            <Button
                                                type='button'
                                                variant="primary"
                                                disabled
                                                className="btn w-100"
                                            >
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Cargando...
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                type='submit'
                                                className="btn w-100"
                                            >
                                                Iniciar Sesion
                                            </Button>
                                        )}

                                    </div>

                                </Form>

                            )}

                        </Formik>

                    </div>

                </div>

            </div>

        </section>

    );

}