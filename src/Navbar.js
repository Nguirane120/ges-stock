import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {

//   const dispatch = useDispatch()

//   const { user } = useSelector( state => state.user)
// const logout = () =>{
//   if(user){
//     return(
//       <>
//         <li className="nav-item">
//           <button className="btn btn-ligth">logout</button>
//         </li>
//       </>
//     )
//   }

// }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" href="#">GEST-STOCK</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="#">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/product-list'>Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/list-categories">Category</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/list-stock">Entree</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/liste-vente">Sortie</Link>
        </li>
        {/* {
          logout
        } */}
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar
