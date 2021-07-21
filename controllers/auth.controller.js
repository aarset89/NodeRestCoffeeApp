const { request, response } = require('express');

const login = (req = request, res = response) => {
  res.json(req.body);
};

module.exports = {
  login,
};
