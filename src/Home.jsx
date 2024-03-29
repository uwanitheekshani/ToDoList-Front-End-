import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsInfoCircleFill } from 'react-icons/bs';
import backgroundImage from '../src/assets/photo_2024-03-27_21-21-37.jpg';

function Home() {
    const [todos, setTodos] = useState([]);
    // const [showDescription, setShowDescription] = useState(false);
    // const [description, setDescription] = useState('');
    const [description, setDescription] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                window.location.reload()
            })

            // setTodos(result))
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const fetchDescription = (id) => {
        // setLoadingDescription(true);
        // axios.get('http://localhost:3001/description/'+id)
        //     .then(result => {
        //         setDescription(result.data.description);
        //         // setLoadingDescription(false);
        //         setShowDescription(true);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         // setLoadingDescription(false);
        //     });

        axios.get('http://localhost:3001/description/' + id)
        .then(result => {
            setDescription(prevState => ({
                ...prevState,
                [id]: result.data.description
            }));
        })
        .catch(err => {
            console.log(err);
        });
    };


    return (
        <div className='home' 
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >

            <h2>Todo List</h2>
            <Create />
            {
                todos.length === 0
                    ?
                    <div><h2>No Record</h2></div>
                    :
                    todos.map(todo => (
                        <Container>
                            <Row>
                                <Col>
                                    <div className='task'>
                                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                            {todo.status ?
                                                <BsFillCheckCircleFill className='iconfill'></BsFillCheckCircleFill>
                                                :
                                                <BsCircleFill className='icon' />
                                            }

                                            <p className={`m-0 ${todo.status ? "line_through" : ""}`} style={{padding:5}}>{todo.task}</p>
                                        </div>
                                        <div>
                                            <span className='info-icon-container'>
                                                <BsInfoCircleFill className='icon'
                                                    // onMouseEnter={() => setShowDescription(true)}
                                                    onMouseEnter={() => fetchDescription(todo._id)}
                                                    // onMouseLeave={() => setShowDescription(false)}
                                                    onMouseLeave={() => setDescription(prevState => ({ ...prevState, [todo._id]: '' }))} 
                                                />

                                                {description[todo._id] && (
                                                    // <div className="popup" style={{ color: 'black' }}>
                                                    //     <div className="content">
                                                    //         <p>{todo.description}</p>
                                                    //     </div>
                                                    // </div>
                                                    <div className="popup" style={{ color: 'black' }}>
                                                        <Row>
                                                            <Col>
                                                                <Alert>
                                                                    {/* {todo.description} */}
                                                                    {description[todo._id]}
                                                                </Alert>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )}

                                            </span>
                                            <span>
                                                <BsFillTrashFill className='icon'
                                                    onClick={() => handleDelete(todo._id)} />
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    ))
            }

        </div>
    )
}

export default Home