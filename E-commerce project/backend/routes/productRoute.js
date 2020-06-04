import express from 'express';
import Product from '../models/productModel';
import { getToken } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
	const products = await Product.find({});
	res.send(products);
});

router.post("/", async (req, res) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		image: req.body,image,
		brand: req.body.brand,
		category: req.body.category,
		countInStock: req.body.countInStock,
		description: req.body.description,
		rating: req.body.rating,
		numReviews: req.body.numReviews,
	});
	const newProduct = await product.save();
	if (product) {
		return res.status(201).send({ msg: 'New Product created.', data: newProduct });
	}
	return res.status(500).send({ msg: 'Error in creating product' });
})

export default router;