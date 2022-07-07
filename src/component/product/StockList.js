import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../Navbar'

const StockList = () => {
    const [stocklist, setStockList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/list-stock`).then((res) =>{
            console.log('Res',res.data.stocks)
            if(res.data.status == 200)
            {
                setStockList(res.data.stocks)
            }
            // setLoading(false)
        })
    }, [setStockList])

  return (
    <>
    <Navbar/>
      <div class="container">
        <div class="row">
            <div class="col-md-8">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Nom Agent</th>
                            <th>Produit</th>
                            <th>Image</th>
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
                            <td><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" alt={item.name} /></td>
                            <th>{item.qt}</th>


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
