const userRoutes = require('./users');

const API_START = '/api'

const constructorMethod = (app) => {
  app.use(`${API_START}/user`, userRoutes); 

};

module.exports = constructorMethod;