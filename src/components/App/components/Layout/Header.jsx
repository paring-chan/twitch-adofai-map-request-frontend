import React from 'react';
import {Button, Form, Modal, Navbar} from "react-bootstrap";
import axios from "axios";
import {API_URL} from "../../constants";

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
                    const data = new FormData(event.target)
                    const obj = {}
                    data.forEach((v, k) => obj[k] = v)
                    axios.post(`${API_URL}/request`, obj).catch(() => null).then(() => {
                        setProcessing(false)
                        setModalShow(false)
                    })
                }}>
                    <Modal.Body>
                        <Form.Group controlId="formTitle">
                            <Form.Label>맵 제목</Form.Label>
                            <Form.Control readOnly={processing} required type="text" name="title"/>
                        </Form.Group>
                        <Form.Group controlId="formURL">
                            <Form.Label>맵 링크</Form.Label>
                            <Form.Control type="url" required readOnly={processing} name="link"/>
                        </Form.Group>
                        <Form.Group controlId="formLvl">
                            <Form.Label>포럼 레벨(선택)</Form.Label>
                            <Form.Control type="number" name="forumLevel" min={1} max={20} readOnly={processing}/>
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