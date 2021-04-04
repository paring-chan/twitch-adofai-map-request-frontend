import React from 'react';
import clsx from "clsx";
import {Modal, Table} from "react-bootstrap";

const Map = ({map, dark}) => {
    const [show, setShow] = React.useState(false)

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
                <Modal.Body>
                    <Table hover bordered>
                        <tbody>
                        <tr>
                            <th>신청자</th>
                            <td>{map.requester}</td>
                        </tr>
                        <tr>
                            <th>다운로드</th>
                            <td>
                                <a target="_blank" href={map.link}>클릭</a>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Map;