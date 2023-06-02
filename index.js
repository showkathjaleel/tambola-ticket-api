import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import ticketRoute from "./routes/ticket.js"
import ExpressMongoSanitize from "express-mongo-sanitize";


const app=express()
app.use(bodyParser.json())
app.use(cors())
app.use(ExpressMongoSanitize())

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://localhost:27017/tambolaTicket',{
        useNewUrlParser:true,
        useUnifiedTopology:true
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Error connecting to MongoDB', error);
    }
  }
  connectToDatabase()




app.use('/ticket',ticketRoute)
app.use('/auth',authRoute)

app.listen(5000,()=>{
    console.log('server connected successfully')
})