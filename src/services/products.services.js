import productsRepository from '../repositories/products.repository.js';

class ProductsService {
  async getAllProducts(filter = {}) {
    return await productsRepository.getAll(filter);
  }

  async getProductById(id) {
    const product = await productsRepository.getById(id);
    if (!product) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  async createProduct(productData) {
    const { name, description, price, stock, image } = productData;

    if (!name || !description || price === undefined || stock === undefined) {
      const error = new Error('Todos los campos obligatorios deben estar presentes');
      error.statusCode = 400;
      throw error;
    }

    if (price < 0 || stock < 0) {
      const error = new Error('El precio y el stock no pueden ser negativos');
      error.statusCode = 400;
      throw error;
    }

    return await productsRepository.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      image
    });
  }

  async updateProduct(id, updateData) {
    // Validamos primero que el producto exista
    await this.getProductById(id);

    if (updateData.price !== undefined && updateData.price < 0) {
      const error = new Error('El precio no puede ser negativo');
      error.statusCode = 400;
      throw error;
    }

    if (updateData.stock !== undefined && updateData.stock < 0) {
      const error = new Error('El stock no puede ser negativo');
      error.statusCode = 400;
      throw error;
    }

    return await productsRepository.update(id, updateData);
  }

  async deleteProduct(id) {
    await this.getProductById(id);
    return await productsRepository.delete(id);
  }
}

export default new ProductsService();
