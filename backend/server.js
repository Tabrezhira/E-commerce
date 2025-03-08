const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productsRoutes')
const cartRoutes = require('./routes/cartRoutes')
const checkoutRoutes = require('./routes/checkoutRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
app.use(express.json())
app.use(cors())

dotenv.config()
const Port = process.env.PORT || 3000;
// Connect 
connectDB()





app.get('/', (req,res) => {
    res.send('Welcome to Rabbit API!')
})


// API Routes

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.listen(Port,()=>{
    console.log(`Server is running on http://localhost:${Port}`)
})