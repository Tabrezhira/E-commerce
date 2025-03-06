import React, { useState } from 'react'

function EditProduct() {
    const [productData, setProductData] = useState({
        name:'',
        description:'',
        price:0,
        countInStock:0,
        sku:'',
        category:'',
        brand:'',
        size:[],
        colors:[],
        collections:'',
        material:'',
        gender:'',
        images:[
            {
                url:'https://picsum.photos.150?random=1',
            },
            {
                url:'https://picsum.photos.150?random=2',
            },
        ]
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProductData((prevData) => ({...prevData, [name]:value}))
    }
    console.log(productData)
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
        <h2 className='text-3xl fount-bold mb-6'>Edit Product</h2>
        <form>
            {/* Name */}
            <div className="mb-6">
                <label className='block font-semibold mb-2'>Product Name</label>
                <input type="text" name='name' value={productData.name} onChange={handleChange} 
                className=' w-full border border-gray-300 rounded-md p-2' required/>
            </div>

            {/* Description */}
            <div className="mb-6">
                <label className='block font-semibold mb-2'>Description</label>
                <textarea name="description" value={productData.description} onChange={handleChange}  className='w-full border border-gray-300 rounded-md p-2' row={4} required />
            </div>

            {/* Price */}
            <div className='mb-6'>
            <label className='block font-semibold mb-2'>Price</label>
            <input type="number" name='price' value={productData.price} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
            </div>

            {/* Count In Stock */}
            <div className='mb-6'>
            <label className='block font-semibold mb-2'>Count in Stock</label>
            <input type="number" name='countInStock' value={productData.countInStock} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
            </div>


            {/* SKU */}
            <div className='mb-6'>
            <label className='block font-semibold mb-2'>SKU</label>
            <input type="text" name='sku' value={productData.sku} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
            </div>

            {/* Sizes */}
            <div className='mb-6'>
            <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
            <input type="text" name='size' value={productData.size.join(',')} onChange={(e)=>setProductData({...productData,size: e.target.value.split(',').map((size)=> size.trim())})} className='w-full border border-gray-300 rounded-md p-2' />
            </div>
        </form>
    </div>
  )
}

export default EditProduct