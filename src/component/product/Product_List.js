import axios from 'axios'
import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../Navbar'

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [catData, setCatData] = useState()
    const history =  useHistory()

    // const getProd = async () =>{
    //     try {
    //         const response = await axios.post(`http://localhost:8010/get_products`, {
    //             // "jsonrpc":2.0,
    //             // "params":{
    //             // }
            
    //         });
    //         console.log(response.data.result.response);
    //         const listProducts =response.data.result.response;
    //         // console.log(response)
    //       } catch (error) {
    //         console.log(" message d'erreur: ", error.message);
    //       }
    // }

    useEffect(() =>{
        // getProd()
        axios.post(`http://localhost:8010/get_products`, {}).then((res) =>{
        console.log('Res',res)
        setProducts(res.data.result.response)
        setLoading(false)
        
        })
    }, [products])

    


    const onUpdateSumbit=(data)=>{
        console.log(data)
        setCatData(data);
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
        let producStatus = '';
        fetchProducts = products.map((item, index) =>{
            return(
                <>
                
                <tr key={index}>
                    <td>{item.name_category}</td>
                    <td>{item.name}</td>
                    <td><img src={`http://localhost:8070/${item.image}`} width="50px" alt={item.name} /></td>
                    <td>{item.pu}</td>
                    <td>{item.qte}</td>
                    <td><Link className='btn btn-warning btn-sm' onClick={onUpdateSumbit(item)}>Edit</Link></td>
                    <td><Link className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e, item.id)}>Delete</Link></td>

                    <td>{producStatus}</td>
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