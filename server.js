const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

//! Database Tables
const userModel = require('./models/users.model');

//! Routers
const authRouter = require('./routes/auth.routes');

app.get('/', function (req, res) {
    res.status(200).json({
        message: "home"
    });
});

app.use('/auth', authRouter);

app.listen(port, () => {
    console.log('Server Running at http://localhost:' + port);
});