const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const { Op } = require('sequelize');

const Model = require('../models/users.model');
const User = Model.User;

const logIn = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            return res.status(404).json({
                message: "Utilizador não encontrado!"
            });
        };
        const passwordValid = await bcrypt.compareSync(req.body.password, user.password.toString());

        if (!passwordValid) {
            return res.status(401).json({
                accessToken: null,
                message: "Password Incorreta!"
            });
        };

        const token = jwt.sign({
                id: user.id
            },
            config.secret, {
                expiresIn: 86400
            });

        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            college: user.college,
            accessToken: token
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    };
};

const register = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                [Op.or]: [{email: req.body.email}, {username: req.body.username}]
            }
        });
        if (user) {
            return res.status(400).json({
                message: "O Email ou o Username que introduziu já se encontra em uso"
            });
        };
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            phoneNumber: req.body.phoneNumber,
            photo: req.body.photo,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            description: req.body.description,
            birthDay: req.body.birthDay,
            college: req.body.college
        })
        return res.status(200).json({
            message: "Utilizador registado com sucesso!"
        })
    } catch (error) {
        res.status(500).json({
            messsage: error
        });
    };
};

const verifyToken = (req, res) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({
            message: "No Token provided!"
        });
    };

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Não autorizado!"
            })
        }
        req.loggedUserId = decoded.id;
        return req.loggedUserId;
    })
}

exports.logIn = logIn;
exports.register = register;
exports.verifyToken = verifyToken;