const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const connectDB = require('./config/db')
app.use(express.json())
app.use(cors())

dotenv.config()



const Port = process.env.PORT || 3000;

// Connect 
connectDB()

app.get('/', (req,res) => {
    res.send('Welcome to Rabbit API!')
})

app.listen(Port,()=>{
    console.log(`Server is running on http://localhost:${Port}`)
})