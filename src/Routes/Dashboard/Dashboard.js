import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

function Dashboard() {
  return (
    <div>Dashboard
      <DropdownButton id="dropdown-basic-button" title="">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    </div>
  )
}

export default Dashboard