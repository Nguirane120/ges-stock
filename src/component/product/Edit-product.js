import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from '../../Navbar'

const EditProduct = (props) => {
    const [categoriList, setCategoriList] = useState()
    const [picture, setPicture] = useState([])
 
   const [error_list, setErrorList] = useState([])
 
    const [products, setProducts] = useState({
        category_id:'',
        name:'',
        price:'',
        qt:'',
     
    })
 
    const {category_id, slug, name, price, qt} = products
    const handleChange = (e) =>{
        e.persist()
        setProducts({...products, [e.target.name]: e.target.value})
    }
 
    const handleImage = e =>{
          e.persist()
         setPicture({image: e.target.files[0]})
    }
 
     useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/show-category`).then((res) =>{
            setCategoriList(res.data.categories)
            })
    
            const produc_id = props.match.params.id
    
            axios.get(`http://127.0.0.1:8000/api/edit-product/${produc_id}`).then((res) =>{
                if(res.data.status === 200)
                {
                    setProducts(res.data.product)
                    
                }
    
                else if(res.data.status === 404)
                {
                    // swal("Error", res.data.error, 'error')
                    // history.push('/admin/products')
    
                }
    
                // setLoadning(false)
            })
        }, [props.match.params.id])
     
 
     const handleSubmit = (e) =>{
         e.preventDefault()
 
         const formDate = new FormData()
         formDate.append('image', picture.image);
         formDate.append('category_id', category_id);
         formDate.append('name', name);
         formDate.append('price', price );
         formDate.append('qt', qt );
         const produc_id = props.match.params.id
 
         axios.post(`http://127.0.0.1:8000/api/update-product/${produc_id}`, formDate).then( res =>{
             console.log('Res',res)
             if(res.data.status === 200)
             {
                 Swal("Success", res.data.message, 'success')
                 // setErrorList([])
                 setProducts({
                     category_id:'',
                     name:'',
                     price:'',
                     qt:'',
                
                 })
             }
             // else if(res.data.status == 422)
             // {
             //     swal("Veuillez remplir tous les champs",'', 'error')
             //     setErrorList(res.data.errors)
             // }
             
         })
     }
    return (
        <>
        <Navbar/>
        <div className="container">

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit product
                        <Link to='/product-list' className='btn btn-primary float-end'>View prouct</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Seo Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Other</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="card-body borded">
                                    <div className="form-group mb-3">
                                        <label>Select Category</label>
                                        <select className="form-select" name='category_id' onChange={handleChange} value={category_id} aria-label="Default select example">
                                           
                                            <option>Select Category</option>
                                           {
                                               categoriList && categoriList.map((category, index) =>{
                                                   return(
                                                       <>
                                                        <option value={category.id} key={index.id}>{category.name}</option>
                                                        
                                                       </>
                                                   )
                                               })
                                           }
                                        </select>
                                        {/* <small className='text-danger'>{error_list.category_id}</small> */}
                                    </div>
                            
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Name</label>
                                        <input type="text" name="name" id="" className="form-control" onChange={handleChange} value={name}/>
                                        {/* <small className='text-danger'>{error_list.name}</small> */}
                                    </div>
                                    
                                </div>
                            </div>
                         
                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <div className="row">
                                    
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Price</label>
                                        <input type="text" name="price" id="" className="form-control" onChange={handleChange} value={price}/>
                                        {/* <small className='text-danger'>{error_list.original_price}</small> */}
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Quantity</label>
                                        <input type="text" name="qt" id="" className="form-control" onChange={handleChange} value={qt}/>
                                        {/* <small className='text-danger'>{error_list.qt}</small> */}
                                    </div>
                                  
                                    <div className="col-md-8 form-group mb-3">
                                        <label htmlFor="">Image</label>
                                        <input type="file" name="image" onChange={handleImage}  className="form-control" />
                                        {/* <small className='text-danger'>{error_list.image}</small> */}
                                    </div>
                                    


                                </div>
                               
                            </div>
                        </div>
                        <button type="submit" className="btn px-4 btn-primary float-center mt-4">ADD</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default EditProduct
