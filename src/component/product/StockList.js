import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../Navbar'

const StockList = () => {
    const [stocklist, setStockList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        axios.post(`http://localhost:8010/approvisionnement`, {"params":{}}).then((res) =>{
            setStockList(res.data.result.response)
            console.log(res.data.result)
        })
    }, [])

  return (
    <>
    <Navbar/>
      <div class="container">
        <div class="row mt-5">
            <Link className='btn btn-sm btn-success' to='/add-stock'>Add stock</Link>
            <div class="col-md-12">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Nom Agent</th>
                            <th>Produit</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocklist.map((item, idx) =>{
                                return(

                        <tr>
                            <td>{item.name}</td>
                            <th>{item.product_id}</th>
                            <th>{item.qte}</th>

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
