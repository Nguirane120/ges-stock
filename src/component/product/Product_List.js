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


    useEffect(() =>{
      
        axios.post(`http://localhost:8010/get_products`, {}).then((res) =>{
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
    
    const handleDelete = (e, id) =>{
        e.preventDefault()
        const textClicked = e.currentTarget;
        textClicked.innerText = 'Deleting...'
   
        // axios.delete(`http://127.0.0.1:8000/api/delete-product/${id}`).then( res =>{
        //     if(res.data.status === 200)
        //     {
        //         Swal("Succes", res.data.message, 'success')
        //        //  textClicked.closest('tr').remove()
        //     }
        // })
     
    }

    let fetchProducts = ''

    if(loading)
    {
        return(
            <h1>Loading products...</h1>
        )
    }else{
        fetchProducts = products.map((item, index) =>{
            return(
                <>
                
                <tr key={index}>
                    <td>{item.name_category}</td>
                    <td>{item.name}</td>
                    <td><img src={`http://localhost:8070/${item.image}`} width="50px" alt={item.name} /></td>
                    <td>{item.pu}</td>
                    <td>{item.qte}</td>
                    <td>{item.prix_total}</td>
                    <td><Link className='btn btn-warning btn-sm' onClick={updateProduct(item)}>Edit</Link></td>
                    <td><Link className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e, item.id)}>Delete</Link></td>
                </tr>
                </>
            )
        })
    }

  return (
    <>
    <Navbar/>
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
                            <th>Prix total</th>

                        </tr>
                    </thead>
                    <tbody>
                            { fetchProducts}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Products