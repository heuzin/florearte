import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import  { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const  [address, setAddress] = useState(shippingAddress.address)
    const  [city, setCity] = useState(shippingAddress.city)
    const  [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const  [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Rua</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Endereço' 
                        value={address} 
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group style={{ paddingTop: '10px' }} controlId='city'>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Cidade' 
                        value={city} 
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group style={{ paddingTop: '10px' }} controlId='postalCode'>
                    <Form.Label>Codigo Postal</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Codigo Postal' 
                        value={postalCode} 
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group style={{ paddingTop: '10px' }} controlId='country'>
                    <Form.Label>País</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='País' 
                        value={country} 
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button style={{ marginTop: '10px' }} type='submit' variant='primary'>
                    Continuar
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
