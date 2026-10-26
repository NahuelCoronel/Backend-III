import usersRepository from '../repositories/user.repository.js';
import { ROLES } from '../constants/index.js';
import CustomError from './errors/customError.js';
import { EErrors } from './errors/enum.js';
import {
  generateUserNotFoundErrorInfo,
  generateUserCreationErrorInfo,
  generateUserEmailConflictErrorInfo,
  generateUserForbiddenRoleErrorInfo
} from './errors/info.js';

class UsersService {
  async getAllUsers(filter = {}) {
    return await usersRepository.getAll(filter);
  }

  async getUserById(id) {
    const user = await usersRepository.getById(id);
    if (!user) {
      CustomError.createError({
        name: 'UserNotFoundError',
        cause: generateUserNotFoundErrorInfo(id),
        message: `No se encontró el usuario con ID: ${id}`,
        code: EErrors.NOT_FOUND_ERROR
      });
    }
    return user;
  }

  async createUser(userData) {
    const { firstName, lastName, email, password, role } = userData;

    if (!firstName || !lastName || !email || !password) {
      CustomError.createError({
        name: 'UserCreationError',
        cause: generateUserCreationErrorInfo(userData),
        message: 'Faltan campos obligatorios para registrar al usuario',
        code: EErrors.INVALID_TYPES_ERROR
      });
    }

    const existingUser = await usersRepository.getByEmail(email);
    if (existingUser) {
      CustomError.createError({
        name: 'UserEmailConflictError',
        cause: generateUserEmailConflictErrorInfo(email),
        message: 'El email ya se encuentra registrado',
        code: EErrors.BAD_REQUEST_ERROR
      });
    }

    const assignedRole = role || ROLES.USER;

    return await usersRepository.create({
      firstName,
      lastName,
      email,
      password,
      role: assignedRole
    });
  }

  async updateUser(id, updateData) {
    await this.getUserById(id);

    if (updateData.role && updateData.role === ROLES.ADMIN) {
      CustomError.createError({
        name: 'UserForbiddenError',
        cause: generateUserForbiddenRoleErrorInfo(),
        message: 'No está permitido promover a admin desde esta operación',
        code: EErrors.UNAUTHORIZED_ERROR || EErrors.BAD_REQUEST_ERROR
      });
    }

    return await usersRepository.update(id, updateData);
  }

  async deleteUser(id) {
    await this.getUserById(id);
    return await usersRepository.delete(id);
  }
}

export default new UsersService();
