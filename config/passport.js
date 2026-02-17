const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const db = require('../config/conn');
const passport = require('passport');

function passportConfig(passport){
    passport.use(
        new localStrategy(function(username,password,done){
            const sql = 'SELECT * FROM developers WHERE username = ?';
            db.query(sql,[username],(err,result)=>{
                if(err)
                    return done("failed to find user"+err);
                if(result.length===0)
                    return done(null,false,{message:'No user found'});

                    const user = result[0];
                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err) return done(err);
                        if(!isMatch){
                            return done(null,false,{message:'incorrect Password'});
                        }
                        return done(null,user);
                    });
            });
        })
    );

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
        const sql = 'SELECT * FROM developers WHERE id = ?';
        db.query(sql,[id],(err,result)=>{
            if(err) return done(err);
            return done(null,result[0]);
        });
    });

    passport.use(
        new GoogleStrategy({
            clientID:'process.env.GOOGLE_CLIENT_ID',
            clientSecret:'process.env.GOOGLE_CLIENT_SECRET      ',
            callbackURL:'/auth/google/callback'
        },
        (accessToken,refreshToken,profile,done)=>{

            const user = {
                id: profile.id,
                name: profile.displayName,
            };
            return done(null, user);
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        const user = { id: id };
        done(null, user);
    });
}

module.exports = passportConfig;