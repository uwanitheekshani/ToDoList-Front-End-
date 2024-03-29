import React, { useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

function Create() {
    const [task, setTask] = useState();
    const [description, setDescription] = useState();
    const [showAlert, setShowAlert] = useState(false);

    const handleAdd = () => {
        if (!task || !description) {
            setShowAlert(true);
        } else {
            axios.post('http://localhost:3001/add', { task: task, description: description })
                .then(result => {
                    window.location.reload()
                })
                .catch(err => console.log(err))
        }

    }







    return (

        <Container>
            <Row>
                <Col  >
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Enter Task" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setTask(e.target.value)} style={{
                            padding: 10,
                            border: "1px solid #6D214F",
                            outline: "none"
                        }} />
                    </div>
                </Col>
                <Col  >
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Description" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setDescription(e.target.value)} style={{
                            padding: 10,
                            border: "1px solid #6D214F",
                            // borderColor: '#6D214F',
                            // borderWidth:2,
                            outline: "none"
                        }} />
                    </div>
                </Col>
                <Col className="d-flex justify-content-end">

                    <div>
                        <button class="btn" type="button" onClick={handleAdd} style={{
                            padding: 10,
                            //backgroundColor: '#B33771',
                            color: 'black',
                            cursor: 'pointer',
                            borderColor: '#6D214F',
                            borderWidth: 2
                        }}>Add+</button>
                    </div>


                </Col>
            </Row>
            {showAlert && (
                <Row>
                    <Col>
                        {/* <Alert variant="danger">Please enter both task and description.</Alert> */}
                        <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
                            <div className="d-flex align-items-center">
                                <BsFillExclamationTriangleFill className="me-2" /> {/* Use the Bootstrap exclamation triangle icon */}
                                <div>
                                    Please enter both task and description.
                                </div>
                            </div>
                        </Alert>

                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default Create