export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://dharshak:1997@users-4zdio.mongodb.net/<dbname>?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'smsecret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb'
}
