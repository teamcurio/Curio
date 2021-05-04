const db = require('../models/chationaryModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {};


authController.verifyUser = (req, res, next) => {}

authController.generateJWT = (req, res, next) => {}

authController.verifyJWT = (req, res, next) => {}

module.exports = authController;
