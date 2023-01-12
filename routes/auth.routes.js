const express = require('express');
const router = express.Router();
const {
    body,
    validationResult
} = require('express-validator');
const authController = require('../controllers/auth.controller');

router.route('/logIn').post([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.logIn(req, res);
    } else {
        res.status(400).send(error);
    };
});

router.route('/register').post([
    body('username').notEmpty().escape(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().escape(),
    body('phoneNumber').optional().isNumeric(),
    body('photo').optional(),   //! Verificar a situação da foto
    body('firstName').optional().escape(),  //! Mudar primeiro e último nome para serem obrigatórios
    body('lastName').optional().escape(),
    body('description').optional().escape(),
    body('birthDay').optional().escape(),
    body('college').notEmpty().escape()
], function (req, res) {
    const error = validationResult(req);
    if (error.isEmpty()) {
        authController.register(req, res);
    } else {
        res.status(400).send(error);
    };
});

module.exports = router;