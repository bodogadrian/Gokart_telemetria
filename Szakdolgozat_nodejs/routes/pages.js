const express = require("express");

const router = express.Router();

router.get("/",(req,res) =>{
    res.render('register_with_password')
})

router.get("/login_with_password",(req,res) =>{
    res.render('login_with_password')
})

router.get("/leaderboard",(req,res) =>{
    res.render('leaderboard')
})

router.get("/leaderboard_admin",(req,res) =>{
    res.render('leaderboard_admin')
})

router.get("/admin",(req,res) =>{
    res.render('admin')
})

router.get("/gokart",(req,res) =>{
    res.render('gokart');
})

router.get("/login_admin",(req,res) =>{
    res.render('login_admin');
})

router.get("/register_admin",(req,res) =>{
    res.render('register_admin');
})
module.exports = router;