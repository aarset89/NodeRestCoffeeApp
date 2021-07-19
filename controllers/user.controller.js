const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const getUsers = (req = request, res = response) => {
  res.json({
    type: `This is a HTTP ${req.method} request - controller`,
  });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({
    name,
    email,
    password,
    role,
  });
  //check if email already exist
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({
      msh: 'Email already exist',
    });
  }
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
