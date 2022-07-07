import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from '../../Navbar'

const AddStock = () => {
    const [productiList, setProductiList] = useState()
    const [picture, setPicture] = useState([])

    const [error_list, setErrorList] = useState([])
    const history = useHistory()
    const [products, setProducts] = useState({
        product_id: '',
        name: '',
        qte: '',

    })

    let { product_id, name, qte } = products
    const handleChange = (e) => {
        e.persist()
        setProducts({ ...products, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        axios.post(`http://localhost:8010/get_products`, {"params":{}}).then((res) => {
           setProductiList(res.data.result.response)
        })
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault()
        product_id = parseInt(product_id)
        const data = {
           product_id,
            name,
            qte
        }

        console.log(data)
       


        axios.post(`http://localhost:8010/addstock`, {"jsonrpc":"2.0","params":data}).then(res => {
            console.log('Res', res)
            // if (res.data.status === 200) {
            //     Swal("Success", res.data.message, 'success')
            //     // setErrorList([])
            //     history.push('/product-list')
            //     setProducts({
            //         product_id: '',
            //         name: '',
            //         qt: '',

            //     })

            // }
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
                    <h4>Add Stock
                        <Link to='/list-stock' className='btn btn-primary float-end'>View stock</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className="row ">
                            <div className="card-body borded">
                                <div className="form-group mb-3 col-md-8">
                                    <label>Select Product</label>
                                    <select className="form-select" name='product_id' onChange={handleChange} value={product_id} aria-label="Default select example">
                                        
                                            <option>Select Product</option>
                                            {
                                                productiList && productiList.map((item, index) => {
                                                    return (
                                                        <>
                                                            <option value={item.id} key={index.id}>{item.name}</option>

                                                        </>
                                                    )
                                                })
                                            }
                                    </select>

                                </div>

                                <div className="form-group mb-3 col-md-8">
                                    <label htmlFor="">Nom Agent</label>
                                    <input type="text" name="name" id="" className="form-control" onChange={handleChange} value={name} />

                                </div>

                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label htmlFor="">Quantity</label>
                                <input type="text" name="qte" id="" className="form-control" onChange={handleChange} value={qte} />
                                {/* <small className='text-danger'>{error_list.qt}</small> */}
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

export default AddStock
