const userRoutes = require('./users');

const constructorMethod = (app) => {
  app.use('/', userRoutes); 
  app.use('*', (req, res) => {
    res.status(404).redirect('/home');
  });
};

module.exports = constructorMethod;