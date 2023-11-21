import jwt from 'jsonwebtoken';
import user from '../models/user.js';

export const authentication = async (req, res, next) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập"
        })
    }
    const token = bearerToken.split(" ")[1]
    try {
        const checkToken = jwt.verify(token, process.env.KEY)
        const userId = checkToken.userId
        const userLogged = await user.findById(userId)
        if (!userLogged) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập1"
            })
        }

        req.user = user
        req.userId = userId
        next()
    } catch (error) {
        return res.status(401).json({ message: "Ban chua dang nhap" })
    }
}


export const authorization = async (req, res, next) => {

    try {
        const userId = req.userId
        const findUser = await user.findById({ _id: userId });

        if (findUser.auth === 'customer') {
            return res.status(403).json({
                message: 'Bạn không có quyền thực hiện hành động này'
            })
        }
        if (findUser.auth === 'admin') {
            next()
        }
    } catch (error) {
        return res.status(403).json({
            message: 'Bạn không có quyền thực hiện hành động này'
        })
    }
}
