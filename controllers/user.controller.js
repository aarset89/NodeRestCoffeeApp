const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const getUsers = (req = request, res = response) => {
  res.json({
    type: `This is a HTTP ${req.method} request - controller`,
  });
};

//CREATE user
const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({
    name,
    email,
    password,
    role,
  });

  //encrypt pass

  const salt = bcrypt.genSaltSync(11); // 10 by default
  user.password = bcrypt.hashSync(password, salt);

  //save DB

  await user.save();

  res.json({
    type: `This is a HTTP ${req.method} request - controller`,
    user,
  });
  // res.end();
};

//UPDATE USER
const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, correo, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(11); // 10 by default
    rest.password = bcrypt.hashSync(password, salt);
  }
  const userInDb = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    type: `This is a HTTP ${req.method} request - controller`,
    userInDb,
  });
};

//DELETE USER
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
