import usersRepository from '../repositories/user.repository.js';
import { ROLES } from '../constants/index.js';

class UsersService {
  async getAllUsers(filter = {}) {
    return await usersRepository.getAll(filter);
  }

  async getUserById(id) {
    const user = await usersRepository.getById(id);
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  async createUser(userData) {
    const { firstName, lastName, email, password, role } = userData;

    if (!firstName || !lastName || !email || !password) {
      const error = new Error('Nombre, apellido, email y contraseña son obligatorios');
      error.statusCode = 400;
      throw error;
    }

    // Regla de negocio: no permitir duplicados de email
    const existingUser = await usersRepository.getByEmail(email);
    if (existingUser) {
      const error = new Error('El email ya se encuentra registrado');
      error.statusCode = 400;
      throw error;
    }

    // Regla de negocio: no crear admins por endpoint público
    if (role === ROLES.ADMIN) {
      const error = new Error('No se puede registrar un usuario con rol administrador directamente');
      error.statusCode = 403;
      throw error;
    }

    const assignedRole = role || ROLES.CUSTOMER;

    return await usersRepository.create({
      firstName,
      lastName,
      email,
      password, // En entregas posteriores aplicaremos bcrypt aquí
      role: assignedRole
    });
  }

  async updateUser(id, updateData) {
    await this.getUserById(id);

    // Evitar que se modifique el rol a admin por este medio si viene en el payload
    if (updateData.role && updateData.role === ROLES.ADMIN) {
      const error = new Error('No está permitido promover a admin desde esta operación');
      error.statusCode = 403;
      throw error;
    }

    return await usersRepository.update(id, updateData);
  }

  async deleteUser(id) {
    await this.getUserById(id);
    return await usersRepository.delete(id);
  }
}

export default new UsersService();
