import { ticketModel } from "./models/ticket.model.js";

//muestra todo
const getAll = async (query, options) => {
  const tickets = await ticketModel.paginate(query, options);
  return tickets;
};
//busca por id
const getById = async (id) => {
  const ticket = await ticketModel.findById(id);
  return ticket;
};

//crea
const create = async (data) => {
  const ticket = await ticketModel.create(data);
  return ticket;
};
//actualiza
const update = async (id, data) => {
  const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return ticketUpdate;
};
//borra
const deleteOne = async (id) => {
  const ticket = await ticketModel.findByIdAndUpdate(id, { status: false }, { new: true });
  return ticket;
};
export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
