import ticketRepository from "../persistence/mongoDB/ticket.repository.js";



const createTicket = async (userEmail, totalCart) => {
    const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
      };
    const newTicket = {
        amount: totalCart,
        purchaser: userEmail,
        code: generateRandomCode(),
    };
    //console.log("AQUIIIIIIIIIIIIII", newTicket) prueba de error ticket
    const ticket = await ticketRepository.create(newTicket);
    
    return ticket;
};

export default { createTicket };