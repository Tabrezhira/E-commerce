import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`

// async thunk to fetch admin product
export const fetchAdminProducts = createAsyncThunk('adminProducts/fetchProducts', async () => {
    const response = await axios.get(``)
})