import mockService from '../services/mock.services.js';

class MockController {
  getUsers = async (req, res, next) => {
    try {
      const qty = parseInt(req.query.qty, 10) || 10;
      const users = mockService.getMockUsers(qty);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  getProducts = async (req, res, next) => {
    try {
      const qty = parseInt(req.query.qty, 10) || 10;
      const products = mockService.getMockProducts(qty);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  seed = async (req, res, next) => {
    try {
      const qty = parseInt(req.query.qty, 10) || 10;
      const result = await mockService.seedDatabase(qty);
      res.status(201).json({
        message: 'Base de datos poblada exitosamente con datos de prueba',
        ...result
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new MockController();
