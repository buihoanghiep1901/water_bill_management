// @ts-nocheck
import React, { useEffect, useState, useContext } from 'react'
import { userRef } from '../../config/firebase_config'
import {getDocs, query as clause,  deleteDoc,doc, orderBy} from "firebase/firestore"; 
import { Table, Button,} from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcPrevious , FcNext} from "react-icons/fc";
import ReactPaginate from 'react-paginate';
import AppContext from '../../Context/Context';
import UpdateUser from '../../Components/User/UpdateUser';
import CreateUser from '../../Components/User/CreateUser';
import './users.css'
import { changeDateFomat } from '../../utils/changeDate';
import UploadAndDownload from '../../Components/UploadAndDownload/UploadAndDownload';

// import {useAuthState} from 'react-firebase-hooks/auth'
function Users() {
    const {role,reload,setShowUpdate, setShowCreate,setReload}=useContext(AppContext)

    const [userList, setUserList]=useState([]);
    const [currUser, setCurrUser]=useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const rowPerPage=10
    
    useEffect(()=>{
        const loadData= async ()=>{
            const queryDoc= await getDocs(clause(userRef, orderBy('uid')))
            const userList=queryDoc.docs.map((doc)=>{
                  return doc.data()
              })
              setUserList(userList);
              setTotalPages(Math.ceil(userList.length/rowPerPage))
        }
        loadData()
    },[reload])

    const rowStart=currentPage * rowPerPage;
    const rowEnd=rowStart + rowPerPage
    const subList=userList.slice(rowStart,rowEnd);
  
    const deleteUser= async (user)=>{ 
      console.log('update user modal : '+ JSON.stringify(user))
      await deleteDoc(doc(userRef,user.uid))
      setReload(!reload)
    }
  return (
    <>
      
      {
        role&&<div className='d-flex justify-content-between '>
          <UploadAndDownload collection='user'/>
          <Button className='btn-modal' onClick={() => {setShowCreate(true)}}>
            Add user
          </Button>
        </div>
      }
      
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
            return <tr key={user.uid}>
            <td className='text-center align-middle'>{user.fullname}</td>
            <td className='text-center align-middle'>{user.phone}</td>
            <td className='text-center align-middle'>{changeDateFomat(user.date_created)}</td>
            <td className='text-center align-middle'><div className="pill-status" style={user.status ? {backgroundColor: "lightgreen"}:{backgroundColor: "lightcoral"}}>{user.status ? 'Active':'Inactive'}</div></td>
            <td>{
              <div className='text-center p-0' >
                <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsThreeDotsVertical />
                </button>
                <ul className="dropdown-menu text-center align-middle p-0">
                  <li onClick={()=>{
                      setCurrUser(user)
                      setShowUpdate(true);
                      console.log('show update in user: '+user);
                    }}>
                      Detail
                  </li>
                  <hr className='m-0' />
                  {role&&<li onClick={()=>deleteUser(user)} >Delete</li>}
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
      {role&&<CreateUser/>}
      <UpdateUser user={currUser}/>
    </>

  )
}

export default Users