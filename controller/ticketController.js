import Ticket from "../models/Ticket.js"
import generateTambolaTickets from "../utils/generateTambolaTickets.js";



export const createTicket = async (req,res)=>{
  const {noOfTickets,userId} = req.body;
  console.log(userId)
 
  try {
    const tickets = {}
    for (let index = 0; index < noOfTickets ; index++) {
        const uniqueId =  `ticket${index+1}`
        tickets[uniqueId] = generateTambolaTickets()  
    }  
    const newTicket = new Ticket({
        userId : userId,
        tickets: tickets
    })
    const savedTickets = await newTicket.save()
    res.status(200).json(savedTickets)
} catch (error) {
    res.status(500).json(error)
}
  
}

export const getTicketsById=async(req,res)=>{
  try {
    const {userId} = req.params 
    let {page}=req.query
    console.log(req.params.userId ,'id', req.query.page ,'query')
    if(page == 0) throw {mssg: "Enter valid page number"}
     page = parseInt(page) || 1
    const limit = 3
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const ticketsById = await Ticket.find({userId: userId})
    const ticketIds = Object.keys(ticketsById[0].tickets)
    console.log(ticketIds,'ticketIds')
    const paginatedTicketIds = ticketIds.slice(startIndex, endIndex)
    console.log(startIndex,'startIndex',endIndex,'endindex')
    console.log(paginatedTicketIds,'paginatedTicketIds')
    if(paginatedTicketIds.length == 0) throw {mssg: "Enter valid page number"}

    else{
        const ticketList = paginatedTicketIds.map((ticketId) =>ticketsById[0].tickets[ticketId])
        res.status(200).json(ticketList)
        
    }
   
} catch (error) {
    let status = 500
    if(error.mssg) status = 400
    res.status(status).json(error)
}

}