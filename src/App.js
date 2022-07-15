import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import { Route } from 'react-router-dom';
import Home from './Home';
import AddCategory from './component/categories/Cat-Form';
import { ShowCategory } from './component/categories/Cat-List';
import Addproduct from './component/product/Add-product';
import Products from './component/product/Product_List';
import EditProduct from './component/product/Edit-product';
import AddStock from './component/product/AddStock';
import StockList from './component/product/StockList';
import Login from './component/Login';
import EditCat from './component/categories/Edit-Cat';
import Vente from './component/Vente';
import ListeVente from './component/ListeVente';
import EditEntree from './component/product/Edit-entree';
import EditSortie from './component/product/Edit-sortie';

// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Accept'] = 'application/json'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
// // axios.defaults.headers.post['sameSite'] = 'None'
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'


function App() {
  return (
    <>
      <Route exact path='/' component={Login}/>
      <Route path='/add-category' component={AddCategory}/>
      <Route path='/list-categories' component={ShowCategory}/>
      <Route path='/edit-category' component={EditCat}/>
      <Route path='/add-product' component={Addproduct}/>
      <Route path='/product-list' component={Products}/>
      <Route path='/edit-product' component={EditProduct}/>
      <Route path='/add-stock' component={AddStock}/>
      <Route path='/list-stock' component={StockList}/>
      <Route path='/vente' component={Vente}/>
      <Route path='/liste-vente' component={ListeVente}/>
      <Route path='/edit-entree' component={EditEntree}/>
      <Route path='/edit-sortie' component={EditSortie}/>



    </>
  );
}

export default App;
