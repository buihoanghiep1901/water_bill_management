// @ts-nocheck
import React from 'react'
import { NavDropdown, Nav,Col, Row,Form,Navbar} from 'react-bootstrap'
import  "./navbar.css"
import vamp from '../../assets/images/vamp.jpg'
function NavigateBar() {
  return (
    <Navbar className="bg-white justify-content-between shadow  border-4 " id="navbar">
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                
        <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
                <Row>
                <Col xs="auto">
                    <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    />
                </Col>
                </Row>
            </Form>
            <Nav className="me-auto">
                <img src={vamp} alt="avatar" className='avatar' />
                <h3>King Vamp</h3>
                <NavDropdown title="drop" id="basic-nav-dropdown" className='text-danger '>
                    <NavDropdown.Item href="#action/3.1" className='text-danger '>User Info</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Sign out
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-pressed="false"
            autocomplete="off"
            aria-controls="basic-navbar-nav"
        >
            Button
        </button>
        
    </Navbar>
  )
}

export default NavigateBar