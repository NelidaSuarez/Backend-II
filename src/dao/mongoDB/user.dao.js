import { userModel } from "./models/user.model.js";

//muestra todo
const getAll = async (query, option) => {
  const users = await userModel.paginate(query, option);
  return users;
};
//busca por id
const getById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};
//busca por email
const getByEmail = async (email) => {
  const user = await userModel.findOne({email : email});
  return user;
};

//crea
const create = async (data) => {
  const user = await userModel.create(data);
  return user;
};
//actualiza
const update = async (id, data) => {
  const userUpdate = await userModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return userUpdate;
};
//borra
const deleteOne = async (id) => {
  const user = await userModel.findByIdAndUpdate(id, { status: false }, { new: true });
  return user;
};
export default {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  deleteOne,
};
