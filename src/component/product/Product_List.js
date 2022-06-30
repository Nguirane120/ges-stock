import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/all-product`).then((res) =>{
            console.log('Res',res)
            if(res.data.status == 200)
            {
               setProducts(res.data.products)
            }
            setLoading(false)
        })
    }, [products])

    const handleDelete = (e, id) =>{
        e.preventDefault()
        const textClicked = e.currentTarget;
        textClicked.innerText = 'Deleting...'
   
        axios.delete(`http://127.0.0.1:8000/api/delete-product/${id}`).then( res =>{
            if(res.data.status === 200)
            {
                // swal("Succes", res.data.message, 'success')
               //  textClicked.closest('tr').remove()
            }
        })
     
    }

    let fetchProducts = ''

    if(loading)
    {
        return(
            <h1>Loading products...</h1>
        )
    }else{
        let producStatus = '';
        fetchProducts = products.map((item, index) =>{
            return(
                <tr key={index}>
                    <td>{item.id}</td>
                    {/* <td>{item.category.name}</td> */}
                    <td>{item.name}</td>
                    <td><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" alt={item.name} /></td>
                    <td>{item.price}</td>
                    <td>{item.qt}</td>
                    <td><Link className='btn btn-warning btn-sm' to={`edit-product/${item.id}`}>Edit</Link></td>
                    <td><Link className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e, item.id)}>Delete</Link></td>

                    <td>{producStatus}</td>
                </tr>
            )
        })
    }

  return (
    <div className="container">
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
                        </tr>
                    </thead>
                    <tbody>
                            { fetchProducts}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Products