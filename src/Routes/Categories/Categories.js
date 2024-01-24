// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/Context';
import {getDocs, query as clause, doc,  deleteDoc, orderBy} from "firebase/firestore"; 
import ReactPaginate from 'react-paginate';
import { categoryRef } from '../../config/firebase_config';
import { Accordion, Button, Form } from 'react-bootstrap'
import { FcPrevious , FcNext} from "react-icons/fc";
import UpdateCategory from '../../Components/Category/UpdateCategory';
import CreateCategory from '../../Components/Category/CreateCategory';
import UploadAndDownload from '../../Components/UploadAndDownload/UploadAndDownload';
import './category.css'


function Categories() {
  const {role,reload,setShowCreate,setReload, setShowUpdate}=useContext(AppContext)
    
    const [categoryList, setcategoryList]=useState([]);
    const [currcategory, setCurrcategory]=useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const rowPerPage=5

    useEffect(()=>{
        const loadData= async ()=>{
                  console.log(`star load data in update `)
            const queryDoc= await getDocs(clause(categoryRef, orderBy('uid')))
            const categoryList=queryDoc.docs.map((doc)=>{
                  return doc.data()
              })
              console.log(`END load data in category `)
              setcategoryList(categoryList);
              setTotalPages(Math.ceil(categoryList.length/rowPerPage))
        }
        loadData()
    },[reload])
    const rowStart=currentPage * rowPerPage;
    const rowEnd=rowStart + rowPerPage
    const subList=categoryList.slice(rowStart,rowEnd);
    // console.log(`row start ${rowStart}, ${rowEnd}: `+subList)

    const deletecategory= async (category)=>{      
      await deleteDoc(doc(categoryRef,category.uid))
      setReload(!reload)
    }

  return (
    <>
      {
        role&&<div className='d-flex justify-content-between '>
          <UploadAndDownload collection='category'/>
          <Button className='btn-modal' onClick={() => {setShowCreate(true)}}>
            Add category
          </Button>
        </div>
      }
    
      <Accordion defaultActiveKey="0" className='category'>
        {
          subList.map((category)=>{
            return <>
              <Accordion.Item eventKey={category.uid} className='mb-4'>
                <Accordion.Header>{category.title}</Accordion.Header>
                <Accordion.Body>
                  <Form.Control as='textarea' rows={5} value={category.detail}>
                  </Form.Control>
                  {
                    role&&
                    <div className='d-flex justify-content-end'>
                      <Button className='me-3' 
                        onClick={() => {
                          setCurrcategory(category)
                          setShowUpdate(true)}}>
                        Update
                      </Button>
                      <Button variant="secondary"  onClick={() => {deletecategory(category)}}>
                        Delete
                      </Button>
                    </div>
                  }
                </Accordion.Body>
              </Accordion.Item>
            </>
          })
        }
      </Accordion>

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
      
      {role&&<CreateCategory/>}
      
      <UpdateCategory category={currcategory}/>
    </>
  )
}

export default Categories