import React from 'react';
import {Button, Form, Modal, Navbar} from "react-bootstrap";

const AppLayoutHeader = () => {
    const [modalShow, setModalShow] = React.useState(false)
    const [processing, setProcessing] = React.useState(false)

    return (
        <>
            <Navbar bg="primary">
                <Navbar.Brand className="text-white">
                    얼불춤 맵추천
                </Navbar.Brand>
                <Button variant="outline-light" className="ml-auto" onClick={() => setModalShow(true)}>
                    추천하기
                </Button>
            </Navbar>
            <Modal show={modalShow} onHide={() => !processing && setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>맵 추천하기</Modal.Title>
                </Modal.Header>
                <Form onSubmit={event => {
                    event.preventDefault()
                    setProcessing(true)
                }}>
                    <Modal.Body>
                        <Form.Group controlId="formTitle">
                            <Form.Label>맵 제목</Form.Label>
                            <Form.Control readOnly={processing} required type="text"/>
                        </Form.Group>
                        <Form.Group controlId="formURL">
                            <Form.Label>맵 링크</Form.Label>
                            <Form.Control type="url" required readOnly={processing}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={processing} type="submit">
                            추천하기
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default AppLayoutHeader;