// @ts-nocheck
import React, {useContext, useState } from 'react'
import { userRef } from '../../config/firebase_config'
import {doc, setDoc} from "firebase/firestore"; 
import {Button,Modal,Form} from 'react-bootstrap';
import currentDate from '../../utils/currentDate';
import AppContext from '../../Context/Context';
import './Modal.css'
function CreateUser() {

    const {showCreate,reload,setShowCreate,setReload}=useContext(AppContext)
     
    const [fullname, setFullname]=useState("")
    const [email, setEmail]=useState("")
    const [phone, setPhone]=useState("")
    const [pass, setPass]=useState("")
    const [address, setAddress]=useState("")
    const [status, setStatus]=useState(true)
    const [role, setRole]=useState(false)
    const [file, setFile]=useState("")
    const docData = {
      uid:   String(Date.now()) ,
      fullname:fullname,
      email: email,
      phone: phone,
      password: pass,
      address: address,
      avatar: file,
      status: status==="1" ? true:false,
      role: role==="1" ? true:false,
      date_created:  currentDate(),
      date_updated:  currentDate(),
    };

    const resetData=()=>{
      setFullname('')
      setEmail('')
      setPhone('')
      setPass('')
      setAddress('')
      setFile('')
      setStatus(true)
      setRole(false)

    }

    const handleCreateUser= async ()=>{
      console.log('create user doc : '+ JSON.stringify(docData))
      // console.log('create user modal : '+ JSON.stringify(modalData))
      await setDoc(doc(userRef,docData.uid),docData);
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
            Add new User
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name='email'
                onChange={e=>setEmail(e.target.value)}

              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your pass"
                name='pass'
                onChange={e=>setPass(e.target.value)}
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

            <Form.Select className='mb-3'
              onChange={e=>setStatus(e.target.value)} 
              name='status'>
              <option>Choose Status </option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </Form.Select>

            <Form.Select className='mb-3'
              onChange={e=>setRole(e.target.value)} 
              name='role'>
              <option>Choose Role </option>
              <option value="1">Admin</option>
              <option value="2">Staff</option>
            </Form.Select>

            <Form.Group className="mb-3" >
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name='avatar'
                // value={modalData?.avartar}
                onChange={e=>setFile(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Close
          </Button>
          <Button type='submit' onClick={() =>{handleCreateUser()}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default CreateUser