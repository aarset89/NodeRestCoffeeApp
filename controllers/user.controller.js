const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

//GET List of users
const getUsers = async (req = request, res = response) => {
  let { limit, from } = req.query;
  const userStatus = { status: true };
  if (isNaN(Number(limit))) {
    limit = 5;
  }
  if (isNaN(Number(from))) {
    from = 0;
  }

  //In the comment block, as there are two await functions
  // const users = await User.find(userStatus)
  //   .skip(Number(from))
  //   .limit(Number(limit));

  // const total = await User.countDocuments(userStatus);

  const [total, users] = await Promise.all([
    User.countDocuments(userStatus),
    User.find(userStatus).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ total, users });
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
  console.log('POASDJAKJDHQ aca');
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
