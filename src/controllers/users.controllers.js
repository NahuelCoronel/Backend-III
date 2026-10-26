import usersService from "../services/users.services.js";
import { HTTP_STATUS } from '../constants/index.js';

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await usersService.getAllUsers(req.query);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: users });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await usersService.getUserById(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newUser = await usersService.createUser(req.body);
      return res.status(HTTP_STATUS.CREATED).json({ status: 'success', data: newUser });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedUser = await usersService.updateUser(id, req.body);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await usersService.deleteUser(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', message: 'Usuario eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();

