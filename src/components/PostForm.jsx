import { Modal, Button } from 'react-bootstrap';
import { InputApp } from './personalComponents/InputApp';
import { TextAreaApp } from './personalComponents/TextAreaApp';
import { usePost } from '../hooks/usePost';
import { useSelector } from 'react-redux';


export const PostForm = () => {
    const {
        handleInputChange,
        values,
        handleSubmit,
        handleClose
    } = usePost();

    const { title, author, content } = values;
    const { openModal } = useSelector(state => state.posts);

    return (
        <Modal show={openModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Formulario de Publicación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <InputApp
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            title={"Titulo"}
                            required
                            placeholder={"Titulo"}
                            value={title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <InputApp
                            type="text"
                            className="form-control"
                            id="author"
                            name="author"
                            title={"Nombre"}
                            required
                            placeholder={"Nombre"}
                            value={author}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <TextAreaApp
                            name="content"
                            title="Contenido"
                            value={content}
                            maxLength={150}
                            height={"100px"}
                            placeholder={"..."}
                            onChange={handleInputChange}
                            disabled={false}
                        />
                    </div>
                    <div className='d-flex flex-row justify-content-between'>
                    <Button variant="secondary" type="button" onClick={handleClose}>
                            Cerrar
                        </Button>

                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
