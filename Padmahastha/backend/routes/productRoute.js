import express from 'express';
import Product from '../models/productModel';
import { getToken, isAuth, isAdmin } from '../util';

const router = express.Router();

/**
 * Whenever the method is get all the products are displayed.
 * @
 * @category is the catogory to which the corresponding product belongs to
 * @searchKeyword the letter/word on which the search happens
 * @sortOrder a constant which stores in which order the sorting must take place
 * and idsplays accordingly
 * @products the products sorted based on the sort order and category given
 */
router.get("/", async (req, res) => {
	// const products = await Product.find({});
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
});
/**
 * Whenever we click on the product it takes the unique @/:id and responses the product if found.
 */
router.get("/:id", async (req, res) => {
	const product = await Product.findOne({ _id: req.params.id });
	if (product) {
		res.send(product);
	}
	else {
		res.status(404).send({ message: "Product Not Found." });
	}
});
/**
 * @post if the request if post then the admin can access this route
 * If the user is admin and is authenticated, then he can access.
 * @product he can create the Products by havving following attributes as specified in product model.
 * Can refer to product model.
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
	/**
	 * @newProduct is saved
	 * @returns that product is created and is updated to the database if success
	 * else @returns  error in creating the product message
	 */
	const newProduct = await product.save();
	if (product) {
		return res.status(201).send({ msg: 'New Product created.', data: newProduct });
	}
	return res.status(500).send({ msg: 'Error in creating product' });
})

/**
 * @put it takes the parameter @id if the product already exists then user(admin) can access this route
 * @productId is the id of the product got using req.params.id
 * @product is the product ot using the query by passing productid obtained above
 * if product exists the product can be update else returns error message
 * @updatedProduct is the product updated and is saveed.
 */

router.put("/:id", isAuth, isAdmin, async (req, res) => {
	const productId = req.params.id;
	const product = await Product.findById(productId);
	if (product) {
		product.name = req.body.name;
		product.price = req.body.price;
		product.image = req.body.image;
		product.brand = req.body.brand;
		product.category = req.body.category;
		product.countInStock = req.body.countInStock;
		product.description = req.body.description;
		const updatedProduct = await product.save();
		if (updatedProduct) {
			return res.status(200).send({ msg: 'Product updated.', data: updatedProduct });
		}
	}
	return res.status(500).send({ msg: 'Error in updating product' });
});
/**
 * @delete a route to delete the product
 * checks if the user is the autrhenticate admin
 * @deleteProduct is the product retrieved using query by passing id of the product and is removed
 */
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
	const deletedProduct = await Product.findById(req.params.id);
	if (deletedProduct) {
		await deletedProduct.remove();
		res.send({ message: "Product Deleted" });
	}
	else {
		res.send("Error in Deletion.");
	}
});
/**
 * @router is exported
 */

export default router;