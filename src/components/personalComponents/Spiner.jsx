import { useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const Spiner = () => {
    const { isLoading } = useSelector(state => state.posts);

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <>


            <Modal
                show={isLoading}
                backdrop="static"
                centered
                dialogClassName="modal-spinner"
            >
                <Modal.Body className="text-center">
                    <Spinner animation="border" role="status">
                        <div className="loading animate__animated animate__fadeIn"></div>
                    </Spinner>
                    <p>Cargando...</p>
                </Modal.Body>
            </Modal>
        </>
    );
}