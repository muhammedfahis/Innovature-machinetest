const UserList = require('../model/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const niv = require('node-input-validator');
const {
    jwtSignInFunction
} = require('../libs/jwt/jwtFunctions');


const login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    const v = new niv.Validator(req.body, {
        email: 'required|email',
        password: 'required|minLength:8'
    });
    v.check().then(async (mathed) => {
        if (!mathed) {
            res.status(400).json({
                "status": "failed",
                "message": (v.errors[Object.keys(v.errors)[0]].message),
                error: v.errors
            })
        } else {
            try {
                let user = await UserList.findOne({
                    email: email
                });
                if (!user) {
                    res.status(200).json({
                        "status": "failed",
                        "message": 'User not found',
                    })
                } else {
                    if (await bcrypt.compare(password, user.password)) {
                        let payload = {
                            email: user.email,
                            password: user.password,
                            _id: user._id
                        }
                        let jwtToken = await jwtSignInFunction(payload);
                        res.status(200).json({
                            status: 'success',
                            message: 'Login was success',
                            user: {
                                ...payload,
                                token: jwtToken
                            }
                        });
                    } else {
                        res.status(200).json({
                            "status": "failed",
                            "message": 'Wrong Password',
                        })
                    }
                }
            } catch (error) {
                res.status(500).json({
                    status: 'failed',
                    message: error.message
                });
            }

        }
    })
}
module.exports = {
    login
}