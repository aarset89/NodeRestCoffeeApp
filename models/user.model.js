const { Schema, model } = require('mongoose');
let mongooseHidden = require('mongoose-hidden')({
  defaultHidden: { password: true },
});

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'ESte pedazo se requiere pex'],
  },
  email: {
    type: String,
    required: [true, 'ESte pedazo se requiere pex'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'ESte pedazo se requiere pex'],
    hide: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    // enum: ['USER_ROLE_1', 'USER_ROLE_2'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.plugin(mongooseHidden);

module.exports = model('userModel', userSchema);
