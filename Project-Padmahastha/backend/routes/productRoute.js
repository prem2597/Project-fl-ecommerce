import express from 'express';
import Product from '../models/productModel';
import { getToken, isAuth, isAdmin } from '../util';

const router = express.Router();

/**
 * route for getting all the product details for the
 * query details like search, sort, brand filter.
 * No authentication and admin required for this route.
*/
router.get("/", async (req, res) => {
    const brand = req.query.brand;
    if (brand) {
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword ? {
      name: {
        $regex: req.query.searchKeyword,
        $options: 'i'
      }
    } : {};
    const sortOrder = req.query.sortOrder ?
      (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
      :
      { _id: -1 };

    const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder).find({brand});
    res.send(products); }
    else {
        const category = req.query.category ? { category: req.query.category } : {};
        const searchKeyword = req.query.searchKeyword ? {
            name: {
                $regex: req.query.searchKeyword,
                $options: 'i'
            }
        } : {};
        const sortOrder = req.query.sortOrder ?
        (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
        :
        { _id: -1 };

        const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
        res.send(products);
    }
});

/**
 * route for getting product details with the product id
 * No authentication and admin required for this route.
*/
router.get("/:id", async(req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: "Product Not Found. "})
    }
});

/**
 * route for creating new product
 * only admin is allowed to this route
 * for creating product.
*/
router.post("/", isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message: 'New Product Created', data: newProduct});
    }
    return res.status(500).send({message: 'Error in Creating Product.'})
})

/**
 * route for updating new product
 * only admin is allowed to this route
 * for updating product.
*/
router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if(updatedProduct){
            return res.status(200).send({message: 'Product Updated', data: updatedProduct});
        }
    }
    return res.status(500).send({message: 'Error in Updating Product.'})
})

/**
 * route for deleting new product
 * only admin is allowed to this route
 * for deleting product.
*/
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send({message: "Product Deleted"});
    } else {
        res.send("Error in Deletion.")
    }
})

export default router;
