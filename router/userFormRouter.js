const express = require('express');
const userFormController = require('../controller/formValidationController');

const router = express.Router();

router.post('/formValidation', userFormController.userValidation);

module.exports = {router};