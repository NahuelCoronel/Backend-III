import productsService from '../services/products.service.js';
import { HTTP_STATUS } from '../utils/constants.js';

class ProductsController {
  async getAll(req, res) {
    try {
      const products = await productsService.getAllProducts(req.query);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: products });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await productsService.getProductById(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: product });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newProduct = await productsService.createProduct(req.body);
      return res.status(HTTP_STATUS.CREATED).json({ status: 'success', data: newProduct });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedProduct = await productsService.updateProduct(id, req.body);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: updatedProduct });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await productsService.deleteProduct(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', message: 'Producto eliminado correctamente' });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }
}

export default new ProductsController();
