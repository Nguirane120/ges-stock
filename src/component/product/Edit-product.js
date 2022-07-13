import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from '../../Navbar'

const EditProduct = (props) => {
    const [categoriList, setCategoriList] = useState()
    const [product, setProduct] = useState([])


    const [products, setProducts] = useState({
        name_category: '',
        name: '',
        pu: '',
        qte: '',
        img: ''

    })


    useEffect(() => {
        axios.post(`http://localhost:8010/get_categories`, {}).then((res) => {
            console.log(res.data.result.response)
            setCategoriList(res.data.result.response)
        })

    }, [])


    useEffect(() => {

        setProduct(props.location.state)
    }, [])
    console.log(product)

    const { name_category, img, name, pu, qte, description } = products
    const handleChange = (e) => {
        e.persist()
        setProducts({ ...products, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            'id': product.id,
            name,
            description,
            name_category,
            qte,
            img
        }

        axios.post(`http://localhost:8010/update_product`, { "jsonrpc": "2.0", "params": data }).then(res => {
            console.log("Res", res)
        })
    }





    return (
        <>
            <Navbar />
            <div className="container">

                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Edit product
                            <Link to='/product-list' className='btn btn-primary float-end'>View prouct</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="row ">
                                <div className="card-body borded">
                                    <div className="form-group mb-3 col-md-8">
                                        <label>Select Category</label>
                                        <select className="form-select" name='category_id' onChange={handleChange} value={name_category} aria-label="Default select example">

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
                                        <textarea name="description" id="" className="form-control" onChange={handleChange} value={description}></textarea>

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
                                    <input type="text" name="img" onChange={handleChange} value={img} className="form-control" />
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

export default EditProduct
