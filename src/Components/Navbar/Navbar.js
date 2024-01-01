// @ts-nocheck
import React, { useEffect } from 'react'
import { Dropdown, Nav,Col, Row,Form,Navbar} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import vamp from '../../assets/images/vamp.jpg'
import  "./navbar.css"
import { auth,db } from '../../config/firebase_config'
import { signOut } from 'firebase/auth'
import { collection, doc, setDoc, query,where, getDocs, getDoc, limit } from "firebase/firestore"; 
import {useAuthState} from 'react-firebase-hooks/auth'
function NavigateBar() {
    const [user]=useAuthState(auth);
    const Navigate=useNavigate();

   async function abc(){
    const docRef = collection(db, "users");
    const querySnapshot = await getDocs(query(docRef));
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data().avartar);
    });
    
    // if (docSnap) {
    //   console.log("Document data:", docSnap);
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
   }
   abc()

    // useEffect( () => {
    //     async function test () {
    //         const result= await  getDocs(collection(db,'users') );
    //         console.log(result);
    //     }

    // });
    // const searching=()=>{

    // }
    const signUserOut= async ()=>{
        await signOut(auth)
    }
  return (
    <>
    <Navbar expand="md" className="bg-white justify-content-between shadow  " id="navbar">
        <h4 className='w-md-25 ms-5 mb-0'>Dashboard</h4>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />        
        <Navbar.Collapse id="basic-navbar-nav" className=' justify-content-around '>
            <Form inline='true' className=' w-50'>
                <Form.Control
                        type="text"
                        placeholder="Search"
                        />
            </Form>
            <Nav className="align-items-center flex-row">
                <img src={vamp} alt="avatar" className='avatar' />
                <h5 className=''>{user?.email}</h5>
                <Dropdown>
                    <Dropdown.Toggle variant="white" className='border-0' id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <hr />
                        <Dropdown.Item href="" 
                            onClick={()=>{
                                signUserOut();
                                Navigate("/");
                                }}>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
            </Nav>
        </Navbar.Collapse>    
    </Navbar>
    <hr />
    </>
  )
}

export default NavigateBar