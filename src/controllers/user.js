import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import user from '../models/user.js'

export const createNewUser = async (req, res) => {
    try {
        const name = req.body.name;
        // const address = req.body.address;
        const dateOfBirth = req.body.dateOfBirth;
        const username = req.body.username;
        const password = req.body.password;
        const auth = req.body.auth;
        const phonenumber = req.body.phonenumber

        const checkUser = await user.findOne({
            username: username
        })
        if (checkUser) {
            return res.status(400).json({
                message: 'User already exist'
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)
        const data = await user.create({
            name: name,
            address: address,
            dateOfBirth: dateOfBirth,
            username: username,
            password: hashPassword,
            auth: auth,
            phonenumber: phonenumber
        })
        return res.status(200).json({
            message: 'Create new user success',
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            name: error.name,
        })
    }
}

export const Login = async (req, res) => {

    try {
        const allUser = await user.findOne({ username: req.body.username });
        if (!allUser) {
            return res.status(404).json({
                message: "Tên đăng nhập không đúng",
                data: allUser
            });
        }
        const passwordMatch = await bcrypt.compare(String(req.body.password), String(allUser.password));

        if (passwordMatch) {
            const token = jwt.sign({ userId: allUser._id }, process.env.KEY, { expiresIn: '1y' });

            return res.status(200).json({
                data: token,
                username: req.body.username
            })
        } if (!passwordMatch) {
            return res.status(401).json({
                message: "Mật khẩu không đúng"
            });
        }

    } catch (error) {
        return res.status(400).json({
            message: error.message,
            name: error.name,
        });
    }
};



export const getUserPaging = async (req, res) => {
    try {
        const pageSize = req.query.pageSize || 3
        const pageIndex = req.query.pageIndex || 1;

        const userAll = await user
            .find()
            .skip(pageSize * pageIndex - pageSize).limit(pageSize)
        const count = await user.countDocuments()
        const totalPage = Math.ceil(count / pageSize)

        return res.status(200).json({
            userAll,
            totalPage,
            count
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}


export const updateUser = async (req, res) => {
    try {
        const id = req.params._id;
        const name = req.body.name;
        const dateOfBirth = req.body.dateOfBirth;
        const username = req.body.username;
        const password = req.body.password;
        const auth = req.body.auth;
        const phonenumber = req.body.phonenumber
        let dataUpdate = {
            id,
            name,
            dateOfBirth,
            username,
            password,
            auth,
            phonenumber
        }
        const userUpdate = await user.findOneAndUpdate({ id: id }, dataUpdate, { new: true })
        return res.status(200).json({ message: "Update người dùng thành công", userUpdate })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}
export const findUser = async (req, res) => {
    try {
        const userid = req.params.id
        const userfind = await user.findById(userid)
        return res.status(200).json({
            userfind
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

