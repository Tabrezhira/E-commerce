import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import { Toaster, toast } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/Products/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailsPages from './pages/OrderDetailsPages';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHome from './components/Admin/AdminHome';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProduct from './components/Admin/EditProduct';
import OrderMangement from './components/Admin/OrderMangement';

import {Provider} from 'react-redux'
import store from '../redux/store'

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position='top-right'/>
    <Routes>
      <Route path='/' element={<UserLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='collections/:collection' element={<CollectionPage/>}/>
      <Route path='product/:id' element={<ProductDetails/>}/>
      <Route path='checkout' element={<Checkout/>}/>
      <Route path='order-confirmation' element={<OrderConfirmationPage/>}/>
      <Route path='order/:id' element={<OrderDetailsPages/>}/>
      <Route path='my-orders' element={<MyOrdersPage/>}/>
      </Route>
      
      
      
      <Route path='/admin' element={<AdminLayout/>} >
        <Route index element={<AdminHome/>}/>
        <Route path='users' element={<UserManagement/>}/>
        <Route path='products' element={<ProductManagement/>}/>
        <Route path='products/:id/edit' element={<EditProduct/>}/>
        <Route path='orders' element={<OrderMangement/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
