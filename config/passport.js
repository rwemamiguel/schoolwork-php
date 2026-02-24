// const LocalStrategy = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const db = require('../config/db');

// function passportConfig(passport) {
//   passport.use(new LocalStrategy((username, password, done) => {
//     db.query('SELECT * FROM users WHERE username=?', [username], async (err, results) => {
//       if (err) return done(err);
//       if (results.length === 0) return done(null, false);

//       const user = results[0];
//       const match = await bcrypt.compare(password, user.password);
//       if (!match) return done(null, false);
//       return done(null, user);
//     });
//   }));

//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     db.query('SELECT * FROM users WHERE id=?', [id], (err, results) => {
//       if (err) return done(err);
//       done(null, results[0]);
//     });
//   });

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/callback'
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         const email = profile.emails[0].value;

//         db.query('SELECT * FROM users WHERE email=?', [email], (err, results) => {
//           if (err) return done(err);
//           if (results.length > 0) return done(null, results[0]);

//           bcrypt.hash(crypto.randomBytes(16).toString('hex'), 10, (hashErr, randomHash) => {
//             if (hashErr) return done(hashErr);

//             const newUser = {
//               username: profile.displayName,
//               email,
//               password: randomHash
//             };

//             db.query('INSERT INTO users SET ?', newUser, (insertErr, result) => {
//               if (insertErr) return done(insertErr);
//               newUser.id = result.insertId;
//               return done(null, newUser);
//             });
//           });
//         });
//       }
//     )
//   );
// }

// module.exports = passportConfig;



const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./db");

passport.use(new LocalStrategy(
  { usernameField: "username" },
  (username, password, done) => {

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
      if (err) return done(err);
      if (results.length === 0) return done(null, false);

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) return done(null, false);

      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
  db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {

    const googleId = profile.id;
    const email = profile.emails[0].value;

    db.query("SELECT * FROM users WHERE google_id = ?", [googleId], (err, results) => {
        if (results.length > 0) {
            return done(null, results[0]);
        } else {
            db.query(
                "INSERT INTO users (username, email, google_id, role) VALUES (?, ?, ?, 'user')",
                [profile.displayName, email, googleId],
                (err, result) => {
                    db.query("SELECT * FROM users WHERE user_id = ?", [result.insertId], (err, newUser) => {
                        return done(null, newUser[0]);
                    });
                }
            );
        }
    });
}));

module.exports = passport;