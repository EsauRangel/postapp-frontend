import { CardContainer } from './personalComponents/CardContainer';
import { useSelector } from 'react-redux';
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import { InputApp } from './personalComponents/InputApp';
import { usePostTable } from '../hooks/usePostTable';

export const PostTable = () => {

    const {
        values,
        handleShowText,
        validItem,
        handleSetModal,
        formatDate,
        handleInputChange,
    } = usePostTable();

    const { q } = values;
    const { posts } = useSelector(state => state.posts);

    return (
        <CardContainer title="Posts">

            <Container>
                <Row>

                    <Col sm={4}>
                        <InputApp
                            title="Busqueda"
                            placeholder="autor, titulo, contenido..."
                            type="text"
                            name="q"
                            value={q}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col sm={12} className='text-end'>
                        <Button variant='primary' onClick={handleSetModal}>
                            Nuevo Post
                        </Button>
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col>
                        {posts.length > 0 ? (<Table
                            striped
                            bordered
                            responsive
                        >
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Autor</th>
                                    <th>Contenido</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>

                            <tbody>
                                {posts.map(post =>
                                (
                                    <tr key={post.id} onClick={() => validItem(post.id)}>
                                        <td>{post.title}</td>
                                        <td>{post.author}</td>
                                        <td >{handleShowText(post.id, post.content)}</td>
                                        <td>{formatDate(post.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>) :
                            <>
                                <h3>Ho hay registros por mostrar.</h3>
                            </>}
                    </Col>
                </Row>
            </Container>
        </CardContainer>
    )
}
