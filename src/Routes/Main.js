// @ts-nocheck
import React from 'react'
import {Row, Col} from "react-bootstrap";
import {Outlet} from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import NavigateBar from '../Components/Navbar/Navbar';
function Main() {
  
  return (
    <>
      <Row>
        <Col xs='1' sm='2'className='p-0'>
          <Sidebar/>
        </Col>
        <Col  xs='11' sm='10'className='p-0'>
          <Row>
            <NavigateBar/>
          </Row>
          <Row>
            <Outlet/>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Main