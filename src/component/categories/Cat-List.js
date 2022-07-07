import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Navbar'
import EditCat from './Edit-Cat'
// import swal from 'sweetalert'


export const ShowCategory = () => {

   const [listCategory, setListGory] = useState([])
   const [loading, setLoadning] = useState(true)
   const [catData, setCatData] = useState()
   const history = useHistory()

   useEffect(() =>{
       axios.post(`http://localhost:8010/get_categories`, {}).then((res) =>{
        console.log(res.data.result.response)
        setListGory(res.data.result.response)  
       })
       setLoadning(false)
   }, [])

 if(loading){
     return(
         <h1>Loading...</h1>
     )
 }


 const handleDelete = (id) =>{
    const data = {
        "id":id
    }

     axios.post(`http://localhost:8010/delete_categories`, {'params':data}).then( res =>{
        console.log(res)
     }).catch(error =>{
        console.log("Error", error)
     })
  
 }


 const onUpdateSumbit=(data)=>{
    console.log(data)
    setCatData(data);
    history.push({
        pathname:"/edit-category",
        state:data

    })

 }

  return (
    <>
    <Navbar/>
    <div className="container pt-5">
        <div className="card">
            <div className="card-header">
                <h1>Liste of categories  <Link to='/add-category' className='btn btn-primary float-end'>Add Category</Link></h1>
            </div>
            <div className="card-body">
                <table className="table table-borded striped">
                    <thead>
                        <tr>
                        <th>ID</th>
                            <th>Name</th>

                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                     {
                        listCategory.map((item) =>{
                            return(
                                <tr> 
                                            
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>

                                           
                                            <td>
                                                <Link onClick={() =>onUpdateSumbit(item)} className="btn btn-warning btn-sm">Update</Link>
                                            </td>
                                            <td>
                                            <Link className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</Link>
                                            </td>
                                        </tr>
                            )
                        })
                     }
                                        
                      
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    </>
  )
}