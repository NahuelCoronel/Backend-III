import Product from '../models/product.model.js';

class ProductsRepository {
  // Obtener todos los productos (opcionalmente con filtros)
  async getAll(filter = {}) {
    return await Product.find(filter);
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
