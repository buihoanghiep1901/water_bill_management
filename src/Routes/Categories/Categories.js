import React from 'react'
import { Accordion } from 'react-bootstrap'
import './category.css'

function Categories() {
  return (
    <>
    <Accordion defaultActiveKey="0" className='category'>
      <Accordion.Item eventKey="0" className='mb-4'>
        <Accordion.Header>Business</Accordion.Header>
        <Accordion.Body>

          15000vnd per number
          
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className='mb-4'>
        <Accordion.Header>Resident</Accordion.Header>
        <Accordion.Body>
          <p>0-10: 7500 per number</p>
          <p>10-20: 8800 per number</p>
          <p>20-30: 12000 per number</p>
          <p>30 and more: 24000 per number</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className='mb-4'>
        <Accordion.Header>Type 3</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className='mb-4'>
        <Accordion.Header>Type 4</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" className='mb-4'>
        <Accordion.Header>Type 5</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  )
}

export default Categories