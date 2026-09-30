import usersService from '../services/users.service.js';
import { HTTP_STATUS } from '../utils/constants.js';

class UsersController {
  async getAll(req, res) {
    try {
      const users = await usersService.getAllUsers(req.query);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: users });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await usersService.getUserById(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: user });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newUser = await usersService.createUser(req.body);
      return res.status(HTTP_STATUS.CREATED).json({ status: 'success', data: newUser });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = await usersService.updateUser(id, req.body);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', data: updatedUser });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await usersService.deleteUser(id);
      return res.status(HTTP_STATUS.OK).json({ status: 'success', message: 'Usuario eliminado correctamente' });
    } catch (error) {
      return res
        .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: error.message });
    }
  }
}

export default new UsersController();
