/**
 * @mongoose is imported form mongoose which facilitates to create schema for products
 */
import mongoose from 'mongoose';
/**
 * The below funtion states that the userSchema has the following attributes
 * @name a user must have name whose type is string and they are must(required)
 * @email a user mist have an emailid so taht they can signup for our website
 *  @password A must must have password
 *  @isAdmin to check if the user is the admin or the customer of the website
 */

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }
});

/**
 * @User is created in the mongodb
 */
const userModel = mongoose.model("User", userSchema);
/**
 * The @userModel is exported so that it can be used in other files.
 */
export default userModel;