// @ts-nocheck
import React from 'react'
import { useState, useContext } from 'react'
import AppContext from '../../Context/Context'
import { billRef, userRef, clientRef, categoryRef,testRef } from '../../config/firebase_config'
import { getDocs, doc, setDoc } from 'firebase/firestore'
import exportFromJSON from 'export-from-json'
import Papa from 'papaparse'
import { Button, Form,Modal } from 'react-bootstrap'
import { FaDownload,FaUpload} from "react-icons/fa6";
import './UploadAndDownload.css'

import { format } from './Format'
function UploadAndDownload(prop) {
    const {reload, setReload}=useContext(AppContext)
    const [data,setData]=useState("")
    const [show,setShow]=useState(false)
    let ref, order
    if(prop.collection==="user"){
        ref=userRef
        order=format.user
    }else if(prop.collection==="client"){
        ref=clientRef
        order=format.client
    }else if(prop.collection==="category"){
        ref=categoryRef
        order=format.category
    }else if(prop.collection==="bill"){
        ref=billRef
        order=format.bill
    }else {
        ref=testRef
        order=format.user
    }

    const convertString=(data)=>{
      if(prop.collection==="user"){
        data.role=(data.role.toLowerCase()==='true')
        data.status=(data.status.toLowerCase()==='true')
      }else if(prop.collection==="client"){
        data.status=(data.status.toLowerCase()==='true')
        data.category=(data.category.toLowerCase()==='true')
      }else if(prop.collection==="bill"){
        data.status=(data.status.toLowerCase()==='true')
      }
      return data;
    }
    const handleFile= async (e)=>{
        const file= await e.target.files[0]
        Papa.parse(file,{
          header: true,
          skipEmptyLines: true,     //delete the last line that is empty
          complete:(results)=>{
            setData(results.data.map((row)=>{
              return convertString(row)
            }))
          },
        })
        console.log("origin data in CVS FILE:\n",data.length, JSON.stringify(data))
    }
    
    const handleImport= async ()=>{
      console.log("data in import:\n",data.length, JSON.stringify(data))

        data.forEach(async (row)=>{
            await setDoc(doc(ref,row.uid),row)
        })

        setShow(false)
        setReload(!reload)
        setData("")
    }
    
    function preferredOrder(obj, order) {
        let newObject = {};
        for(let i = 0; i < order.length; i++) {
            if(obj.hasOwnProperty(order[i])) {
                newObject[order[i]] = obj[order[i]];
            }
        }
        return newObject;
    }
    
    const handleExport= async ()=>{
        const result=await getDocs(ref)
        let data= result.docs.map((doc)=>{
            return preferredOrder(doc.data(),order)
        })

        console.log('data export\n' ,JSON.stringify(data))
        const fileName=prop.collection
        const exportType= exportFromJSON.types.csv
        exportFromJSON({data,fileName,exportType})
    }
    
  return (
    <>  
        
        <div> 
          <Button onClick={()=>{setShow(true);}} className='p-1 mx-1 updown-btn'>
              <FaUpload className='me-2'/>Upload
          </Button>

          <Button onClick={()=>{handleExport()}} className='p-1 mx-1 updown-btn'>
              <FaDownload  className='me-2'/>Download
          </Button>
        </div>
        
        <Modal
        scrollable
        show={show}
        onHide={() => {setData("");setShow(false)}}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Import file to database
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control type="file" accept='.csv' onChange={(e)=>{handleFile(e)}} />
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button type='submit' onClick={() =>{handleImport()}}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>
        
    </>
    
  )
}

export default UploadAndDownload