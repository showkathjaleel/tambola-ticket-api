import express from "express"
const router=express.Router()
import { createTicket ,getTicketsById } from "../controller/ticketController.js"
import verifyJWT from "../middlewares/verifyToken.js"


router.get('/get-tickets/:userId', verifyJWT, getTicketsById)

router.post('/create-ticket', verifyJWT , createTicket )

export default router;