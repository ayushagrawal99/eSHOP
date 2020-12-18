import jwt from 'jsonwebtoken'
import User from '../Modal/user.js'

const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'abc123')

            req.user = await User.findById(decoded.id).select('-password')

        } catch (error) {
            res.status(401).json("Error in Token")
        }
    }
    next()
}

const admin = (req, res, next) => {
    
    if(req.user && req.user.isAdmin){
        next()
    } else {
        res.status(401).json("Not Authorized as an admin")
    }
}

export {protect,admin} 