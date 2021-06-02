import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import  { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ history, location }) => {
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) =>  {
        e.preventDefault()
        // DISPATCH LOGIN
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Entrar</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Endereço de Email</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Entre Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group style={{ paddingTop: '10px' }} controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Entre Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button style={{ marginTop: '10px' }} type='submit' variant='primary'>
                    Entrar
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Novo Usuario? <Link to={redirect  ? `/register?redirect=${redirect}` : '/register'}>
                        Criar Conta
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
