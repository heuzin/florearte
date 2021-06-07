import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import  { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productsConstants'

const ProductEditScreen = ({ history, match }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const[image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
        
    }, [dispatch, history, product, productId, successUpdate])

    const submitHandler = (e) =>  {
        e.preventDefault()
        
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

    return (
        <div>
            <Link to ='/admin/productlist' className='btn btn-light my-3'>
                Voltar
            </Link>
            <FormContainer>
                <h1>Editar Produto</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type='name' 
                                placeholder='Digite o nome' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group  style={{ paddingTop: '10px' }} controlId='price'>
                            <Form.Label>Preço</Form.Label>
                            <Form.Control 
                                type='number' 
                                placeholder='Digite o preço' 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group style={{ paddingTop: '10px' }} controlId='image'>
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Digite o url da Image' 
                                value={image} 
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group style={{ paddingTop: '10px' }} controlId='brand'>
                            <Form.Label>Marca</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Digite a marca' 
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group style={{ paddingTop: '10px' }} controlId='countInStock'>
                            <Form.Label>Quantidade em estoque</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Digite quantidade em estoque' 
                                value={countInStock} 
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group style={{ paddingTop: '10px' }} controlId='category'>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Digite categoria' 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group style={{ paddingTop: '10px' }} controlId='description'>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Digite descrição' 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
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

export default ProductEditScreen