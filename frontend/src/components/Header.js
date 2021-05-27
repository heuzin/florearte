import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar bg='primary' expand='lg' variant='dark' collapseOnSelect>  
            <Container>  
                <LinkContainer to='/'>
                    <Navbar.Brand>Flor&Arte</Navbar.Brand>
                </LinkContainer>             
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav style={{marginLeft: 'auto'}}>
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className='fas fa-shopping-cart'></i>Cart
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link>
                                <i className='fas fa-user'></i>Sign In
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
