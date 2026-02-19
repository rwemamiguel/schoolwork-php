
const LocalStrategy = require('passport-local').Strategy;

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const db = require('../config/db');
const passport = require('passport');
function passportConfig(passport) {
passport.use(new LocalStrategy((username,password,done)=>{
  db.query("SELECT * FROM users WHERE username=?",[username],async(err,results)=>{
    if(err) return done(err);
    if(results.length===0) return done(null,false);
    const user=results[0];
    const match=await bcrypt.compare(password,user.password);
    if(!match) return done(null,false);
    return done(null,user);
  });
}));

passport.serializeUser((user,done)=>done(null,user.id));
passport.deserializeUser((id,done)=>{
  db.query("SELECT * FROM users WHERE id=?",[id],(err,results)=>{
    if(err) return done(err);
    done(null,results[0]);
  });
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {

    const email = profile.emails[0].value;

    db.query("SELECT * FROM users WHERE email=?", [email], (err, results) => {

        if (err) return done(err);

        // If user exists → login
        if (results.length > 0) {
            return done(null, results[0]);
        }

        // If user does NOT exist → auto create
        const newUser = {
            username: profile.displayName,
            email: email,
            role: 'staff'
        };

        db.query("INSERT INTO users SET ?", newUser, (err, result) => {
            if (err) return done(err);

            newUser.id = result.Id;
            return done(null, newUser);
        });

    });
}));
}
module.exports = passportConfig;
