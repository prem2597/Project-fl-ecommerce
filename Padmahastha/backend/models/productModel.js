/**
 * @mongoose is imported form mongoose which facilitates to create schema for products
 */
import mongoose from 'mongoose';

/**
 * These are the attributes a product possess
 * @name is the name of the product which is being added to the mongodb
 * @image is the correspoonding image of the product
 * @brand is the brand of the product
 * @price is the price of the product
 * @category is the category which the product belongs to
 * @countinStock is the number of quantities the product have
 * @description the description about the product given by the author
 * @rating the rating which the product has
 * @numReviews number of reviews the product has
 */

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true }
});
/**
 * @Product is the product made by the productSchema
 */
const productModel = mongoose.model("Product", productSchema);
/**
 * The productModel is exported so that it can be used in other files.
 */
export default productModel;