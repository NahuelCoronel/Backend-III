import usersService from "../services/users.services.js";
import { HTTP_STATUS, DOCUMENT_TYPES } from '../constants/index.js';

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

  async uploadDocuments(req, res, next) {
    try {
      const { uid } = req.params;
      const { documentType } = req.body;
      const files = req.files || (req.file ? [req.file] : []);

      // 1. Validar que vengan archivos
      if (!files || files.length === 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST || 400).json({
          status: 'error',
          error: 'ValidationError',
          message: 'No se subió ningún archivo'
        });
      }

      // 2. Validar documentType si fue provisto
      const validTypes = Object.values(DOCUMENT_TYPES);
      if (documentType && !validTypes.includes(documentType)) {
        return res.status(HTTP_STATUS.BAD_REQUEST || 400).json({
          status: 'error',
          error: 'ValidationError',
          message: `El tipo de documento '${documentType}' no es válido. Tipos aceptados: ${validTypes.join(', ')}`
        });
      }

      const typeToAssign = documentType || DOCUMENT_TYPES.IDENTIFICATION;

      const documentsMetadata = files.map(file => ({
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
        documentType: typeToAssign,
        uploadedAt: new Date()
      }));

      const updatedUser = await usersService.addDocuments(uid, documentsMetadata);

      req.logger?.info(`[UPLOAD] Documentos subidos con éxito para el usuario ${uid} - Cantidad: ${documentsMetadata.length}`);

      return res.status(HTTP_STATUS.OK).json({
        status: 'success',
        message: 'Documentos subidos y registrados con éxito',
        payload: updatedUser.documents
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();


