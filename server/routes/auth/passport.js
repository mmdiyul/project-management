const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;

const { projectName } = require('../helpers/index')
const { JWT_SECRET } = require('../../configs/env.conf')
const debug = require('debug')(`${projectName}:passport`)

const UserCtrl = require('../api/user/user.controller')
const User = require('../api/user/user.model')

passport.serializeUser((user, done)=>{
    // done(null, user.id);
    done(null, user);   
});
passport.deserializeUser((obj, done)=>{
    // Users.findById(obj, done);
    done(null, obj);
});
passport.use(new LocalStrategy((username, password, done)=>{
    UserCtrl.loginLocalStrategy(username, password).then((user=>{
        return done(null, user, { message : 'Logged In Successfully'})
    })).catch(err=>{
        return done(err, null)
    })
}));

passport.use(new BasicStrategy((username, password, done)=>{
    UserCtrl.loginLocalStrategy(username, password).then((user=>{
        return done(null, user, { message : 'Logged In Successfully'})
    })).catch(err=>{
        return done(err, null)
    })
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : JWT_SECRET
}, async ({username}, done)=>{
    
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    try {
        const user = await User.findOne({ username }).populate('roles','nama deskripsi prioritas');
        return done(null, user);
    }
    catch (err) {
        return done(err, null);
    }
}
));
module.exports = passport