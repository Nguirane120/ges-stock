import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../Navbar'

const ListeVente = () => {
    const [stocklist, setStockList] = useState([])
    const [loading, setLoading] = useState(true)
    const [sortie, seSortie] = useState()

    const history = useHistory()

    useEffect(() =>{
        axios.post(`http://localhost:8010/get_stocks`, {"params":{}}).then((res) =>{
            setStockList(res.data.result.response)
            console.log(res)
        })
    }, [])


    const updateSortie = (data) =>{
        console.log(data)
        seSortie(data);
        history.push({
            pathname:"/edit-sortie",
            state:data
    
        })
    }


    const handleDelete = (id) =>{
        const data = {
            "id":id
        }

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
            <Link className='btn btn-lg btn-success' to='/vente'>Sortie</Link>
            <div class="col-md-12">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Operation</th>
                            <th>Produit</th>
                            <th>Quantity</th>
                            <th>Date sortie</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocklist.map((item, idx) =>{
                                return(

                        <tr key={idx}>
                            <td>{item.operation}</td>
                            <th>{item.product_id}</th>
                            <th>{item.qte}</th>
                            <th>{item.create_date}</th>
                            <th><Link className='btn btn-sm btn-warning' onClick={() => updateSortie(item)}>edit</Link></th>
                            <th><Link className='btn btn-sm btn-danger' onClick={() =>handleDelete(item.id)}>delete</Link></th>

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

export default ListeVente