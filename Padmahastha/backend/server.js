/**
 * This is the file which runs the backend.
 * connections of the frontend to the mongodb takes place in this file also the connection with express also takes place
 * The imports are made accordingly from their respective files or by any packages as per the requirements.
 */

import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import bodyParser from 'body-parser';

dotenv.config();
/**
 * Creation of the mongodb server is shown below
 */
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

/**
 * The express js is now connection to our app
 * @api/users is used in userRoute
 * And the @"/api/products" is used in productRoute used to displsy the product related information
 * @/api/config/paypal the route for connecting to the paypal gateway method.
 */

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders",orderRoute);
app.get("/api/config/paypal", (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
  })

//Below statement means that the app runs only at the port number 5000.
app.listen(5000, () => {console.log("Server started at http://localhost:5000") });