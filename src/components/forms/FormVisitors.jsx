import { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSnackbar } from 'notistack';
import { Button, Modal, Carousel, Col, Container, Row } from 'react-bootstrap';
import { FaExclamationCircle, FaQuestionCircle } from "react-icons/fa";
import TooltipText from '../../components/TooltipText';

import Camera from '../Camera'
import { base64ImageToFile } from '../../helpers/format-image';

// Reglas de validación
import VisitorSchema from '../../schemas/VisitorSchema';

// Servicios API
import OfficeService from '../../services/dhs.service';
import EmployeeService from '../../services/employee.service';
import UserService from '../../services/user.service';
import VisitorService from '../../services/visitor.service';
import visitorService from '../../services/visitor.service';
import employeeService from '../../services/employee.service';

export default function FormVisitors({ setShowConfirm, setAction }) {
    
    const [show, setShow] = useState(false);
    const [indexModal, setIndexModal] = useState(0);

    const [officeId, setOfficeId] = useState("");
    const [offices, setOffices] = useState([]);

    const [employeeId, setEmployeeId] = useState("");
    const [employees, setEmployees] = useState([]);

    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const handleClose = () => {
        setShow(false)
        setIndexModal(0)
        setCapturedImage(null)
    }
    
    const handleChangeOffice = async (id) => {

        if(id === '') return

        try {
            const employees = await employeeService.findByOffice(id)
            setEmployees(employees)
        } catch (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }
    }

    const handleShow = async () => { 
        
        try {
            const offices = await OfficeService.findAll()
            const employees = await EmployeeService.findAll()
            setOffices(offices)
            setEmployees(employees)
        } catch (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }

        setShow(true)
    };

    const initialValues = {

        employee_fk: '',
        destination_fk: '',
        name: '',
        last_name: '',
        document_type: '',
        document_number: '',
        note: ''
    }

    const { enqueueSnackbar } = useSnackbar();

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        enqueueSnackbar("Captura exitosa", {
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            } 
        })
        setCapturedImage(imageSrc);
    };

    const onSubmit = async (values, { resetForm }) => {

        const formData = new FormData()

        try {
            const {user_id} = await UserService.decodeToken()

            values.user_fk = user_id
            if (capturedImage) values.file = base64ImageToFile(capturedImage)
        } catch (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                } 
            })
        }

        for (const key in values) {
            if (key in values) {
                formData.append(key, values[key]);
            }
        }

        setShow(false)

        setAction({
            service: VisitorService.create,
            params: [formData]
        })

        setShowConfirm(true)
        setIndexModal(0)
        setCapturedImage(null)
        resetForm()
    };

    return (

        <>
            <Button type="button" variant="primary" onClick={handleShow} className="btn  w-75 h-100 fs-4">
                Registrar
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                dialogClassName='modal-with'
                backdrop="static"
                keyboard={false}
            >
                <Container>

                    <Modal.Header closeButton>
                        <Modal.Title>Registrar Visitante</Modal.Title>
                    </Modal.Header>

                        <Carousel
                            slide={false}
                            controls={false}
                            activeIndex={indexModal}
                            indicators={false}
                        >
                            
                            <Carousel.Item>
                                
                                <Modal.Body>

                                    <Camera webcamRef={webcamRef} />

                                </Modal.Body>

                                <Modal.Footer>

                                    <Button type='button' variant="secondary" onClick={handleClose}>
                                        Cerrar
                                    </Button>

                                    <Button
                                        type='button'
                                        variant="primary"
                                        onClick={() => capturePhoto()}
                                    >
                                        Capturar
                                    </Button>

                                    <Button
                                        type='button'
                                        variant="primary"
                                        onClick={() => setIndexModal(indexModal + 1)}
                                    >
                                        Siguiente
                                    </Button>

                                </Modal.Footer>


                            </Carousel.Item>

                            <Carousel.Item>

                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={onSubmit}
                                    validationSchema={VisitorSchema}
                                >

                                    {({ errors, values }) => (

                                        <Form noValidate>

                                            <Modal.Body>

                                                <Container>

                                                    <Row>

                                                        <h3 className="mb-4">Visitante</h3>

                                                        {/* name */}
                                                        <Col xs={3}>

                                                            <div className="mb-3">

                                                                <label className="form-label" htmlFor="name">

                                                                    Nombre <TooltipText
                                                                        color={'text-danger'}
                                                                        text={<FaExclamationCircle />}
                                                                        msg={'campo obligatorio'}
                                                                        direction={'right'}
                                                                    />

                                                                </label>

                                                                <Field
                                                                    className='form-control'
                                                                    placeholder="Ingrese el nombre del visitante"
                                                                    name='name'
                                                                    id='name'
                                                                />

                                                                <ErrorMessage
                                                                    name='name'
                                                                    component={() => (
                                                                        <div className="messageInvalid">
                                                                            {errors.name}
                                                                        </div>
                                                                    )}
                                                                />

                                                            </div>

                                                        </Col>

                                                        {/* last_name */}
                                                        <Col xs={3}>

                                                            <div className="mb-3">

                                                                <label className="form-label" htmlFor="last_name">

                                                                    Apellido <TooltipText
                                                                        color={'text-danger'}
                                                                        text={<FaExclamationCircle />}
                                                                        msg={'campo obligatorio'}
                                                                        direction={'right'}
                                                                    />

                                                                </label>

                                                                <Field
                                                                    className='form-control'
                                                                    placeholder="Ingrese el apellido del visitante"
                                                                    name='last_name'
                                                                    id='last_name'
                                                                />

                                                                <ErrorMessage
                                                                    name='last_name'
                                                                    component={() => (
                                                                        <div className="messageInvalid">
                                                                            {errors.last_name}
                                                                        </div>
                                                                    )}
                                                                />

                                                            </div>

                                                        </Col>

                                                        {/* document_type */}
                                                        <Col xs={3}>

                                                            <div className="mb-3">

                                                                <label className="form-label" htmlFor="document_type">

                                                                    Tipo de Documento <TooltipText
                                                                        color={'text-danger'}
                                                                        text={<FaExclamationCircle />}
                                                                        msg={'campo obligatorio'}
                                                                        direction={'right'}
                                                                    />

                                                                </label>

                                                                <Field
                                                                    as='select'
                                                                    className='form-select'
                                                                    name='document_type'
                                                                    id='document_type'
                                                                >

                                                                    <option value=''>Seleccione una opcion</option>
                                                                    <option value={'DNI'}>DNI</option>
                                                                    <option value={'LE'}>LE</option>
                                                                    <option value={'LC'}>LC</option>
                                                                    <option value={'PAS'}>PAS</option>

                                                                </Field>

                                                                <ErrorMessage
                                                                    name='document_type'
                                                                    component={() => (
                                                                        <div className="messageInvalid">
                                                                            {errors.document_type}
                                                                        </div>
                                                                    )}
                                                                />

                                                            </div>

                                                        </Col>

                                                        {/* document_number */}
                                                        <Col xs={3}>

                                                            <div className="mb-3">

                                                                <label className="form-label" htmlFor="document_number">

                                                                    Número de Documento <TooltipText
                                                                        color={'text-danger'}
                                                                        text={<FaExclamationCircle />}
                                                                        msg={'campo obligatorio'}
                                                                        direction={'right'}
                                                                    /> <TooltipText
                                                                        color={'text-warning'}
                                                                        text={<FaQuestionCircle />}
                                                                        msg={'solo números o letras, sin guiones ni puntos'}
                                                                        direction={'right'}
                                                                    />

                                                                </label>

                                                                <Field
                                                                    className='form-control'
                                                                    placeholder="Ingrese el documento del visitante"
                                                                    name='document_number'
                                                                    id='document_number'
                                                                />

                                                                <ErrorMessage
                                                                    name='document_number'
                                                                    component={() => (
                                                                        <div className="messageInvalid">
                                                                            {errors.document_number}
                                                                        </div>
                                                                    )}
                                                                />

                                                            </div>

                                                        </Col>

                                                    </Row>

                                                    <Row>

                                                        {/* office */}
                                                        <Col xs={6}>

                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="destination_fk">

                                                                Oficina <TooltipText
                                                                    color={'text-danger'}
                                                                    text={<FaExclamationCircle />}
                                                                    msg={'campo obligatorio'}
                                                                    direction={'right'}
                                                                />

                                                            </label>

                                                                <Field
                                                                    as='select'
                                                                    className='form-select'
                                                                    name='destination_fk'
                                                                    id='destination_fk'
                                                                    validate={(e) => handleChangeOffice(e)}
                                                                >

                                                                    <option value=''>Seleccione una opcion</option>
                                                                    {
                                                                        offices.map((office) => (
                                                                            <option 
                                                                                key={office.destination_id} 
                                                                                value={office.destination_id}
                                                                            >
                                                                                {office.name}
                                                                            </option>
                                                                        ))
                                                                    }

                                                                </Field>

                                                            
                                                            <ErrorMessage
                                                                name='destination_fk'
                                                                component={() => (
                                                                    <div className="messageInvalid">
                                                                        {errors.destination_fk}
                                                                    </div>
                                                                )}
                                                            />

                                                        </div>

                                                        </Col>

                                                        {/* employee */}
                                                        <Col xs={6}>

                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="employee_fk">

                                                                    Empleado <TooltipText
                                                                        color={'text-danger'}
                                                                        text={<FaExclamationCircle />}
                                                                        msg={'campo obligatorio'}
                                                                        direction={'right'}
                                                                    />

                                                                </label>

                                                                <Field
                                                                    as='select'
                                                                    className='form-select'
                                                                    name='employee_fk'
                                                                    id='employee_fk'
                                                                >

                                                                    <option value=''>Seleccione una opcion</option>
                                                                    {
                                                                        employees.map((employee) => (
                                                                            <option key={employee.employee_id} value={employee.employee_id}>
                                                                                {`${employee.last_name} ${employee.name}`}
                                                                            </option>
                                                                        ))
                                                                    }

                                                                </Field>

                                                                <ErrorMessage
                                                                    name='employee_fk'
                                                                    component={() => (
                                                                        <div className="messageInvalid">
                                                                            {errors.employee_fk}
                                                                        </div>
                                                                    )}
                                                                />

                                                            </div>

                                                        </Col>

                                                    </Row>

                                                    <Row>

                                                        {/* note */}
                                                        <Col xs={6}>

                                                            <Row>

                                                                <Col xs={12}>

                                                                    <div className="mb-3">
                                                                        <label className="form-label" htmlFor="note">Nota</label>
                                                                        <Field
                                                                            as="textarea"
                                                                            rows={4}
                                                                            className='form-control'
                                                                            name='note'
                                                                            id='note'
                                                                        />

                                                                        <ErrorMessage
                                                                            name='note'
                                                                            component={() => (
                                                                                <div className="messageInvalid">
                                                                                    {errors.note}
                                                                                </div>
                                                                            )}
                                                                        />

                                                                    </div>

                                                                </Col>

                                                            </Row>

                                                        </Col>

                                                        {/* image */}
                                                        <Col xs={6}>

                                                            <Row>

                                                                <Col xs={12}>

                                                                    <img src={capturedImage} className="img-fluid" />

                                                                </Col>

                                                            </Row>

                                                        </Col>

                                                    </Row>

                                                </Container>

                                            </Modal.Body>

                                            <Modal.Footer>

                                                <Button type="button" variant="secondary" onClick={handleClose}>
                                                    Cancelar
                                                </Button>

                                                <Button variant="primary" type="submit">
                                                    Confirmar
                                                </Button>

                                            </Modal.Footer>

                                        </Form>
                                    )}

                                </Formik>

                            </Carousel.Item>

                        </Carousel>


                </Container>

            </Modal>

        </>

    );
}
