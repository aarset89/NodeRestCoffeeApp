const Role = require('../models/role.model');
const User = require('../models/user.model');

const bdRoleValidator = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`The ${role} doesn't exist.`);
  }
};

//check if email already exist
const emailExist = async (email = '') => {
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error(`Email already exist`);
  }
};

//check if userById exist
const userExistById = async (id = '') => {
  const exist = await User.findById(id);
  if (!exist) {
    throw new Error(`User doesn't exist`);
  }
};

module.exports = {
  bdRoleValidator,
  emailExist,
  userExistById,
};
