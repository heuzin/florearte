import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import Paginate from '../components/Paginate'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <div>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Voltar</Link>}
            <h1>Ultimos Produtos</h1>
            {loading ? ( 
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={3} lx={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate 
                    pages={pages} 
                    page={page} 
                    keyword={keyword ? keyword : ''}
                />
                </div>
                )
            } 
        </div>
    )
}

export default HomeScreen
