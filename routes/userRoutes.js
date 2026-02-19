const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { GoogleStrategy } = require('passport-google-oauth20'); 
const router = express.Router();
const passport = require("passport");
const path = require("path");
const JWT_SECRET = process.env.JWT_SECRET 

router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/login.html'));
});

router.get('/dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/dashboard.html'));
});
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/login.html'}),(req,res)=>{
    const token=jwt.sign(
        {id:req.user.id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    );
    res.cookie('token',token,
        {httpOnly:true,
        maxAge:3600000
    });
    console.log("Google User:",req.user);
    console.log("Generated Token:",token);
    res.redirect('/dashboard');
});
router.get('/logout', (req, res, next) => {

    req.logout(function(err) {
        if (err) { return next(err); }

        req.session.destroy((err) => {
            if (err) {
                return res.redirect('/dashboard');
            }

            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    });

});

router.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {

        const payload = {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role
        };

const token = jwt.sign(
    { id: req.user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
);


        res.json({ token });
    }
);

const authenticationToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Received Token:", token);
    if (!token) return res.redirect('/login');

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.redirect('/login');
    }
};


module.exports = router;
