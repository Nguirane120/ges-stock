import axios from 'axios'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../../Navbar'
// import swal from 'sweetalert'

const AddCategory = () => {


    const [category, setCategory] = useState({
        name:'',
        description:""
    })

    const history = useHistory()
    const dispatch = useDispatch()
    const { name, description} = category

    const handleChange = (e) =>{
        e.persist()
        setCategory({...category, [e.target.name]:e.target.value})
    }

const handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
        name,
        description
    
    }

    console.log(data)

    dispatch({type:"ADD_CATEGORY", payload: data})

    

    axios.post(`http://localhost:8010/create_category`, {"jsonrpc":"2.0","params":data}).then(res => {
        if('Res', res.data.result.status == 200){
            alert(res.data.result.message)
            history.push('/list-categories')
        }else{
            alert(console.error())
        }

    })
}



  return (
    <>
    <Navbar/>
    <div className="container px-4">
        <h5 className='mt-3'>Add Category

        <Link className="btn  btn-primary float-end" to='/list-categories'> Category List</Link>
        </h5>

  
    <form onSubmit={handleSubmit}>
<div className="tab-content mt-5" id="myTabContent">
    
  <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">
 
        <div className="form-group mb-3">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="" className="form-control mb-3"  onChange={handleChange} value={name} autoComplete='true'/>
        </div>
        <div className="form-group mb-3">
        <label htmlFor="name">Description</label>
        <input type="text" name="description" id="" className="form-control mb-3"  onChange={handleChange} value={description} autoComplete='true'/>
        </div>
 
    
    </div>
 

</div>
<button type="submit" className="btn btn-primary float-end mt-4">Add</button>
</form>
    </div>
    </>
  )
}

export default AddCategory