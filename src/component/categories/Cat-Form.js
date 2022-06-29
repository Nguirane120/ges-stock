// import axios from 'axios'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
// import swal from 'sweetalert'

const AddCategory = () => {


    const [category, setCategory] = useState({
 
        name:'',
      

    })

    const { name} = category

    const handleChange = (e) =>{
        e.persist()
        setCategory({...category, [e.target.name]:e.target.value})
    }

const handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
        name,
    
    }

    // axios.post(`api/add-category`, data).then( res =>{
    //     if(res.data.status === 200){
    //         swal("Success", res.data.message, 'success')
    //         setCategory({
    //             slug:'',
    //             name:'',
    //             description:'',
    //             status:'',
    //             meta_title:'',
    //             meta_keywords:'',
    //             meta_description:'',
    //             error_list:[]
    //         })
    //     }else if( res.data.status === 400){
    //         setCategory({...category, error_list:res.data.errors})
    //         console.log(error_list.slug)
    //     }
        
    // })
}



  return (
    <>
    <div className="container-fluid px-4">
        <h5 className="mx-4">Add Category</h5>
        <Link className="btn  btn-primary" to='/show-category'> Category List</Link>

  
    <form onSubmit={handleSubmit}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="seo-tag-tab" data-bs-toggle="tab" data-bs-target="#seo-tag" type="button" role="tab" aria-controls="seo-tag" aria-selected="false">SEO Tags</button>
  </li>

</ul>
<div className="tab-content" id="myTabContent">
    
  <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">
 
        <div className="form-group mb-3">
        <label htmlFor="name">Name</label>
      
        <input type="text" name="name" id="" className="form-control mb-3"  onChange={handleChange} value={name} autoComplete='true'/>
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