// @ts-nocheck
import React, {useContext, useState } from 'react'
import { billRef, clientRef } from '../../config/firebase_config'
import {doc, setDoc, getDoc} from "firebase/firestore"; 
import {Button,Modal,Form} from 'react-bootstrap';
import currentDate from '../../utils/currentDate';
import AppContext from '../../Context/Context';
import '../User/Modal.css'
function CreateBill() {

    const {showCreate,reload,setShowCreate,setReload}=useContext(AppContext)
    const [idClient,setIdClient]=useState('')
    const [clientData, setClientData]=useState({})
    const [preRead, setPreRead]=useState(0)
    const [currRead, setCurrRead]=useState(0)
    const [readingDate, setReadingDate]=useState("")
    const [dueDate, setDueDate]=useState("")
    const [status, setStatus]=useState(true)

    const getClient=async(clientID)=>{
        const result= await getDoc(doc(clientRef,clientID)) 
        setClientData(result.data())
    }

    const getTotal=(amount)=>{
        if (clientData.category) {
            if (amount<= 10) {
                return 7500*amount
            }else if (amount <= 20) {
                return 7500*10 +8800*(amount-10)
            }else if (amount <= 30) {
                return 7500*10 +8800*10 +12000*(amount -20)
            }else if (amount >30) {
                return 7500*10 +8800*10 + 12000*10 +24000*(amount -30)
            }
        }else{
            return amount*15000
        }
    }

    const docData = {
      uid:   String(Date.now()) ,
      clientID:   clientData.uid ,
      previous_read: preRead,
      current_read: currRead,
      amount:Math.floor(currRead-preRead),
      total:getTotal(Math.floor(currRead-preRead)),
      reading_date: readingDate,
      due_date: dueDate,
      status: status==="1" ? true:false,
      date_created:  currentDate(),
      date_updated:  currentDate(),
    };

    const resetData=()=>{
      setPreRead(0)
      setCurrRead(0)
      setReadingDate("")
      setDueDate("")
      setClientData({})
      setStatus(true)
    }

    
    const handleCreateBill= async ()=>{
      console.log('create bill doc : '+ JSON.stringify(docData))
      // console.log('create bill modal : '+ JSON.stringify(modalData))
      await setDoc(doc(billRef,docData.uid),docData);
      resetData()
      setShowCreate(false);
      setReload(!reload)
    }
  return (
    <>
        <Modal
        scrollable
        show={showCreate}
        onHide={() => {setShowCreate(false)}}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add new bill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 d-flex" >
              <Form.Control
                className='me-2'
                type="text"
                placeholder="Enter ID of client here"
                name='uid'
                onChange={e=>setIdClient(e.target.value)}
              />
              <Button onClick={() =>{getClient(idClient)}}>
                Search
              </Button>

            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                name='fullname'
                value={clientData.fullname}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name='phone number'
                value={clientData.phone}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name='address'
                value={clientData.address}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name='address'
                value={clientData.category ? 'Resident':'Business'}
              />
            </Form.Group>

            <div className='d-flex justify-content-between'>
                <Form.Group className="mb-3" >
                <Form.Label>Previous Number</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="456.36"
                    name='pre read'
                    onChange={e=>setPreRead(e.target.value)}
                />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Current Number</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="500.36"
                    name='curr read'
                    onChange={e=>setCurrRead(e.target.value)}
                />
                </Form.Group>
            </div>

            <div className='d-flex justify-content-around'>
              <Form.Group className="mb-3" >
                <Form.Label>Amount </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="500.36"
                  name='amount'
                  value={docData.amount}
                />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="500.36"
                  name='amount'
                  value={docData.total}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" >
              <Form.Label>Reading Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="0123456"
                name='read date'
                onChange={e=>setReadingDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="0123456"
                name='due date'
                onChange={e=>setDueDate(e.target.value)}
              />
            </Form.Group>

            <Form.Select 
              onChange={e=>setStatus(e.target.value)} 
              name='status'>
              <option>Choose Status </option>
              <option value="1">Paid</option>
              <option value="2">Pending</option>
            </Form.Select>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Close
          </Button>
          <Button type='submit' onClick={() =>{handleCreateBill()}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default CreateBill