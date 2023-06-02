import express from 'express'
import { userRegister, userLogin } from '../controller/authController.js'
const router=express.Router()


router.post('/login', userLogin)

router.post('/register',userRegister)

export default router;