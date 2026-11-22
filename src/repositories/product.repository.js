import Product from '../models/product.model.js';

class ProductsRepository {
  
  // Obtener productos con filtros, paginación y límite por defecto
  async getAll(filter = {}, { limit = 20, page = 1 } = {}) {
    const parsedLimit = Math.max(1, Number(limit) || 20);
    const parsedPage = Math.max(1, Number(page) || 1);
    const skip = (parsedPage - 1) * parsedLimit;

    return await Product.find(filter)
      .skip(skip)
      .limit(parsedLimit);
  }


  // Buscar un producto por su ID
  async getById(id) {
    return await Product.findById(id);
  }

  // Crear un nuevo producto
  async create(productData) {
    return await Product.create(productData);
  }

  // Actualizar un producto por ID devolviendo el documento actualizado
  async update(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  // Eliminar un producto por ID
  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductsRepository();
