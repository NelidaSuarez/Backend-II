import { productModel } from "./models/product.model.js";

//muestra todo
const getAll = async (query, options) => {
  const products = await productModel.paginate(query, options);
  return products;
};
//busca por id
const getById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

//crea
const create = async (data) => {
  const product = await productModel.create(data);
  return product;
};
//actualiza
const update = async (id, data) => {
  const productUpdate = await productModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return productUpdate;
};
//borra
const deleteOne = async (id) => {
  const product = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
  return product;
};
export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
