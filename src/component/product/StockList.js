import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../../Navbar'

const StockList = () => {

    const [loading, setLoading] = useState(true)
    const [entree, setEntree] = useState()
    const history = useHistory()
    
    const entreeItem = useSelector( state => state.entreeList.entree)
    const dispatch = useDispatch()

   const fectchEntree = async () =>{
    const res =  await  axios.post(`http://localhost:8010/get_stocks`, {}).catch( error =>{
            console.log(error)
        })
        dispatch({type:"ENTREE_LIST", payload:res.data.result.response})
        
    };

    
    useEffect(() => {
        fectchEntree()
    }, [])

  
    const updateEntree = (data) =>{
        console.log(data)
        setEntree(data);
        history.push({
            pathname:"/edit-entree",
            state:data
    
        })
    }

    const handleDelete = (id) =>{
        const data = {
            "id":id
        }
    
        console.log(data)
        dispatch({type:"DELETE_ENTREE", payload: data})
         axios.post(`http://localhost:8010/delete_stock`, {'params':data}).then( res =>{
            console.log(res)
         }).catch(error =>{
            console.log("Error", error)
         })
      
     }



  return (
    <>
    <Navbar/>
      <div class="container">
          
        <div class="row mt-5">
            <Link className='btn btn-lg btn-success mt-5' to='/add-stock'>Entree</Link>
            <div class="col-md-12">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Operation</th>
                            <th>Produit</th>
                            <th>Quantity</th>
                            <th>Date entree</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            entreeItem.map((item, idx) =>{
                                return(

                        <tr key={idx}>
                            <td>{item.operation}</td>
                            <th>{item.product_id}</th>
                            <th>{item.qte}</th>
                            <th>{item.create_date}</th>
                            <th>
                                <Link className='btn btn-warning btn-sm' onClick={() =>updateEntree(item)}>edit</Link>
                            </th>
                            <th> <Link className='btn btn-danger btn-sm' onClick={() => handleDelete(item.id)}>delete</Link></th>

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

export default StockList
