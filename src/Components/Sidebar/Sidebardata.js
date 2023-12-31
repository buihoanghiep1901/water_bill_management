import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { CiBoxList } from "react-icons/ci";
export const  SidebarData =[
    {
        title: 'Dash board' ,
        icon: <RxDashboard />,
        link: ''
    },
    {
        title: 'Users' ,
        icon:  <FaUserTie />,
        link: 'users'

    },
    {
        title: 'Clients' ,
        icon: <TbUsers />,
        link: 'clients'

    },
    {
        title: 'Billings' ,
        icon: <GrMoney />,
        link: 'billings'

    },
    {
        title: 'Categories' ,
        icon: <CiBoxList />,
        link: 'categories'

    },
    
]
