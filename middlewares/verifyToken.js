import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const verifyJWT = (req, res, next) =>{
    
    const authHeader = req.headers.authorization || req.headers.Authorization
    console.log(authHeader)
    if(!authHeader?.startsWith('Bearer')) {
        return res.sendStatus(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err,decoded) => {
            if(err) return res.sendStatus(403).json({message:"forbidden"})
            next()
        }
    )
}
export default verifyJWT;
 