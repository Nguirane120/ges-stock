import axios from 'axios'
import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../Navbar'
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {

    // const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState()
    const history = useHistory()

    const products = useSelector( state => state.allProducts.products)



    const dispatch = useDispatch()

    const fectchproduct = async () =>{
    const res =  await  axios.post(`http://localhost:8010/get_products`, {}).catch( error =>{
            console.log(error)
        })
        dispatch({type:"PRODUCT_LIST", payload:res.data.result.response})
        
    };

    
    useEffect(() => {
        fectchproduct()
    }, [])

    // console.log("produit in redux", products)





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

   

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row mt-5 gy-5'>
                {
                        products.map((item) =>{
                            return(
                                <>
                                
                            <div className='col-md-4'>

                        <div class="card" style={{width: '18rem'}}>
                        
                    <img src={item.img} class="card-img-top img-fluid" alt="..."/>
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