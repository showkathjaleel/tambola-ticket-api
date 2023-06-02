import mongoose from "mongoose";
const TicketSchema=new mongoose.Schema({
    userId: {
        type: String
    }, 
    tickets: {
        type: Object
    }
    
})

const Ticket = mongoose.model('Ticket' , TicketSchema)

export default Ticket;