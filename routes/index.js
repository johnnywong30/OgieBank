const userRoutes = require('./users');
const calculationRoutes = require('./calculations');

const API_START = '/api'

const constructorMethod = (app) => {
  app.use(`${API_START}/user`, userRoutes); 
  app.use(`${API_START}/calculations`, calculationRoutes); 
};

module.exports = constructorMethod;