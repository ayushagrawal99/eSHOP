import jwt from 'jsonwebtoken'

const generatetoken = (id) => {
    return jwt.sign({id}, 'abc123', {
        expiresIn : '30d'
    })
}

export default generatetoken;