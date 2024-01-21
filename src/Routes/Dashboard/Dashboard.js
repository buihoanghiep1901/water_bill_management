// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react'
import Papa from 'papaparse'
import {getDocs, doc, updateDoc,deleteField, setDoc} from "firebase/firestore"; 
import AppContext from '../../Context/Context'
import { billRef, categoryRef, clientRef, testRef, userRef } from '../../config/firebase_config';
import {Card, Form,Button} from 'react-bootstrap'
import './Dashboard.css'
function Dashboard() {
  const{reload}=useContext(AppContext)
  const [data,setData]=useState("")

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
  
  const handleFile= async (e)=>{
    const file= await e.target.files[0]
    Papa.parse(file,{
      header: true,
      //delete the last line that is empty
      skipEmptyLines: true,
      complete: (results)=>{
        setData(results.data)
      },
    })

    console.log("data in CVS FILE:\n",data.length, JSON.stringify(data))
  }

  const handleImport= async ()=>{
    data.forEach(async (row)=>{
      await setDoc(doc(testRef,row.id),row)
    })
  }

  const handleExport= async ()=>{
    const result=await getDocs(testRef)
    result.forEach(async (row)=>{
      await setDoc(doc(testRef,row.uid),row)
    })
  }

  const handleUpdate= async ()=>{
    const result = await getDocs(billRef)
    result.forEach((bill)=>{
      updateDoc(doc(billRef,bill.data().id),{
        // clientID: bill.data().uid
        id: deleteField(),
      })
    })
  }

  return (
    <>
      <Button onClick={()=>{handleUpdate()}}>
        Import
      </Button>

      <Button onClick={()=>{handleExport()}}>
        Export
      </Button>

      <Form>
        <Form.Control type="file" accept='.csv' onChange={(e)=>{handleFile(e)}} />
      </Form>

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

      

