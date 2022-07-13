import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

const ListeVente = () => {
    const [stocklist, setStockList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        axios.post(`http://localhost:8010/get_stocks`, {"params":{}}).then((res) =>{
            setStockList(res.data.result.response)
            console.log(res)
        })
    }, [])

  return (
    <>
    <Navbar/>
      <div class="container">
        <div class="row mt-5">
            <Link className='btn btn-sm btn-success' to='/vente'>Sortie</Link>
            <div class="col-md-12">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Operation</th>
                            <th>Produit</th>
                            <th>Quantity</th>
                            <th>Date sortie</th>
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