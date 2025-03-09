import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

// Async Thunk to Fetch Products by Collection and optional Filters
export const fetchProductsByFilters = createAsyncThunk(
    "products/fetchByFilters",
    async({
        collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
    }) => {
        const query = newURLSearchParams()
        if(collection) query.append("collection", collection)
        if(size) query.append("collection", size)
        if(color) query.append("collection", color)
        if(gender) query.append("collection", gender)
        if(minPrice) query.append("collection", minPrice)
        if(maxPrice) query.append("collection", maxPrice)
        if(sortBy) query.append("collection", sortBy)
        if(search) query.append("collection", search)
        if(category) query.append("collection", category)
        if(material) query.append("collection", material)
        if(brand) query.append("collection", brand)
        if(limit) query.append("collection", limit)
        
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`)
        return response.data
    }
);

// Async thunk to fetch a single product by Id

export const fetchProductDetails = createAsyncThunk('products/fetchProductDetails', async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
    return response.data
}) 

// Async thunk to fetch similar products
export const updateProduct = createAsyncThunk('products/updateProduct', async ({id, productData}) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
    return response.data
})

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
    'products/fetchSimilarProducts', async({id}) =>{
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
        );
        return response.data
    }
)

const productsSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProduct: null, // Store the details of the single Product
        similarProducts:[],
        loading:false,
        error:null,
        filters:{
            category:"",
            size:'',
            color:'',
            gender:'',
            brand:'',
            minPrice:'',
            maxPrice:'',
            sortBy:'',
            search:'',
            material:'',
            collection:''
        }
    },
    reducers:{
        setFilters:(state, action) =>{
            state.filters = { ...state.filters, ...action.payload}
        },
        clearFilters:(state) => {
            state.filters = {
                category:"",
                size:'',
                color:'',
                gender:'',
                brand:'',
                minPrice:'',
                maxPrice:'',
                sortBy:'',
                search:'',
                material:'',
                collection:''

            }

        }
    },
    extraReducers:(builder) =>{
        builder
        // handle fetching products with filter
        .addCase(fetchProductsByFilters.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchProductsByFilters.fulfilled,(state, action) => {
            state.loading = false;
            state.products = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchProductsByFilters.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // Handle fetching single product details
        .addCase(fetchProductDetails.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchProductDetails.fulfilled,(state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload 
        })
        .addCase(fetchProductDetails.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // Handle updating product
        .addCase(updateProduct.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(updateProduct.fulfilled,(state, action) => {
            state.loading = false;
            const updateProduct = action.payload;
            const index = state.products.findIndex(
                (product) => product._id === updateProduct._id
            );
            if(index !== -1){
                state.products[index] = updateProduct;
            }
        })
        .addCase(updateProduct.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // Handle similarProduct
        .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchSimilarProducts.fulfilled,(state, action) => {
            state.loading = false;
            state.products = action.payload
        })
        .addCase(fetchSimilarProducts.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})


export const {setFilters, clearFilters} = productsSlice.actions;
export default productsSlice.reducer