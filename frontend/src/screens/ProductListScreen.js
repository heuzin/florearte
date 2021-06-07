import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import  { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct } from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Tem certeza?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        // CREATE PRODUCT
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Produtos</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Adicionar Produto
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danget'>{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>PRECO</th>
                            <th>CATEGORIA</th>
                            <th>MARCA</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{addDecimals(product.price)}R$</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default ProductListScreen
