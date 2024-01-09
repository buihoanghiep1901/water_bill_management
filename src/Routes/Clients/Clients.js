// @ts-nocheck
import React, { useEffect ,useState } from 'react'
import { userRef } from '../../config/firebase_config'
import {getDocs, query as clause, doc, addDoc, deleteDoc, where, onSnapshot, orderBy, query} from "firebase/firestore"; 
import { Table, Button,Modal,Form} from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcPrevious , FcNext} from "react-icons/fc";
import ReactPaginate from 'react-paginate';
import { clientRef } from '../../config/firebase_config';
import '../Users/users.css'

// import {useAuthState} from 'react-firebase-hooks/auth'
function Clients() {
    const [clientList, setClientList]=useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const rowPerPage=10

    const [show, setShow]=useState(false)
    const [reload, setReload]=useState(false)
    const [modalData, setModalData]=useState({})
    const [fullname, setFullname]=useState("")
    const [email, setEmail]=useState("")
    const [pass, setPass]=useState("")
    const [address, setAddress]=useState("")
    const [phone, setPhone]=useState("")
    const [status, setStatus]=useState(true)
    const [category, setCategory]=useState(true)
    
    
    useEffect(()=>{
        const loadData= async ()=>{
            const queryDoc= await getDocs(clause(clientRef, orderBy('date_updated','desc')))
            const clientList=queryDoc.docs.map((doc)=>{
                  // console.log(`${i} `+doc.data().clientname)
                  return doc.data()
              })
              setClientList(clientList);
              setTotalPages(Math.ceil(clientList.length/rowPerPage))
        }
        loadData()
    },[reload])
    const rowStart=currentPage * rowPerPage;
    const rowEnd=rowStart + rowPerPage
    const subList=clientList.slice(rowStart,rowEnd);
    // console.log(`row start ${rowStart}, ${rowEnd}: `+subList)

    const docData = {
      fullname:fullname,
      email: email,
      phone: phone,
      password: pass,
      date_created:  new Date().toJSON().slice(0, 10),
      date_updated:  new Date().toJSON().slice(0, 10),
      address: address,
      status: status==="1" ? true:false,
      category: category==="1" ? true:false,
    };
    const handleCreateClient= async ()=>{
      await addDoc(clientRef,docData);
      setShow(false);
      setModalData({})
      console.log(!reload)
      setReload(!reload)
    }

    const handleUpdateClient= async(client)=>{
      setModalData(client)
      setShow(true);

    }

    const deleteClient= async (client)=>{      
      const query= await getDocs(clause(clientRef, where('email','==',client.email)))
      query.docs.map(async (data)=>{
            console.log('doc id: '+data.id)
            await deleteDoc(doc(clientRef,data.id))
        })
        console.log(!reload)
        setReload(!reload)
    }
  return (
    <>
      
      <Button className='btn-modal' onClick={() => setShow(true)}>
        Add client
      </Button>
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
                  <li onClick={()=>handleUpdateClient(client)}>Detail</li>
                  <hr className='m-0' />
                  <li onClick={()=>deleteClient(client)} >Delete</li>
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
        onHide={() => {setShow(false); setModalData({})}}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add and update client
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
                defaultValue={modalData?.fullname}
                onChange={e=>setFullname(e.target.value)}
                
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name='email'
                defaultValue={modalData?.email}
                onChange={e=>setEmail(e.target.value)}

              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your pass"
                name='pass'
                defaultValue={modalData?.password}
                onChange={e=>setPass(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="0123456"
                name='phone'
                defaultValue={modalData?.phone}
                onChange={e=>setPhone(e.target.value)}
              />
            </Form.Group>
          
            <Form.Group className="mb-3" >
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="1 Dai Co Viet"
                name='address'
                defaultValue={modalData?.address}
                onChange={e=>setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>First reading</Form.Label>
              <Form.Control
                type="text"
                placeholder="1 Dai Co Viet"
                name='first_read'
                defaultValue={modalData?.firstreading}
                onChange={e=>setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Select 
              onChange={e=>setStatus(e.target.value)} 
              name='status'
              defaultValue={modalData?.status? 1:2}>
              <option>Choose Status </option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </Form.Select>
            
            <Form.Select 
              onChange={e=>setCategory(e.target.value)} 
              name='status'
              defaultValue={modalData?.category? 1:2}>
              <option>Choose Category </option>
              <option value="1">Residential</option>
              <option value="2">Business</option>
            </Form.Select>

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button type='submit' onClick={() => handleCreateClient()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Clients