import axios from 'axios'
import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../Navbar'

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState()
    const history = useHistory()


    useEffect(() => {

        axios.post(`http://localhost:8010/get_products`, {}).then((res) => {
            console.log(res)
            setProducts(res.data.result.response)
            setLoading(false)

        })
    }, [])


const updateProduct = (data) =>{
    console.log(data)
    setProduct(data);
    history.push({
        pathname:"/edit-product",
        state:data

    })
}

    const handleDelete = (id) => {
        const data = {
            "id": id
        }

        console.log(data)
        axios.post(`http://localhost:8010/delete_product`, { 'params': data }).then(res => {
            if (res.data.result.status == 200) {
                alert(res.data.message)
            }
        }).catch(error => {
            console.log("Error", error)
        })

    }

    // let fetchProducts = ''

    // if (loading) {
    //     return (
    //         <h1>Loading products...</h1>
    //     )
    // } else {
    //     fetchProducts = products.map((item, index) => {
    //         return (
    //             <>

    //                 <tr key={index}>
    //                     <td>{item.name_category}</td>
    //                     <td>{item.name}</td>
    //                     <td><img src={item.img} width="50px" alt={item.name} /></td>
    //                     <td>{item.pu}</td>
    //                     <td>{item.qte}</td>
    //                     <td>{item.prix_total}</td>
    //                     <td><Link className='btn btn-warning btn-sm' onClick={() => updateProduct(item)}>Edit</Link></td>
    //                     <td><Link className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</Link></td>
    //                 </tr>
    //             </>
    //         )
    //     })
    // }

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row mt-5'>
                {
                        products.map((item) =>{
                            return(
                                <>
                                
                            <div className='col-md-4'>

                        <div class="card" style={{width: '20rem'}}>
                        
                    <img src={item.img} class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Name: {item.name}</h5>
                        <p class="card-text">Description: {item.description}</p>
                        <p class="card-text">Quantite: {item.qte}</p>
                        <Link className='btn btn-warning btn-sm' onClick={() => updateProduct(item)}>Edit</Link>
                        <Link className="btn btn-danger btn-sm float-end" onClick={() => handleDelete(item.id)}>Delete</Link>
                    </div>
                    </div>
                            </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            {/* <div className="container">
                <div className="card mt-4">
                    <div className="card-header">
                        <h1>Product list
                            <Link to='/add-product' className='btn btn-primary float-end'>Add product</Link>
                        </h1>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>

                                    <th>Category</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Prix total</th>

                                </tr>
                            </thead>
                            <tbody>
                                {fetchProducts}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Products