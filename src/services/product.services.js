import { respProductDto } from "../dto/product.dto.js";
import productRepository from "../persistence/mongoDB/product.repository.js";



//mustra todo los prod
const getAllProducts = async (query, options) => {
    return await productRepository.getAll(query, options);
};

//busca el prod por id
const getProductById = async (pid) => {
  const product = await productRepository.getById(pid);
 const productResponse = respProductDto(product); 
  return productResponse;
 // return product;
};

//actuasliza el prod
const updateProduct = async (pid, productData) => {
    return await productRepository.update(pid, productData);
};

  //crea el prod
  const createProduct = async (productData) => {
    return await productRepository.create(productData);
  };
  

  //elimina producto 
  const deleteProduct = async (pid) => {
    return await productRepository.deleteOne(pid);
  };
  



  export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};