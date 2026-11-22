import User from '../models/user.model.js ';

class UsersRepository {
  // Obtener usuarios con filtros, paginación y límite por defecto
  async getAll(filter = {}, { limit = 20, page = 1 } = {}) {
    const parsedLimit = Math.max(1, Number(limit) || 20);
    const parsedPage = Math.max(1, Number(page) || 1);
    const skip = (parsedPage - 1) * parsedLimit;

    return await User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(parsedLimit);
  }


  // Buscar usuario por ID (excluyendo password)
  async getById(id) {
    return await User.findById(id).select('-password');
  }

  // Buscar por email (útil para login o verificar si ya existe)
  async getByEmail(email) {
    return await User.findOne({ email });
  }

  // Crear un nuevo usuario
  async create(userData) {
    return await User.create(userData);
  }

  // Actualizar usuario por ID
  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    }).select('-password');
  }

  // Eliminar usuario por ID
  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UsersRepository();
