import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Navbar'
// import swal from 'sweetalert'

const Addproduct = () => {

    const [categoriList, setCategoriList] = useState()
    const [picture, setPicture] = useState([])

    const [error_list, setErrorList] = useState([])
    const history = useHistory()
    const [products, setProducts] = useState({
        category_id: '',
        name: '',
        pu: '',
        qte: '',
        description:"",
        img:""

    })

    let { category_id, name, pu, qte,description, img } = products
    // const {img} = picture
    const handleChange = (e) => {
        e.persist()
        setProducts({ ...products, [e.target.name]: e.target.value })
    }

    // const handleImage = e => {
    //     e.persist()
    //     setPicture({ img: e.target.files[0] })
    // }

    useEffect(() => {
        axios.post(`http://localhost:8010/get_categories`, {"jsonrpc":"2.0",'params':{}}).then((res) => {
            setCategoriList(res.data.result.response)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        category_id = parseInt(category_id)
        const data = {
            img,
            category_id,
            name,
            pu,
            qte,
            description
        }
        axios.post(`http://localhost:8010/create_product`, {"jsonrpc":"2.0","params":data}).then(res => {
            // console.log('Res', res)
            if (res.data.result.status === 200) {
                alert(res.data.result.message, 'success')
                history.push('/product-list')
                setProducts({
                    category_id: '',
                    name: '',
                    price: '',
                    qte: '',

                })

            }else{
                alert("Error")
            }
        })
    }




    return (
        <>
        <Navbar/>
        <div className="container">

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add product
                        <Link to='/product-list' className='btn btn-primary float-end'>View prouct</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="row ">
                                <div className="card-body borded">
                                    <div className="form-group mb-3 col-md-8">
                                        <label>Select Category</label>
                                        <select className="form-select" name='category_id' onChange={handleChange} value={category_id} aria-label="Default select example">

                                            <option>Select Category</option>
                                            {
                                                categoriList && categoriList.map((category, index) => {
                                                    return (
                                                        <>
                                                            <option value={category.id} key={index.id}>{category.name}</option>

                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                    
                                    </div>

                                    <div className="form-group mb-3 col-md-8">
                                        <label htmlFor="">Name</label>
                                        <input type="text" name="name" id="" className="form-control" onChange={handleChange} value={name} />
                                     
                                    </div>
                                    <div className="form-group mb-3 col-md-8">
                                        <label htmlFor="">Description</label>
                                        <textarea  name="description" id="" className="form-control" onChange={handleChange} value={description}></textarea>
                                     
                                    </div>

                                </div>

                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Price</label>
                                        <input type="text" name="pu" id="" className="form-control" onChange={handleChange} value={pu} />
                                        {/* <small className='text-danger'>{error_list.original_price}</small> */}
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Quantity</label>
                                        <input type="text" name="qte" id="" className="form-control" onChange={handleChange} value={qte} />
                                        {/* <small className='text-danger'>{error_list.qt}</small> */}
                                    </div>

                                    <div className="col-md-8 form-group mb-3">
                                        <label htmlFor="">Image</label>
                                        <input type="text" name="img" onChange={handleChange} className="form-control" />
                                        {/* <small className='text-danger'>{error_list.image}</small> */}
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

export default Addproduct