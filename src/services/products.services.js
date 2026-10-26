import productsRepository from '../repositories/product.repository.js';
import { PRODUCT_STATUS } from '../constants/index.js';
import CustomError from './errors/customError.js';
import { EErrors } from './errors/enum.js';
import {
  generateProductNotFoundErrorInfo,
  generateProductCreationErrorInfo,
  generateProductNumericValidationErrorInfo
} from './errors/info.js';

class ProductsService {
  async getAllProducts(filter = {}) {
    return await productsRepository.getAll(filter);
  }

  async getProductById(id) {
    const product = await productsRepository.getById(id);
    if (!product) {
      CustomError.createError({
        name: 'ProductNotFoundError',
        cause: generateProductNotFoundErrorInfo(id),
        message: `No se encontró el producto con ID: ${id}`,
        code: EErrors.NOT_FOUND_ERROR
      });
    }
    return product;
  }

  async createProduct(productData) {
    const { name, description, price, stock, image } = productData;

    if (!name || !description || price === undefined || stock === undefined) {
      CustomError.createError({
        name: 'ProductCreationError',
        cause: generateProductCreationErrorInfo(productData),
        message: 'Faltan campos obligatorios para registrar el producto',
        code: EErrors.INVALID_TYPES_ERROR
      });
    }

    if (Number(price) < 0) {
      CustomError.createError({
        name: 'ProductValidationError',
        cause: generateProductNumericValidationErrorInfo('price', price),
        message: 'El precio del producto no puede ser negativo',
        code: EErrors.BAD_REQUEST_ERROR
      });
    }

    if (Number(stock) < 0) {
      CustomError.createError({
        name: 'ProductValidationError',
        cause: generateProductNumericValidationErrorInfo('stock', stock),
        message: 'El stock del producto no puede ser negativo',
        code: EErrors.BAD_REQUEST_ERROR
      });
    }

    const status = Number(stock) > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK;

    return await productsRepository.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      image,
      status
    });
  }

  async updateProduct(id, updateData) {
    await this.getProductById(id);

    if (updateData.price !== undefined && Number(updateData.price) < 0) {
      CustomError.createError({
        name: 'ProductValidationError',
        cause: generateProductNumericValidationErrorInfo('price', updateData.price),
        message: 'El precio del producto no puede ser negativo',
        code: EErrors.BAD_REQUEST_ERROR
      });
    }

    if (updateData.stock !== undefined && Number(updateData.stock) < 0) {
      CustomError.createError({
        name: 'ProductValidationError',
        cause: generateProductNumericValidationErrorInfo('stock', updateData.stock),
        message: 'El stock del producto no puede ser negativo',
        code: EErrors.BAD_REQUEST_ERROR
      });
    }

    return await productsRepository.update(id, updateData);
  }

  async deleteProduct(id) {
    await this.getProductById(id);
    return await productsRepository.delete(id);
  }
}

export default new ProductsService();
