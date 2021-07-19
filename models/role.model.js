const { model, Schema } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'The role name is required'],
  },
});

module.exports = model('Role', RoleSchema);
