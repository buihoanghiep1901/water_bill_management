// @ts-nocheck
import React, { useEffect, useState, useContext } from 'react'
import { clientRef, billRef } from '../../config/firebase_config'
import {getDocs,query as clause,  deleteDoc,doc, orderBy} from "firebase/firestore"; 
import { Table, Button,} from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcPrevious , FcNext} from "react-icons/fc";
import ReactPaginate from 'react-paginate';
import AppContext from '../../Context/Context';
import CreateBill from '../../Components/Billing/CreateBill';
import UpdateBill from '../../Components/Billing/UpdateBill';
import '../Users/users.css'

// import {useAuthState} from 'react-firebase-hooks/auth'
function Billings() {
    const {role,reload,setShowUpdate, setShowCreate,setReload}=useContext(AppContext)

    const [billList, setbillList]=useState([]);
    const [currBill, setCurrBill]=useState({});
    const [currClient, setCurrClient]=useState({});
    const [billofClient, setBillofClient]=useState({}); /*OBJECT with id of a bill eqqual to a client doc*/ 
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const rowPerPage=10
    
    useEffect(()=>{
        const loadData= async ()=>{
            const billDoc= await getDocs(clause(billRef, orderBy('due_date')))
            const clientDoc= await getDocs(clause(clientRef, orderBy('uid')))
            const billList=billDoc.docs.map((doc)=>{
                  return doc.data()
              })
            const clientList=clientDoc.docs.map((doc)=>{
                return doc.data()
            })
            let billOfClient={}
            for (let i = 0; i < billList.length; i++) {
              for (let j = 0; j < clientList.length; j++) {
                if (billList[i].uid===clientList[j].uid) {   
                  billOfClient[billList[i].id]=clientList[j];
                }
              }
            }
            setBillofClient(billOfClient)
            setbillList(billList);
            setTotalPages(Math.ceil(billList.length/rowPerPage))
        }
        loadData()
    },[reload])

    console.log("bill of client:  "+ JSON.stringify(billofClient))
    console.log('bill id: '+JSON.stringify(currBill.id))
    const rowStart=currentPage * rowPerPage;
    const rowEnd=rowStart + rowPerPage
    const subList=billList.slice(rowStart,rowEnd);
    
    const getClientName= (uid)=>{
        // console.log("uid in getdoc:"+uid)
        // console.log("fullname in getdoc:"+JSON.stringify(billofClient[uid]))
        return  billofClient[uid].fullname
    }

    const deletebill= async (bill)=>{ 
      console.log('delete bill modal : '+ JSON.stringify(bill))
      await deleteDoc(doc(billRef,bill.id))
      setReload(!reload)
    }
  return (
    <>
      {role&&
        <Button className='btn-modal' onClick={() => {setShowCreate(true)}}>
          Add new bill
        </Button>
      }
      <Table striped bordered hover className='my-2' >
        <thead>
          <tr className='text-center'>
            <th>Name of Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
          subList.map((bill)=>{        
            return <tr key={bill.id}>
            <td className='text-center align-middle'>{getClientName(bill.id)}</td>
            <td className='text-center align-middle'>{bill.due_date}</td>
            <td className='text-center align-middle'>{bill.total}</td>
            <td className='text-center align-middle'><div className="pill-status" style={bill.status ? {backgroundColor: "lightgreen"}:{backgroundColor: "lightcoral"}}>{bill.status ? 'Paid':'Pending'}</div></td>
            <td>{
              <div className='text-center p-0' >
                <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsThreeDotsVertical />
                </button>
                <ul className="dropdown-menu text-center align-middle p-0">
                  <li onClick={()=>{
                      setCurrBill(bill)
                      setCurrClient(billofClient[bill.id])
                      setShowUpdate(true);
                      console.log('show update in bill: '+bill);
                    }}>
                      Detail
                  </li>
                  <hr className='m-0' />
                  {role&&<li onClick={()=>deletebill(bill)} >Delete</li>}
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
      {role&&<CreateBill/>}
      <UpdateBill client={currClient} bill={currBill} />
    </>

  )
}

export default Billings