import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const Camera = ({ webcamRef, captureImage }) => {
    const videoConstraints = {
        width: "100%", // Modificar el ancho para que ocupe todo el espacio disponible
        height: "auto", // Utilizar altura automática para mantener la relación de aspecto
        facingMode: "user"
    };

    return (
        <div>
            <Webcam
                audio={false}
                screenshotFormat="image/webp"
                screenshotQuality="0"
                videoConstraints={videoConstraints}
                ref={webcamRef}
                style={{ width: "100%", height: "500px" }} 
            />
        </div>
    );
};

export default Camera;