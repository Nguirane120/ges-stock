import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
const Login = () => {
 
    
   const [odologin, setOdooLogin] = useState({
    email:'',
    password:'',
    error_list:[]
})

const {login, password} = odologin;
const history = useHistory()

const handleChange = (e) =>{
    e.persist()
    setOdooLogin({...odologin, [e.target.name]: e.target.value})
}

const handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
        login,
        password
    }

    axios.post(`http://localhost:8010/api/session/login`, {
    "jsonrpc":"2.0",
    "params":data
    }).then((res) =>{
        console.log("Res", res)
        if(res.data.result.user_id === 2){
            localStorage.setItem('session_id',res.data.result.session_id)
            history.push('/product-list')
            alert("Bienvenu")

        }
        else{
            alert("Error")
            history.push('/')
          }
     
       
        
    })
 

}

// const { error_list} = login

return (
 <>
 <p>{React.version}</p>
     <div className="container">
         <div className="row justify-content-center">
             <div className="col-md-6 py-5">
                 <div className="card">
                     <div className="card-header">Login</div>
                     <div className="card-body">
                         <form onSubmit={handleSubmit}>
                         <div className="form-group mb-3">
                             <label>Email</label>
                             <input type="text" name="login" onChange={handleChange} value={login} className='form-control' />
                             {/* <span>{error_list.email}</span> */}
                         </div>
                         <div className="form-group mb-3">
                             <label>Password</label>
                             <input type="password" name="password" onChange={handleChange} value={password} className='form-control' />
                             {/* <span>{error_list.password}</span> */}
                         </div>
                         <div className="form-group mb-3">
                             <button type='submit' className='btn btn-primary'>Login</button>
                         </div>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </>
)
  
}

export default Login
