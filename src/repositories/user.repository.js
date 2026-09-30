import User from '../models/user.model.js';

class UsersRepository {
  // Obtener todos los usuarios (excluyendo password por seguridad)
  async getAll(filter = {}) {
    return await User.find(filter).select('-password');
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
