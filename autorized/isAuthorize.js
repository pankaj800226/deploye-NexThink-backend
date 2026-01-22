
import jwt from 'jsonwebtoken'

export const isAuthentication = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Acces denied" })
    }

    try {
        const isVerify = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = isVerify.userId
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error" })


    }
}
