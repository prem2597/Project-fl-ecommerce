import jwt, { decode } from 'jsonwebtoken';
import config from './config';
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
 * @isAuth is a constant which stores
 * whether the user is authenticated or not
 */
const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return
        });
    }
    else {
        return res.status(401).send({ msg: 'Token is not supplied' })
    }
}

/**
 * @isAdmin denotes whether the user is admin or not
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: 'Admin token is not valid' })
}

export { getToken, isAuth, isAdmin }