const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');


//@route POST /api/products
//@desc Create a new Product
//@access Private/Admin


router.post('/', protect,admin, async (req, res) => {
    try {
        const {
            name, description, price, discountPrice, countInStock,
            category, brand, sizes, colors, collections, material,
            gender, images, isFeatured, isPublished, tags,
            dimensions, weight, sku
        } = req.body;

        // Validation: Ensure required fields are provided
        if (!name || !description || !sku || !category || !sizes || !colors || !collections) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Creating new product
        const product = new Product({
            name,
            description,
            price, 
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id
        });

        // Save product to DB
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

//@route PUT /api/products/:id
//@desc Update an existing product ID
//@access Private/Admin

router.put('/:id',protect,admin, async(req,res)=>{
    try {
        const {
            name, description, price, discountPrice, countInStock,
            category, brand, size, colors, collections, material,
            gender, images, isFeatured, isPublished, tags,
            dimensions, weight, sku
        } = req.body;

         // Find product by ID
         let product = await Product.findById(req.params.id);

         if (!product) {
             return res.status(404).json({ message: "Product not found" });
         }
 
         // Update product fields only if new values are provided
         product.name = name || product.name;
         product.description = description || product.description;
         product.price = price || product.price;
         product.discountPrice = discountPrice || product.discountPrice;
         product.countInStock = countInStock || product.countInStock;
         product.category = category || product.category;
         product.brand = brand || product.brand;
         product.size = size || product.size;
         product.colors = colors || product.colors;
         product.collections = collections || product.collections;
         product.material = material || product.material;
         product.gender = gender || product.gender;
         product.images = images || product.images;
         product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
         product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
         product.tags = tags || product.tags;
         product.dimensions = dimensions || product.dimensions;
         product.weight = weight || product.weight;
         product.sku = sku || product.sku;
 
         // Save updated product
         const updatedProduct = await product.save();
 
         res.status(200).json(updatedProduct);
 
     } catch (error) {
         console.error("Error updating product:", error);
         res.status(500).json({ message: "Server Error", error: error.message });
     }
})

//@route DELETE /api/products/:id
//@desc Delete an existing product by ID
//@access Private/Admin

router.delete('/:id',protect,admin, async(req,res) => {
    try{
        //Find the Product by ID
        const product = await Product.findById(req.params.id)
        if(product){
            await product.deleteOne();
            res.json({message:'Product removed'})
        }
    }catch{
        console.error("Error delete product:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
})

module.exports = router;
