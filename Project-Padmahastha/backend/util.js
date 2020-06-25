import jwt, { decode } from 'jsonwebtoken';
import config from './config';

/**
 * This const getToken used to create a token 
 * with use of jsonwebtoken
 * @param { user } user 
 */
const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

/**
 * This const isAuth is used to authenticate 
 * a user when a sign-in or any action performedon 
 * on the website for which sign-in is required.
 * 
 * @param { req } req 
 * @param { res } res 
 * @param { next } next 
 */
const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) =>{
            if (err) {
                return res.status(401).send({ msg: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return
        });
    } else {
        return res.status(401).send({msg: "Token is not supplied."})
    }
}

/**
 * This const isAdmin is used to know 
 * if the signed-in user is admin or not.
 * This is required for actions that are only 
 * accessed by an admin.
 * 
 * @param { req } req 
 * @param { res } res 
 * @param { next } next 
 */
const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({msg: "Admin Token is not valid"})
}

export {
    getToken, isAuth, isAdmin
}
