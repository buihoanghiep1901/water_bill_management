// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { userRef } from '../../config/firebase_config'
import {getDocs, query,limit} from "firebase/firestore"; 
import { Table, Button,Modal,Form} from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcPrevious , FcNext} from "react-icons/fc";
import ReactPaginate from 'react-paginate';
import './users.css'

// import {useAuthState} from 'react-firebase-hooks/auth'
function Users() {
    const [userList, setUserList]=useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const rowPerPage=10

    const [show, setShow]=useState(false)
    const[dataModal, setDataModal]=useState({})
    
    useEffect(()=>{
        const loadData= async ()=>{
            let i=0
            const queryDoc= await getDocs(query(userRef))
            const userList=queryDoc.docs.map((doc)=>{
                  i++
                  console.log(`${i} `+doc.data().username)
                  return doc.data()
              })
              setUserList(userList);
              setTotalPages(Math.ceil(userList.length/rowPerPage))
        }
        loadData()
    },[])
    const rowStart=currentPage * rowPerPage;
    const rowEnd=rowStart + rowPerPage
    const subList=userList.slice(rowStart,rowEnd);
    console.log(`row start ${rowStart}, ${rowEnd}: `+subList)

  return (
    <>
      
      <Button className='btn btn-primary btn-modal' onClick={() => setShow(true)}>
        Add user
      </Button>
      <Table striped bordered hover className='my-2' >
        <thead>
          <tr className='text-center'>
            <th>Name</th>
            <th>Phone number</th>
            <th>Date created</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
          subList.map((user)=>{        
            return <tr>
            <td className='text-center align-middle'>{user.full_name}</td>
            <td className='text-center align-middle'>{user.phone}</td>
            <td className='text-center align-middle'>{user.date_created}</td>
            <td className='text-center align-middle'><div className="pill-status" style={user.status ? {backgroundColor: "lightgreen"}:{backgroundColor: "lightcoral"}}>{user.status ? 'Active':'Inactive'}</div></td>
            <td>{
              <div className='text-center p-0' >
                <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsThreeDotsVertical />
                </button>
                <ul class="dropdown-menu text-center align-middle p-0">
                  <li>Detail</li>
                  <hr className='m-0' />
                  <li>Delete</li>
                </ul>
              </div>
              }
            </td>
          </tr>
            })
          }
        </tbody>
      </Table>

      <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active-page"}
          pageCount={totalPages}
          onPageChange={(event)=>{setCurrentPage(event.selected)}}
          forcePage={currentPage}
          nextLabel={<FcNext />}
          previousLabel={<FcPrevious />}
          pageRangeDisplayed={3}
      />
      <Modal
        scrollable
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add and update User
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
                
                
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name='email'
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your pass"
                name='pass'
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="0123456789"
                name='phone'
              />
            </Form.Group>
          
            <Form.Group className="mb-3" >
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="1 Dai Co Viet"
                name='address'
              />
            </Form.Group>

            <Form.Select  name='status' aria-label="Default select example">
              <option>Choose Status </option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </Form.Select>

            <Form.Group className="mb-3" >
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name='avatar'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button type='submit' onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Users