// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react'
import {getDocs,} from "firebase/firestore"; 
import AppContext from '../../Context/Context'
import { billRef, categoryRef, clientRef, userRef } from '../../config/firebase_config';
import {Card} from 'react-bootstrap'
import './Dashboard.css'
function Dashboard() {
  const{reload}=useContext(AppContext)

  const [lengthUser, setLengthUser]=useState(0)
  const [lengthClient, setLengthClient]=useState(0)
  const [lengthBill, setLengthBill]=useState(0)
  const [lengthCategory, setLengthCategory]=useState(0)
  useEffect(()=>{
    const load=async ()=>{
      const lengthUser= (await getDocs(userRef)).docs.length;
      const lengthClient= (await getDocs(clientRef)).docs.length;
      const lengthBill= (await getDocs(billRef)).docs.length;
      const lengthCategory= (await getDocs(categoryRef)).docs.length;

      setLengthBill(lengthBill)
      setLengthCategory(lengthCategory)
      setLengthClient(lengthClient)
      setLengthUser(lengthUser)
    }
    load()
  },[reload]);
  
  
  return (
    <>
      
      <div className='d-flex justify-content-around flex-row flex-wrap align-items-center dashboard'>
        

        <Card style={{ width: '30rem' } } className="card">
          <Card.Img variant="top" className='card__image' style={{ backgroundColor: "lightcoral"}} />
          <Card.Body className='p-0 text-center' >
            <hr  className='m-0'/>
            <Card.Title>Total Staff</Card.Title>
            <Card.Text>
              {lengthUser}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '30rem' } } className="card">
          <Card.Img variant="top"  className='card__image' style={{ backgroundColor: "lightgreen"} }/>
          <Card.Body className='p-0 text-center'>
            <hr  className='m-0'/>
            <Card.Title>Total Client</Card.Title>
            <Card.Text>
              {lengthClient}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '30rem' } } className="card">
          <Card.Img variant="top"  className='card__image'  style={{ backgroundColor: "lightblue"} }/>
          <Card.Body className='p-0 text-center'>
            <hr  className='m-0'/>
            <Card.Title>Total Bills</Card.Title>
            <Card.Text>
              {lengthBill}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '30rem' } } className="card">
          <Card.Img variant="top"  className='card__image' style={{ backgroundColor: "#CBC3E3"} } />
          <Card.Body className='p-0 text-center'>
            <hr  className='m-0'/>
            <Card.Title>Total Category</Card.Title>
            <Card.Text>
              {lengthCategory}
            </Card.Text>
          </Card.Body>
        </Card>

      </div>
    
    </>

  )
}

export default Dashboard

      

