import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Navbar'
import EditCat from './Edit-Cat'
import { useDispatch, useSelector } from 'react-redux'
// import swal from 'sweetalert'


export const ShowCategory = () => {
   const [catData, setCatData] = useState()
   const history = useHistory()

  

   const dispatch = useDispatch()
   const  categories= useSelector(state => state.allCategory.categories)
   

   const fectchcategory = async () =>{
    const res =  await  axios.post(`http://localhost:8010/get_categories`, {}).catch(error =>{
            console.log(error)
        })
        dispatch({type: "CATEGORY_LIST", payload: res.data.result.response})
    };

   useEffect(() =>{
    fectchcategory()
   }, [])


//  if(loading){
//      return(
//          <h1>Loading...</h1>
//      )
//  }


 const handleDelete = (id) =>{
    const data = {
        "id":id
    }

    dispatch({type:"DELETE_CATEGORY",payload: data})

    console.log(data)
     axios.post(`http://localhost:8010/delete_category`, {'params':data}).then( res =>{
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
                <h1>Liste des categories  <Link to='/add-category' className='btn btn-primary float-end'>Add Category</Link></h1>
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
                        categories.map((item, idx) =>{
                            return(
                                <tr key={idx}> 
                                            
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>

                                           
                                            <td>
                                                <span onClick={() =>onUpdateSumbit(item)} className="btn btn-warning btn-sm">Update</span>
                                            </td>
                                            <td>
                                            <span className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</span>
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