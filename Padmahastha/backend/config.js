/**
 * @MONGODB_URL the url to which our server is connected
 * @PAYPAL_CLIENT_ID the client id which we get after creating an account with the api which
 * will be used for payment process
 */

export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://gurralaharika:chicky@13@cluster3-uxic0.mongodb.net/test?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb'
}
