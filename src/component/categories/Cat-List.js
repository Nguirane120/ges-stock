import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
// import swal from 'sweetalert'


export const ShowCategory = () => {

   const [listCategory, setListGory] = useState([])
//    const [loading, setLoadning] = useState(true)

//    useEffect(() =>{
//        axios.get(`api/show-category`).then((res) =>{
//         console.log(res.data.categories)
//         if(res.data.status === 200)
//         {
//             setListGory(res.data.categories)
//         }
//         setLoadning(false)
//        })
//    })

//  if(loading){
//      return(
//          <h1>Loading...</h1>
//      )
//  }


 const handleDelete = (e, id) =>{
     e.preventDefault()
    //  const textClicked = e.currentTarget;
    //  textClicked.innerText = 'Deleting...'

    //  axios.delete(`api/delete-category/${id}`).then( res =>{
    //      if(res.data.status === 200)
    //      {
    //          swal("Succes", res.data.message, 'success')
    //         //  textClicked.closest('tr').remove()
    //      }
    //  })
  
 }


  return (
    <div className="container pt-5">
        <div className="card">
            <div className="card-header">
                <h1>Liste of categories  <Link to='/add-category' className='btn btn-primary float-end'>Add Category</Link></h1>
            </div>
            <div className="card-body">
                <table className="table table-borded striped">
                    <thead>
                        <tr>
                            
                            <th>Name</th>

                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                     
                                        <tr>
                                            
                                            <td>name</td>
                                           
                                            <td>
                                                <Link to='' className="btn btn-warning btn-sm">Update</Link>
                                            </td>
                                            <td>
                                            <Link className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e)}>Delete</Link>
                                            </td>
                                        </tr>
                      
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}