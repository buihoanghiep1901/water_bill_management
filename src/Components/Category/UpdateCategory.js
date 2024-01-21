// @ts-nocheck
import React, {useContext, useState } from 'react'
import { categoryRef } from '../../config/firebase_config'
import {doc, setDoc,} from "firebase/firestore"; 
import {Button,Modal,Form} from 'react-bootstrap';
import currentDate from '../../utils/currentDate';
import AppContext from '../../Context/Context';
import '../../Components/User/Modal.css'
function UpdateCategory(prop) {
    const {role,showUpdate,reload,setShowUpdate,setReload}=useContext(AppContext)
     
    const [title, setTitle]=useState("")
    const [detail, setDetail]=useState("")
    
    console.log('prop Category'+JSON.stringify(prop))

    const docData = {
      uid:prop.category.uid ,
      title:title ==="" ? prop.category.title : title,
      detail:detail ==="" ? prop.category.detail : detail,
      date_created:  currentDate(),
      date_updated:  currentDate(),
    };

    const resetData=()=>{
        setDetail("")
        setTitle("")
    }

    const handleUpdateCategory= async ()=>{
        console.log('update Category doc : '+ JSON.stringify(docData))  
        await setDoc(doc(categoryRef,prop.category.uid),docData)
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
            Update Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Business"
                name='detail'
                defaultValue={prop.category.title}
                onChange={e=>setTitle(e.target.value)}
                
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Detail</Form.Label>
              <Form.Control
                as="textarea" rows={5}
                type="text"
                placeholder="Detail of category"
                name='detail'
                defaultValue={prop.category.detail}
                onChange={e=>setDetail(e.target.value)}

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
            <Button type='submit' onClick={() =>{handleUpdateCategory()}}>
              Submit
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default UpdateCategory