import { request, response } from "express";
import productServices from "../services/product.services.js";

//mustra todo los prod
const getAllProducts = async (req= request, res= response) => {
    try {
        const { limit, page, sort, category, status } = req.query; //sort es el orden
        const options = {
          limit: limit || 10,
          page: page || 1,
          sort: {
            price: sort === "asc" ? 1 : -1, //orden ascendente si no orden ascendente
          },
          learn: true,
        };
        // si tiene categoria y lo solicitan
        if (category) {
          const products = await productServices.getAllProducts ({ category }, options);
          res.status(200).json({ status: "success", products });
        }
        //si solicitan por status(disponibilidad)
        if (status) {
          const products = await productServices.getAllProducts({ status }, options);
          res.status(200).json({ status: "success", products });
        }
    
        const products = await productServices.getAllProducts({}, options); //si no filtra vienen todos los productos
        res.status(200).json({ status: "success", products });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
};

//busca el prod por id
const getProductById =async (req= request, res= response ) => {
    try {
        const { pid } = req.params;
        const product = await productServices.getProductById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
    
        res.status(200).json({ status: "success", product });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
};

//actuasliza el prod
const updateProduct = async (req= request, res= response) => {
    try {
      const { pid } = req.params;
      const productData = req.body;
      const product = await productServices.updateProduct(pid, productData);
      if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
  
      res.status(200).json({ status: "success", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  };

  //crea el prod
  const createProduct =  async (req= request, res= response) => {
    try {
      const productData = req.body;
      const product = await productServices.createProduct(productData);
  
      res.status(201).json({ status: "success", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  };


  //elimina producto 
  const deleteProduct =  async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productServices.deleteProduct(pid);
      if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
  
      res.status(200).json({
        status: "success",
        msg: `El producto con el id ${pid} fue eliminado`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  };

  export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};