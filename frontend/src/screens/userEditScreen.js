import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import  { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'

const UserEditScreen = ({ history, match }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const[isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
        if(!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user, userId])

    const submitHandler = (e) =>  {
        e.preventDefault()
        
    }

    return (
        <div>
            <Link to ='/admin/userlist' className='btn btn-light my-3'>
                Voltar
            </Link>
            <FormContainer>
                <h1>Editar Usuario</h1>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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
                        <Form.Group style={{ paddingTop: '10px' }} controlId='isAdmin'>
                            <Form.Check 
                                type='checkbox' 
                                label='Is Admin' 
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
        
                        <Button style={{ marginTop: '10px' }} type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default UserEditScreen