import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../Navbar'

const StockList = () => {
    const [stocklist, setStockList] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(() =>{
        axios.post(`http://localhost:8010/get_stocks`, {"params":{}}).then((res) =>{
            setStockList(res.data.result.response)
            // let date = new Date().toDateString();
            // // setStockList(res.data.result.response.create_date)
            // // console.log(res.data.result)
            console.log("RES", res.data.result.response)
        })
    }, [])

    //  const getDate = () => {
    //     return  new Date().toDateString();
    //     console.log(date)
    //    }

    const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <>
    <Navbar/>
      <div class="container">
            <Link className='btn btn-lg btn-success mt-5' to='/add-stock'>Entree</Link>
            <Link className='btn btn-lg btn-warning mt-5 float-end' to='/vente'>Sortie</Link>
        <div class="row mt-5">
            <div class="col-md-12">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Operation</th>
                            <th>Produit</th>
                            <th>Quantity</th>
                            <th>Date entree</th>
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

export default StockList
