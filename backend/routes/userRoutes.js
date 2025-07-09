const express = require('express');
const router = express.Router();
const schemaValidator = require("../middlewares/schemaValidator");
const { signUpSchema, loginSchema } = require("./schema/body");
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', schemaValidator({ body: signUpSchema }), registerUser);
router.post('/login', schemaValidator({ body: loginSchema }), loginUser);

module.exports = router;
