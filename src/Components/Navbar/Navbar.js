/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useEffect, useState, useContext } from 'react'
import { Dropdown, Nav,Form,Navbar} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import vamp from '../../assets/images/vamp.jpg'
import  "./navbar.css"
import { auth,userRef } from '../../config/firebase_config'
import { signOut} from 'firebase/auth'
import { query, getDocs,where} from "firebase/firestore"; 
import AppContext from '../../Context/Context'
import {useAuthState} from 'react-firebase-hooks/auth'
function NavigateBar() {
    const {role,setRole}=useContext(AppContext)
    const [user]=useAuthState(auth);
    const [avatar, setAvatar]=useState("")
    const Navigate=useNavigate();
    
    useEffect( ()=>{
        const loadUrl= async ()=>{
            console.log('avatar: '+user?.email)     
            const querySnapshot = await getDocs(query(userRef, 
            where('email','==',user?.email)));
            querySnapshot.forEach((doc)=>{
                console.log(doc.data().avatar) ;
                setAvatar(doc.data().avatar)
                setRole(doc.data().role)
            })
       }
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
                <div>
                    <h5 className='m-0'>{user?.email}</h5>
                    <h6 className='m-0'>{role ? 'Admin': 'Staff'}</h6>
                </div>
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