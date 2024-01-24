// @ts-nocheck
import React, { useEffect ,useState ,useContext} from 'react'
import { clientRef } from '../../config/firebase_config'
import {getDocs, query as clause, doc,  deleteDoc, orderBy} from "firebase/firestore"; 
import { Table, Button} from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcPrevious , FcNext} from "react-icons/fc";
import ReactPaginate from 'react-paginate';
import CreateClient from '../../Components/Client/CreateClient';
import UpdateClient from '../../Components/Client/UpdateClient';
import AppContext from '../../Context/Context';
import '../Users/users.css'
import UploadAndDownload from '../../Components/UploadAndDownload/UploadAndDownload';

// import {useAuthState} from 'react-firebase-hooks/auth'
function Clients() {
    const {role,reload,setShowCreate,setReload, setShowUpdate}=useContext(AppContext)
    
    const [clientList, setClientList]=useState([]);
    const [currClient, setCurrClient]=useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const rowPerPage=10

       
    useEffect(()=>{
        const loadData= async ()=>{
            console.log(`star load data in update `)
            const queryDoc= await getDocs(clause(clientRef, orderBy('uid')))
            const clientList=queryDoc.docs.map((doc)=>{
                  return doc.data()
              })
              console.log(`END load data in update `)
              setClientList(clientList);
              setTotalPages(Math.ceil(clientList.length/rowPerPage))
        }
        loadData()
    },[reload])
    const rowStart=currentPage * rowPerPage;
    const rowEnd=rowStart + rowPerPage
    const subList=clientList.slice(rowStart,rowEnd);
    // console.log(`row start ${rowStart}, ${rowEnd}: `+subList)

    const deleteClient= async (client)=>{      
      await deleteDoc(doc(clientRef,client.uid))
      setReload(!reload)
    }
  return (
    <>
      {
        role&&<div className='d-flex justify-content-between '>
          <UploadAndDownload collection='client'/>
          <Button className='btn-modal' onClick={() => {setShowCreate(true)}}>
            Add client
          </Button>
        </div>
      }
      <Table striped bordered hover className='my-2' >
        <thead>
          <tr className='text-center'>
            <th>Name</th>
            <th>Phone number</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
          subList.map((client)=>{        
            return <tr>
            <td className='text-center align-middle'>{client.fullname}</td>
            <td className='text-center align-middle'>{client.phone}</td>
            <td className='text-center align-middle'>{client.category ? 'Resident': 'Business'}</td>
            <td className='text-center align-middle'><div className="pill-status" style={client.status ? {backgroundColor: "lightgreen"}:{backgroundColor: "lightcoral"}}>{client.status ? 'Active':'Inactive'}</div></td>
            <td>{
              <div className='text-center p-0' >
                <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsThreeDotsVertical />
                </button>
                <ul class="dropdown-menu text-center align-middle p-0">
                  <li onClick={()=>{
                    console.log('START SET CURR CLIENT: '+client);
                    setCurrClient(client);
                    setShowUpdate(true);
                    console.log('END CURR CLIENT: '+client);
                  }}>
                    Detail
                  </li>
                  <hr className='m-0' />
                  {role&&<li onClick={()=>deleteClient(client)} >Delete</li>}
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
      {role&&<CreateClient/>}
      <UpdateClient client={currClient}/>
    </>

  )
}

export default Clients