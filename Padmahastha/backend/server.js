import express from 'express';
// import data from './data';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';


dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex:true

}).catch(error => console.log(error.reason));


const app = express();

app.use("/api/users", userRoute);

app.get("/api/products/:id", (req,res) => {
    console.log("got");
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product)
         res.send(product);
    else
    res.status(404).send({msg: "Product not Found."})     
}
);
app.get("/api/products", (req,res) => {
    // const productId = req.params.id;
    console.log("got");
    res.send(data.products);
}
);

app.listen(5000, () => { console.log("server started at http://localhost:5000")});
