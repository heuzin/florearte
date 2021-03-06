import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import  { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const  [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Metodo de Pagamento</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Selecione o Metodo</Form.Label>
                
                <Col>
                    <Form.Check 
                        type='radio' 
                        label='PayPal ou  Cartão de Crédito' 
                        id='PayPal' 
                        name='paymentMethod' 
                        value='PayPal' 
                        checked onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>

                </Form.Group>
               
                <Button style={{ marginTop: '10px' }} type='submit' variant='primary'>
                    Continuar
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
