import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import checkoutReducer from './slices/checkoutSlice'
import orderReducer from './slices/orderSlice'
import adminReducer from './slices/adminSlice.js'
import adminProductReducer from './slices/adminProductSlice.js'
import adminOrdersReducer from './slices/adminOrderSlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        checkout:checkoutReducer,
        orders:orderReducer,
        admin:adminReducer,
        adminProduct:adminProductReducer,
        adminOrders: adminOrdersReducer
    }
});


export default store;
