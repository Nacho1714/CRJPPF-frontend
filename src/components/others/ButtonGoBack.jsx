
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ButtonGoBack() {
    
    const navigate = useNavigate();

    function handleClick() {
        navigate(-1); // retrocede a la ruta anterior
    }

    return (
        <Button type='button' variant="primary" onClick={handleClick} className="btn w-75 align-self-center">
            Atrás
        </Button>
    );
}

export default ButtonGoBack;
