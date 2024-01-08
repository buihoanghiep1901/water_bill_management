// @ts-nocheck

import React, { useEffect, useState } from 'react'
import { userRef } from '../../config/firebase_config'
import {getDocs, query,limit} from "firebase/firestore"; 
import { Table} from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcPrevious , FcNext} from "react-icons/fc";
import ReactPaginate from 'react-paginate';
import './users.css'

// import {useAuthState} from 'react-firebase-hooks/auth'
function Users() {
    const [userList, setUserList]=useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(10);
    const rowPerPage=10
    
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
    const handlePageChange= (slectedPage)=>{
      console.log('selected page: '+ slectedPage)
      setCurrentPage(slectedPage)
    }

  return (
    <>
      <button type="button" class="btn btn-primary btn-modal " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Add user
      </button>

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
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
    </>

  )
}

export default Users