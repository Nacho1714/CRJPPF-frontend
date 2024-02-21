import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonGoBack from '../components/others/ButtonGoBack';
import { useSnackbar } from 'notistack';

import VisitorService from '../services/visitor.service';

function Detail() {

    const { id } = useParams();
    const [visitor, setVisitor] = useState({});

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        (async () => {
            try {
                const visitor = await VisitorService.findByIdMapping(id)
                setVisitor(visitor)
            } catch (errorMessage) {
                enqueueSnackbar(errorMessage, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
            }
        })()

    }, [id])

    return (

        <div className="content h-100">

            <section className="py-3">

                <div className="container">

                    <div className="row">

                        <div className="col-lg-8">


                            <h2 className="h1 fw-bold mb-0 d-inline">{`${visitor.last_name} ${visitor.name}`}</h2>

                            <p className="lead text-muted">Detalle del visitante</p>

                        </div>

                        <div className="col-lg-4 d-flex justify-content-end">

                            <ButtonGoBack />

                        </div>

                    </div>

                </div>

            </section>

            <section className="bg-grey h-100">

                <Container>

                    {/* Detalle */}
                    <Row>

                        <Col className='mt-5' xs={6}>

                            <Col xs={12}>

                                <img src={visitor.image} alt="Imagen del visitante" className="img-fluid" />

                            </Col>

                        </Col>


                        {/* Detalle */}
                        <Col className="mt-5" xs={6}>

                            <Row>

                                <Col xs={6}>

                                    <h3 className="mb-4">Detalle</h3>

                                    {/* Nombre */}
                                    <Col xs={12}>

                                        <p>
                                            <span className="fw-bold">Nombre: </span>
                                            {visitor.name}
                                        </p>

                                    </Col>

                                    {/* Apellido */}
                                    <Col xs={12}>

                                        <p>
                                            <span className="fw-bold">Apellido: </span>
                                            {visitor.last_name}
                                        </p>

                                    </Col>

                                    {/* T. Doc: */}
                                    <Col xs={12}>

                                        <p>
                                            <span className="fw-bold">T. Doc: </span>
                                            {visitor.document_type}
                                        </p>

                                    </Col>

                                    {/* N° Doc */}
                                    <Col xs={12}>

                                        <p>
                                            <span className="fw-bold">N° Doc: </span>
                                            {visitor.document_number}

                                        </p>

                                    </Col>

                                </Col>

                                <Col xs={6}>

                                    <h3 className="mb-4">Datos de la visita</h3>

                                    {/* Empleado */}
                                    <Col xs={12}>

                                        <p>
                                            <span className="fw-bold">Empleado: </span>
                                            {visitor.employee}
                                        </p>

                                    </Col>

                                    {/* Oficina */}
                                    <Col xs={12}>

                                        <p>
                                            <span className="fw-bold">Oficina: </span>
                                            {visitor.office}
                                        </p>

                                    </Col>

                                </Col>

                            </Row>

                            <Row>

                                <Col xs={12}>

                                    <h3 className="mb-4">Observación</h3>

                                    {/* Usuario */}
                                    <Col xs={12}>

                                        <p>
                                            <span className="fw-bold">Usuario: </span>
                                            {visitor.user}
                                        </p>

                                    </Col>

                                    {/* Entrada */}
                                    <Col xs={12}>
                                        <p>
                                            <span className="fw-bold">H. Entrada: </span>
                                            {visitor.entry?.slice(11, 16)}
                                        </p>
                                    </Col>

                                    {/* Nota */}
                                    <Col xs={12}>
                                        <p>
                                            <span className='fw-bold'>Nota: </span>
                                            {visitor.note || 'Sin observaciones'}
                                        </p>
                                    </Col>

                                </Col>

                            </Row>

                        </Col>

                    </Row>

                </Container>

            </section >

        </div >

    )
}

export default Detail