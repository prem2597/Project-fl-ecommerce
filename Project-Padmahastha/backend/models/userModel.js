import mongoose from 'mongoose';

// userSchema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups: true, index: true },
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
});

// creating userModel according to the userSchema
const userModel = mongoose.model('User', userSchema);

export default userModel;
