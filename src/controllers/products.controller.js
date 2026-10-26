import productsService from '../services/products.services.js';
import { HTTP_STATUS } from '../constants/index.js';

class ProductsController {
  async getAll(req, res, next) {
    try {
      const products = await productsService.getAllProducts(req.query);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: products });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productsService.getProductById(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: product });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newProduct = await productsService.createProduct(req.body);
      return res.status(HTTP_STATUS.CREATED).json({ status: 'success', data: newProduct });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedProduct = await productsService.updateProduct(id, req.body);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: updatedProduct });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await productsService.deleteProduct(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', message: 'Producto eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
