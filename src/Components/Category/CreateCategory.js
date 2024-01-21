// @ts-nocheck
import React, {useContext, useState } from 'react'
import { categoryRef } from '../../config/firebase_config'
import {doc, setDoc,} from "firebase/firestore"; 
import {Button,Modal,Form} from 'react-bootstrap';
import currentDate from '../../utils/currentDate';
import AppContext from '../../Context/Context';
import '../../Components/User/Modal.css'
function CreateCategory() {
    const {showCreate,reload,setShowCreate,setReload}=useContext(AppContext)
     
    const [title, setTitle]=useState("")
    const [detail, setDetail]=useState("")
    


    const docData = {
      uid:String(Date.now()) ,
      title:title,
      detail:detail ,
      date_created:  currentDate(),
      date_updated:  currentDate(),
    };

    const resetData=()=>{
        setDetail("")
        setTitle("")
    }

    const handleCreateCategory= async ()=>{
        console.log('create Category doc : '+ JSON.stringify(docData))  
        await setDoc(doc(categoryRef,docData.uid),docData)
        setShowCreate(false);
        setReload(!reload)
        resetData()
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
            Create new Category
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
                onChange={e=>setTitle(e.target.value)}
                
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Detail</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                type="text"
                placeholder="Detail of category"
                name='detail'
                onChange={e=>setDetail(e.target.value)}

              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowCreate(false)}}>
            Close
          </Button>
          <Button type='submit' onClick={() =>{handleCreateCategory()}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateCategory