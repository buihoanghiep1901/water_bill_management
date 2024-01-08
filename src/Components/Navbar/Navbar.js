/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Dropdown, Nav,Form,Navbar} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import vamp from '../../assets/images/vamp.jpg'
import  "./navbar.css"
import { auth,userRef } from '../../config/firebase_config'
import { signOut} from 'firebase/auth'
import { query, getDocs,where} from "firebase/firestore"; 
import {useAuthState} from 'react-firebase-hooks/auth'
function NavigateBar() {
    const [user]=useAuthState(auth);
    const [avatar, setAvatar]=useState("")
    const Navigate=useNavigate();
    const loadUrl= async ()=>{
        
        const querySnapshot = await getDocs(query(userRef, 
        where('username','==',user?.email.split('@')[0])));
        querySnapshot.forEach((doc)=>{
            console.log(doc.data().avartar) ;
            setAvatar(doc.data().avartar)
        })
        
   }
    useEffect( ()=>{

        loadUrl()
   },[])
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
                <img src={avatar? avatar: vamp} alt="avatar" className='avatar' />
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