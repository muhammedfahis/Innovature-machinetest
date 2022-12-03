const bcrypt = require('bcrypt');
const UserList = require('../../model/user');
const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'TEST';


const authenticateUser = async (jwt_payload, done) => {
    try {
        const user = await getUserbyId(jwt_payload._id);
        if (user == null) {
            return done(null, false)
        } else {
            return done(null, user)
        }
    } catch (error) {
        done(error)
    }
}
passport.use(new JwtStrategy(opts, authenticateUser))
const getUserbyEmail = async (email) => {
    try {
        const user = await UserList.findOne({
            email: email
        });
        console.log(user);
        return user
    } catch (error) {
        console.log(erorr)
    }
}
const getUserbyId = async (id) => {
    try {
        const user = await UserList.findById(id);
        console.log(user);
        return user
    } catch (error) {
        console.log(erorr)
    }
}



module.exports = {
    passport
}