// @ts-nocheck
import React, {useContext, useState } from 'react'
import { clientRef } from '../../config/firebase_config'
import {doc, setDoc} from "firebase/firestore"; 
import {Button,Modal,Form} from 'react-bootstrap';
import currentDate from '../../utils/currentDate';
import AppContext from '../../Context/Context';

function CreateClient() {

    const {showCreate,reload,setShowCreate,setReload}=useContext(AppContext)
     
    const [fullname, setFullname]=useState("")
    const [address, setAddress]=useState("")
    const [phone, setPhone]=useState("")
    const [firstRead, setFirstRead]=useState("")
    const [status, setStatus]=useState(true)
    const [category, setCategory]=useState(true)

    const docData = {
      uid:   String(Date.now()) ,
      fullname:fullname,
      phone: phone,
      firstreading:firstRead,
      address: address,
      status: status==="1" ? true:false,
      category: category==="1" ? true:false,
      date_created:  currentDate(),
      date_updated:  currentDate(),
    };

    const resetData=()=>{
      setFullname('')
      setPhone('')
      setAddress('')
      setFirstRead('')
      setCategory(true)
      setStatus(true)

    }

    const handleCreateclient= async ()=>{
      console.log('create client doc : '+ JSON.stringify(docData))
      // console.log('create client modal : '+ JSON.stringify(modalData))
      await setDoc(doc(clientRef,docData.uid),docData);
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
            Add new Client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="ng van A"
                name='fullname'
                onChange={e=>setFullname(e.target.value)}
                
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="0123456"
                name='phone'
                onChange={e=>setPhone(e.target.value)}
              />
            </Form.Group>
          
            <Form.Group className="mb-3" >
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="1 Dai Co Viet"
                name='address'
                onChange={e=>setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>First Read</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your pass"
                name='pass'
                onChange={e=>setFirstRead(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              className='mb-3'
              onChange={e=>setStatus(e.target.value)} 
              name='status'>
              <option>Choose Status </option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </Form.Select>

            <Form.Select
              className='mb-3'
              onChange={e=>setCategory(e.target.value)} 
              name='status'>
              <option>Choose Category </option>
              <option value="1">Resident</option>
              <option value="2">Business</option>
            </Form.Select>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Close
          </Button>
          <Button type='submit' onClick={() =>{handleCreateclient()}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default CreateClient