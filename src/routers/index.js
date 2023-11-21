import express from 'express'
import routerUser from './user.js'
import routerFilms from './films.js'

const router = express.Router()

router.use("/user", routerUser)
router.use("/film", routerFilms)

export default router