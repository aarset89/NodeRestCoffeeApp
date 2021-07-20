const { Router } = require('express');
const { check } = require('express-validator');

const { validation } = require('../middlewares/fieldsValidation');
const { bdRoleValidator, emailExist } = require('../helpers/dbValidator');
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);
router.post(
  '/',
  [
    check('name', 'Name is a required field').not().isEmpty(),
    check('email', 'Please insert a valid email').isEmail(),
    check('email').custom(emailExist),
    check('password', 'Password must be at least 6 length char').isLength({
      min: 6,
    }),
    // There are two ways to execute the validator inside custom method: *CAREFULL WITH THIS
    //First: Passing only the object, is valid because JS understands that the first argument is the same in both sides, in this case 'role'
    // check('role').custom( bdRoleValidator),
    //Second by using arrow function
    check('role').custom((role = '') => bdRoleValidator(role)),
    // check('role', 'Selected role is not valid').isIn([
    //   'USER_ROLE_1',
    //   'USER_ROLE_2',
    // ]),

    validation,
  ],
  postUser
);
router.put('/:id', putUser);
router.delete('/', deleteUser);

module.exports = router;
