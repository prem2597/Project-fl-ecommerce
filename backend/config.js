export default{
    MONGODB_URL:process.env.MONGODB_URL || 'mongodb+srv://phanindra:phani@999@cluster0-ogfe2.mongodb.net/<dbname>?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'something secret'
}