import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useLocation } from 'react-router-dom'
import Navbar from '../../Navbar'
// import swal from 'sweetalert'

const EditCat = (props) => {


    const [category, setCategory] = useState({})

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const location = useLocation();

    const itemcategory = useSelector( state => state)

    console.log("aythia", itemcategory)

    const dispatch = useDispatch()

   useEffect(() =>{

    setCategory(props.location.state)
   }, [])
   console.log(category)

//    const {name, description} = category

const handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
        'id':category.id,
        name,
        description
    
    }

    dispatch({type:"UPDATE_CATEGORY", payload:data})

    axios.post(`http://localhost:8010/update_category`,{"jsonrpc":"2.0", "params":data} ).then( res =>{
        if(res.data.result.status === 200){
            alert("Success", res.data.result.message)
            setCategory({

                name:'',
                description:""
           
            })
        }
        
    })
}



  return (
    <>
    <Navbar/>
    <div className="container px-4">
        <h5 className='mt-3'>Edit Category

        <Link className="btn  btn-primary float-end" to='/list-categories'> Category List</Link>
        </h5>

  
    <form onSubmit={handleSubmit}>
<div className="tab-content mt-5" id="myTabContent">
    
  <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">
 
        <div className="form-group mb-3">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="" className="form-control mb-3"  onChange={(e) => setName(e.target.value)} value={category.name} />
        </div>
        <div className="form-group mb-3">
        <label htmlFor="name">Description</label>
        <input type="text" name="description" id="" className="form-control mb-3"  onChange={(e) => setDescription(e.target.value)} value={description} />
        </div>
 
    
    </div>
 

</div>
<button type="submit" className="btn btn-primary float-end mt-4">Edit</button>
</form>
    </div>
    </>
  )
}

export default EditCat