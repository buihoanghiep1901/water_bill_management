// @ts-nocheck
import React, {useContext, useState } from 'react'
import { clientRef } from '../../config/firebase_config'
import {doc, setDoc} from "firebase/firestore"; 
import {Button,Modal,Form} from 'react-bootstrap';
import currentDate from '../../utils/currentDate';
import AppContext from '../../Context/Context';
function UpdateClient(prop) {
    const {role,showUpdate,reload,setShowUpdate,setReload}=useContext(AppContext)
    
    const [fullname, setFullname]=useState("")
    const [firstRead, setFirstRead]=useState(0)
    const [phone, setPhone]=useState("")
    const [address, setAddress]=useState("")
    const [status, setStatus]=useState(true)
    const [category, setCategory]=useState(true)
    console.log('prop update '+JSON.stringify(prop))

    const checkType=(prop)=>{
        if (typeof(prop)=='boolean') {
            return prop
        }else if(prop==="1"){
            return true;
        }else{
            return false;
        }
    }

    const docData = {
      uid:  prop.client.uid,
      fullname:fullname ==="" ? prop.client.fullname : fullname,
      phone: phone===''? prop.client.phone: phone ,
      firstreading: firstRead ===""? prop.client.password : firstRead,
      address: address===""? prop.client.address : address,
      category: checkType(category),
      status: checkType(status),
      date_created:  currentDate(),
      date_updated:  currentDate(),
    };

    const resetData=()=>{
      setFullname('')
      setPhone('')
      setFirstRead('')
      setAddress('')
      setStatus(true)
      setCategory(true)

    }

    const handleUpdateclient= async ()=>{
        console.log('update client doc : '+ JSON.stringify(docData))  
        await setDoc(doc(clientRef,prop.client.uid),docData)
        setShowUpdate(false);
        setReload(!reload)
        resetData()
      }
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
            Update client
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
                defaultValue={prop.client.fullname}
                onChange={e=>setFullname(e.target.value)}
                
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>First Read</Form.Label>
              <Form.Control
                type="text"
                placeholder="3636.6"
                name='pass'
                defaultValue={prop.client.firstreading}
                onChange={e=>setFirstRead(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="0123456"
                name='phone'
                defaultValue={prop.client.phone}
                onChange={e=>setPhone(e.target.value)}
              />
            </Form.Group>
          
            <Form.Group className="mb-3" >
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="1 Dai Co Viet"
                name='address'
                defaultValue={prop.client.address}
                onChange={e=>setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              className='mb-3'
              onChange={e=>setStatus(e.target.value)} 
              name='status'
              defaultValue={prop.client.status? 1: 2}>
              <option>Choose Status </option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </Form.Select>

            <Form.Select 
              className='mb-3'
              onChange={e=>setCategory(e.target.value)} 
              name='category'
              defaultValue={prop.client.category? 1: 2}>
              <option>Choose Category </option>
              <option value="1">Resident</option>
              <option value="2">Business</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowUpdate(false)}}>
            Close
          </Button>
          {role&&
            <Button type='submit' onClick={() =>{handleUpdateclient()}}>
              Submit
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default UpdateClient