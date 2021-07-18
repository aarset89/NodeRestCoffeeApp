const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
  res.json({
    type: `This is a HTTP ${req.method} request - controller`,
  });
};
const postUser = (req = request, res = response) => {
  const body = req.body;
  //   console.log(body.name);
  res.json({
    type: `This is a HTTP ${req.method} request - controller`,
    body,
    asd: req.query,
    id: req.params.id,
  });
  res.end();
};
const putUser = (req = request, res = response) => {
  res.json({
    type: `This is a HTTP ${req.method} request - controller`,
  });
};
const deleteUser = (req = request, res = response) => {
  res.json({
    type: `This is a HTTP ${req.method} request - controller`,
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
