import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { Route } from 'react-router-dom';
import Home from './Home';
import AddCategory from './component/categories/Cat-Form';
import { ShowCategory } from './component/categories/Cat-List';
import Addproduct from './component/product/Add-product';
import Products from './component/product/Product_List';
import EditProduct from './component/product/Edit-product';

function App() {
  return (
    <>
      <Navbar/>
      <Route exact path='/' component={Home}/>
      <Route path='/add-category' component={AddCategory}/>
      <Route path='/show-category' component={ShowCategory}/>
      <Route path='/add-product' component={Addproduct}/>
      <Route path='/product-list' component={Products}/>
      <Route path='/edit-product/:id' component={EditProduct}/>





    </>
  );
}

export default App;
