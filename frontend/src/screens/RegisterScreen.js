import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import  { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ history, location }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) =>  {
        e.preventDefault()
        // DISPATCH REGISTER
        if(password !== confirmPassword) {
            setMessage('Passwords nao combinam')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Criar Conta</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Nome' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group  style={{ paddingTop: '10px' }} controlId='email'>
                    <Form.Label>Endereço de Email</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group style={{ paddingTop: '10px' }} controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group style={{ paddingTop: '10px' }} controlId='confirmPassword'>
                    <Form.Label>Confirmar Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirmar Password' 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button style={{ marginTop: '10px' }} type='submit' variant='primary'>
                    Registrar
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Tem Uma Conta? <Link to={redirect  ? `/login?redirect=${redirect}` : '/login'}>
                        Entrar
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
