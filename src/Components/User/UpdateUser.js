// @ts-nocheck
import React, {useContext, useState } from 'react'
import { userRef } from '../../config/firebase_config'
import {doc, updateDoc,} from "firebase/firestore"; 
import {Button,Modal,Form} from 'react-bootstrap';
import currentDate from '../../utils/currentDate';
import AppContext from '../../Context/Context';
import './Modal.css'
function UpdateUser(prop) {
    const {role,showUpdate,reload,setShowUpdate,setReload}=useContext(AppContext)
     
    const [fullname, setFullname]=useState("")
    const [email, setEmail]=useState("")
    const [phone, setPhone]=useState("")
    const [pass, setPass]=useState("")
    const [address, setAddress]=useState("")
    const [status, setStatus]=useState(true)
    const [roleUser, setRoleUser]=useState(false)
    const [file, setFile]=useState("")
    console.log('prop user'+JSON.stringify(prop))


    const checkType=(type)=>{
        if (typeof(type)=='boolean') {
            return status
        }else if(type==="1"){
            return true;
        }else{
            return false;
        }
    }

    const docData = {
      uid:prop.user.uid ,
      fullname:fullname ==="" ? prop.user.fullname : fullname,
      email: email===""? prop.user.email : email,
      phone: phone===''? prop.user.phone: phone ,
      password: pass ===""? prop.user.password : pass,
      address: address===""? prop.user.address : address,
      avatar: file===""? prop.user.avatar : file,
      status: checkType(status),
      role: checkType(roleUser),
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

    }

    const handleUpdateUser= async ()=>{
        console.log('update user doc : '+ JSON.stringify(docData))  
        await updateDoc(doc(userRef,prop.user.uid),docData)
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
            Update User
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
                defaultValue={prop.user.fullname}
                onChange={e=>setFullname(e.target.value)}
                
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name='email'
                defaultValue={prop.user.email}
                onChange={e=>setEmail(e.target.value)}

              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your pass"
                name='pass'
                defaultValue={prop.user.password}
                onChange={e=>setPass(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="0123456"
                name='phone'
                defaultValue={prop.user.phone}
                onChange={e=>setPhone(e.target.value)}
              />
            </Form.Group>
          
            <Form.Group className="mb-3" >
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="1 Dai Co Viet"
                name='address'
                defaultValue={prop.user.address}
                onChange={e=>setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Select
              className='mb-3'
              onChange={e=>setStatus(e.target.value)} 
              name='status'
              defaultValue={prop.user.status? 1: 2}>
              <option>Choose Status </option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </Form.Select>

            <Form.Select 
              className='mb-3'
              onChange={e=>setRoleUser(e.target.value)} 
              name='role'
              defaultValue={prop.user.role? 1: 2}>
              <option>Choose Role </option>
              <option value="1">Admin</option>
              <option value="2">Staff</option>
            </Form.Select>

            <Form.Group className="mb-3" >
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name='avatar'
                // value={modalData?.avatar}
                onChange={e=>setFile(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowUpdate(false)}}>
            Close
          </Button>
          {
            role&&
            <Button type='submit' onClick={() =>{handleUpdateUser()}}>
              Submit
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default UpdateUser