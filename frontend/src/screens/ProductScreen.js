import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productsConstants'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] =  useState(1)
    const [rating, setRating] =  useState(0)
    const [comment, setComment] =  useState('')

    const dispatch = useDispatch()

    const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error: errorProductReview, success:  successProductReview } = productReviewCreate

    useEffect(() => {
        if(successProductReview) {
            alert('Avaliação Enviada')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id)) 
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>Voltar</Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                <Meta title={product.name} />
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Preço: {addDecimals(product.price)}R$
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Descrição: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Preço:</Col>
                                        <Col>
                                            <strong>{addDecimals(product.price)}R$</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantidade</Col>
                                            <Col>
                                                <Form.Control 
                                                    as='select' 
                                                    value={qty} 
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {[...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'Em Estoque' : 'Fora de Estoque'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button 
                                        onClick={addToCartHandler}
                                        style={{width: '100%'}} 
                                        block 
                                        type='button' 
                                        disabled={product.countInStock === 0}
                                    >
                                        Addicionar ao Carrinho
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h2>Avaliações</h2>
                        {product.reviews.length === 0 && <Message>Nenhuma avaliação</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Escreva uma Avaliação</h2>
                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Avaliação</Form.Label>
                                                <Form.Control 
                                                    as='select' 
                                                    value={rating} 
                                                    onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Selecione...</option>
                                                        <option value='1'>1 - Ruim</option>
                                                        <option value='2'>2 - Razoável</option>
                                                        <option value='3'>3 - Bom</option>
                                                        <option value='4'>4 - Muito Bom</option>
                                                        <option value='5'>5 - Exelente</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment' style={{ paddingTop: '10px' }}>
                                                <Form.Label>Comentario</Form.Label>
                                                <Form.Control 
                                                    as='textarea' 
                                                    row='3' value={comment} 
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button style={{ marginTop: '10px' }} type='submit' variant='primary'>
                                                Enviar
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>Favor <Link to='/login'>entrar</Link> em uma conta para escrever uma avaliação</Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                    </Col>
                </Row>
                </div>
            )}           
        </div>
    )
}

export default ProductScreen
