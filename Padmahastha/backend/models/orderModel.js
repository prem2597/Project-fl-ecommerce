import mongoose from 'mongoose';
/**
 * @shippingSchema model whiich is related to the shipping info
 * @address adrrress of the delivery
 * @city to which cty the order is to be delivered
 * @postalCode the zipcode of the city
 * @country to which country does this order belong to
 */
const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
};

const paymentSchema =  {
  paymentMethod: { type: String, required: true }
};
/**
 * @orderItemsSchema the model related to the ordered items
 * @name name of the item placed
 * @qty the number of quantities placed
 * @image the image of the item
 * @price the price of the item
 */

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
});

/**
 * @orderSchema schema based on which the orders are stores in db.
 * @user name of the user who places order
 * @orderItems the items whihc are ordered.
 * @shipping which includes the address to which the order to be delivered
 * @payment return boolean whether paid or not
 * @itemsPrice price of an individual item
 * @taxprice tax amount which is calculated based on some criteria 
 * @shippingPrice the extra amount to be added for shipping
 * @totalPrice sum of the prices of all the itesms purchased
 * @isPaid returns status of the payment,boolean
 * @isDelivered returns a boolean, status of the delivery
 * @deliveredAt the time and date of the delivery of the product
 * @timestamp is set to true so as to maintain the order placement time
 */
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  payment: paymentSchema,
  itemsPrice: { type: Number },
  taxPrice: { type: Number },
  shippingPrice: { type: Number },
  totalPrice: { type: Number },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
}, {
  timestamps: true
});

/**
 * @Order is created based on the orderSchema given above
 */
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;