import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useSnackbar } from 'notistack';

export default function FormConfirm({ showConfirm, setShowConfirm, action, setAction, setUpdate = (() => { }), update = true }) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const cancel = () => {
        setAction({})
        setShowConfirm(false)
    }

    const confirm = async () => {

        try {

            setLoading(true);

            if (Array.isArray(action.service)) {
                const promises = action.service.map(async (service, index) => {
                    await service(...(Array.isArray(action.params[index]) ? action.params[index] : [action.params[index]]))
                })

                await Promise.all(promises)
            } else {
                await action.service(...(Array.isArray(action.params) ? action.params : [action.params]))
            }

            setShowConfirm(false)
            setLoading(false)
            setUpdate(!update)
            action.uri && navigate(action.uri)
            setAction({})

            enqueueSnackbar('¡Acción realizada exitosamente!', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })

        } catch (errorMessage) {

            setLoading(false)
            setAction({})
            setShowConfirm(false)
            setUpdate(!update)
            action.uri && navigate(action.uri)

            enqueueSnackbar(errorMessage, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }
    }

    const confirmButtonRef = useRef(null);

    useEffect(() => {

        if (!showConfirm) return
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                confirmButtonRef.current.click();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [showConfirm]);

    return (
        <>

            <Modal
                show={showConfirm}
                onHide={cancel}
                centered
                backdrop="static"
                keyboard={false}
            >

                <Modal.Header closeButton>
                    <Modal.Title> Confirmar Acción </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {action.msg || "¿Estas seguro que deseas continuar?"}
                </Modal.Body>

                <Modal.Footer>

                    <Button variant="secondary" onClick={cancel}>
                        Cancelar
                    </Button>

                    {loading ? (
                        <Button type='button' variant="primary" disabled>
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
                            ref={confirmButtonRef}
                            variant="primary"
                            type='submit'
                            onClick={confirm}
                        >
                            Confirmar
                        </Button>
                    )}

                </Modal.Footer>

            </Modal>
        </>
    );
}
