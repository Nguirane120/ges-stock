import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Navbar'

const EditEntree = (props) => {


    const [productiList, setProductiList] = useState()
    const [products, setProducts] = useState({
        product_id: '',
        auType: '',
        qte: '',

    })


    const history = useHistory()

    let { product_id, auType, qte } = products



    useEffect(() => {
        axios.post(`http://localhost:8010/get_products`, {"params":{}}).then((res) => {
           setProductiList(res.data.result.response)
        })
    }, [])

    useEffect(() => {

        setProducts(props.location.state)
    }, [])
    console.log("produit a modifier",products)

    const handleChange = (e) => {
        e.persist()
        setProducts({ ...products, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            'id': products.id,
            auType,
            qte,
   
        }

        axios.post(`http://localhost:8010/update_stock`, { "jsonrpc": "2.0", "params": data }).then(res => {
            if(res.data.result.status == 200){
                alert(res.data.result.message)
                history.push('/list-stock')
            }
        })
    }




  return (
    <>
        <Navbar/>
        <div className="container">

<div className="card mt-4">
    <div className="card-header">
        <h4>Edit entree
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
                                                <option key={index.id}>{item.name}</option>

                                            </>
                                        )
                                    })
                                }
                        </select>

                    </div>

                    <div className="form-group mb-3 col-md-8">
                                    <label htmlFor="">Operation</label>
                                    <select className="form-select" name='auType' onChange={handleChange} value={auType} >
                                            <option></option>
                                            <option value="entree">Entree</option>
                                            <option value="sortie">Sortie</option>

                                    </select>

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

export default EditEntree