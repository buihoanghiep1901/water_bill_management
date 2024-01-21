// @ts-nocheck
import React, {useContext, useState } from 'react'
import { billRef} from '../../config/firebase_config'
import {doc, setDoc,} from "firebase/firestore"; 
import {Button,Modal,Form} from 'react-bootstrap';
import currentDate from '../../utils/currentDate';
import AppContext from '../../Context/Context';
import '../User/Modal.css'
function UpdateBill(prop) {

    const {role,reload,showUpdate,setShowUpdate,setReload}=useContext(AppContext)
    const [clientData, setClientData]=useState({})
    const [preRead, setPreRead]=useState(0)
    const [currRead, setCurrRead]=useState(0)
    const [readingDate, setReadingDate]=useState("")
    const [dueDate, setDueDate]=useState("")
    const [status, setStatus]=useState(true)

    const getPreRead=()=>{
        return preRead===0 ? prop.bill.previous_read : preRead
    }
    const getCurrRead= ()=>{
        return currRead===0 ? prop.bill.current_read : currRead
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

    const checkType=()=>{
        if (typeof(status)=='boolean') {
            return status
        }else if(status==="1"){
            return true;
        }else{
            return false;
        }
    }

    const docData = {
      uid:   prop.bill.uid ,
      clientID: prop.bill.clientID ,
      previous_read:getPreRead() ,
      current_read: getCurrRead(),
      amount: Math.floor( getCurrRead()- getPreRead()),
      total:   getTotal(Math.floor( getCurrRead()- getPreRead())),
      reading_date: readingDate==="" ? prop.bill.reading_date :  readingDate,
      due_date: dueDate===""? prop.bill.due_date : dueDate,
      status: checkType(),
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
    
    const handleUpdateBill= async ()=>{
      console.log('create bill doc : '+ JSON.stringify(docData))
      // console.log('create bill modal : '+ JSON.stringify(modalData))
      await setDoc(doc(billRef,docData.uid),docData);
      resetData()
      setShowUpdate(false);
      setReload(!reload)
    }
    console.log("prop in update bill: "+ JSON.stringify(prop))
  return (
    <>
        <Modal
        scrollable
        show={showUpdate}
        onHide={() => {setShowUpdate(false)}}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Update bill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 d-flex" >
              <Form.Label>Client ID</Form.Label>
              <Form.Control
                className='me-2'
                type="text"
                name='client id'
                value={prop.client.uid}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                name='fullname'
                value={prop.client.fullname}                
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name='phone number'
                value={prop.client.phone}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name='address'
                value={prop.client.address}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name='address'
                value={prop.client.category ? 'Resident':'Business'}
              />
            </Form.Group>

            <div className='d-flex justify-content-between'>
                <Form.Group className="mb-3" >
                <Form.Label>Previous Number</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="456.36"
                    name='pre read'
                    defaultValue={prop.bill.previous_read}
                    onChange={e=>setPreRead(e.target.value)}
                />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Current Number</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="500.36"
                    name='curr read'
                    defaultValue={prop.bill.current_read}
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
                  value={getTotal(docData.amount)}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" >
              <Form.Label>Reading Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="0123456"
                name='read date'
                defaultValue={prop.bill.reading_date}
                onChange={e=>setReadingDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="0123456"
                name='due date'
                defaultValue={prop.bill.due_date}
                onChange={e=>setDueDate(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              defaultValue={prop.bill.status ? '1':'2'}
              onChange={e=>setStatus(e.target.value)} 
              name='status'>
              <option>Choose Status </option>
              <option value="1">Paid</option>
              <option value="2">Pending</option>
            </Form.Select>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdate(false)}>
            Close
          </Button>
          {
            role&&
            <Button type='submit' onClick={() =>{handleUpdateBill()}}>
              Submit
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default UpdateBill