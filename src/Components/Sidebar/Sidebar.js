import React from 'react'
import "./sidebar.css"
import { SidebarData } from './Sidebardata'
import {Navbar, Nav} from "react-bootstrap";
import { IconContext } from "react-icons";
import {NavLink} from 'react-router-dom';

function Sidebar() {
  return (
    <Navbar expand="lg"  className='vh-100 py-0' >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav" className='flex-column h-100 sidebar border-4' >
            <h3 className='fs-5  mt-4 mb-5 fw-bold text-white text-center'>Water bill management</h3>
            
            <Nav className="mt-5 w-100  d-flex flex-column text-white ">
              {SidebarData.map((val,key)=>{
                return(
                  <NavLink
                    key={key}
                    to={val.link} 
                    className={
                      `p-2 mb-2 fs-5 text-white d-flex flex-row sidebar__link 
                      ${({ isActive}) =>
                      isActive ? "active" : ""}`
                  } end>
                    <IconContext.Provider value={{ className: "Icon" }}>
                      <span className='sidebar__icon'>{val.icon}</span>
                    </IconContext.Provider>
                    <div className='sidebar__title'>{val.title}</div>
                  </NavLink>
                )
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
  )
}

export default Sidebar