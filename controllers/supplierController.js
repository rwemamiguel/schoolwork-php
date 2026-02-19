const db = require('../config/db');
const path = require('path');

exports.list = (req,res)=>{
    db.query("SELECT * FROM suppliers",(err,rows)=>{
        res.sendFile(path.join(__dirname,'../views/suppliers.html'));
    });
};

exports.add = (req,res)=>{
    const {sup_name,sup_email} = req.body;
    db.query("INSERT INTO suppliers(sup_name,sup_email) VALUES(?,?)",
    [sup_name,sup_email],()=> res.redirect('/suppliers'));
};
