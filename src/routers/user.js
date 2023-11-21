import express from 'express'
import { authentication, authorization } from '../middlewares/index.js'
import { Login, findUser, createNewUser, getUserPaging, updateUser } from '../controllers/user.js'
const routerUser = express.Router()


routerUser.post('/register', authentication, authorization, createNewUser)
routerUser.post('/login', Login)
routerUser.get('/check', authentication, authorization, getUserPaging)
routerUser.get('/getPagingUser', authentication, authorization, getUserPaging)
routerUser.put('/:id', authentication, authorization, updateUser)
routerUser.get('/:id', authentication, authorization, findUser)




export default routerUser