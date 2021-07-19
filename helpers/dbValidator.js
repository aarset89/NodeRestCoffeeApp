const Role = require('../models/role.model');

const bdRoleValidator = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`The ${role} doesn't exist.`);
  }
};

module.exports = {
  bdRoleValidator,
};
