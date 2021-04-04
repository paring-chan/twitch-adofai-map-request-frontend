import React from 'react';
import clsx from "clsx";
import {Button, Form, Modal, Table} from "react-bootstrap";
import axios from "axios";
import {API_URL} from "../constants";

const Map = ({map, dark, mod}) => {
    const [show, setShow] = React.useState(false)
    const [processing, setProcessing] = React.useState(false)

    return (
        <>
            <div className={
                clsx("card", {
                    'bg-dark': dark
                })
            } onClick={() => setShow(true)} style={{
                cursor: 'pointer'
            }}>
                <div className="card-body">
                    {map.title}
                </div>
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{map.title}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={event => {
                    event.preventDefault()
                    setProcessing(true)
                    const data = new FormData(event.target)
                    const obj = {}
                    data.forEach((v, k) => obj[k] = v)
                    axios.put(`${API_URL}/request/${map._id}`, obj).catch(() => null).then(() => {
                        setProcessing(false)
                        setShow(false)
                    })
                }}>
                    <Modal.Body>
                        <Form.Group controlId={`${map._id}_title`}>
                            <Form.Label>맵 제목</Form.Label>
                            <Form.Control readOnly={!mod || processing} required type="text" name="title" value={map.title}/>
                        </Form.Group>
                        <Form.Group controlId={`${map._id}_link`}>
                            <Form.Label>맵 링크</Form.Label>
                            <Form.Control type="url" required readOnly={!mod || processing} value={map.link} name="link"/>
                        </Form.Group>
                        <Form.Group controlId={`${map._id}_lvl`}>
                            <Form.Label>포럼 레벨</Form.Label>
                            <Form.Control type="number" name="forumLevel" min={1} max={20} value={map.lvl} readOnly={!mod || processing}/>
                        </Form.Group>
                    </Modal.Body>
                    {
                        mod && <Modal.Footer>
                            <Button type="button" onClick={() => setShow(false)} variant="secondary">닫기</Button>
                            <Button type="button" variant="danger" onClick={() => {
                                setProcessing(true)
                                axios.delete(API_URL + '/requests/' + map._id).catch(console.error).then(()=>{
                                    setProcessing(false)
                                    setShow(false)
                                })
                            }}>삭제</Button>
                            <Button type="submit" variant="primary">저장</Button>
                        </Modal.Footer>
                    }
                </Form>
            </Modal>
        </>
    );
};

export default Map;