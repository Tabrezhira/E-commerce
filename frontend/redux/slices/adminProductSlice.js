import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import { response } from "express";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
const USER_TOKEN = `Bearer ${localStorage.getItem('userToken')}`

// async thunk to fetch admin product
export const fetchAdminProducts = createAsyncThunk('adminProducts/fetchProducts', async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('userToken')}`
        }
    })
    return response.data;
})

// async function to create a new product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async(productData) => {
    const response = await axios.post(
        `${API_URL}/api/admin/products`,
        productData,{
            headers:{
                Authorization: USER_TOKEN,
            },
        }
    );
    return response.data
})

// async thunk to update an existing product

export const updateProduct = createAsyncThunk('adminProducts/updateProduct', async({id, productData}) =>{
    const response = await axios.put(`${API_URL}/api/admin/products/${id}`,productData,{
        headers:{
            Authorization:USER_TOKEN,
        },
    })
    return response.data;
})

// async thunk to delete a product

export const deleteProduct = createAsyncThunk('adminProduct/deleteProduct', async(id) =>{
    await axios.delete(`${API_URL}/api/admin/products/${id}`,{
        headers:{Authorization: USER_TOKEN}
    })
    return id;

});

const adminProductSlice = createSlice({
    name:'adminProducts',
    initialState:{
        product:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchAdminProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.product =action.payload
        })
        .addCase(fetchAdminProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // Create Product
        .addCase(createProduct.fulfilled,(state, action)=>{
            state.product.push(action.payload)
        })
        // Update Product
        .addCase(updateProduct.fulfilled, (state, action) => {
            const index = state.products.findIndex(
                (product) => product._id === action.payload._id
            )
            if(index !== -1){
                state.product[index] = action.payload
            }
        })
        // Delete Product
        .addCase(deleteProduct.fulfilled, (state,action) => {
            state.products = state.product.filter(
                (product) => product._id !== action.payload
            )
        })
    }
})

export default adminProductSlice.reducer