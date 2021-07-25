const express = require('express');
const router = new express.Router();
const UserData = require("./models/conn");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require('./middleware/auth');

// middleware
router.use(express.json());
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.status(201).render("index");
})

router.get('/about', auth , (req, res) => {
    res.status(201).render("about");
})

router.get('/services', auth , (req, res) => {
    // console.log(`this awesome token is : ${req.cookies.jwt}`);
    res.status(201).render("services");
})

router.get('/login', (req, res) => {
    res.status(201).render("login");
})


router.get('/registration', (req, res) => {
    res.status(201).render("registration");
})

router.get("/logout", auth , async (req, res) => {
    try
    {
        req.userMatch.tokens = req.userMatch.tokens.filter((val) => {
            return val.token !== req.token;
        })

        // // all devices has clean tokens
        // req.userMatch.tokens = [];

        res.clearCookie("jwt");
        await req.userMatch.save();
        res.status(201).render("logout");

    } catch (error) {
        res.status(501).render('Error', { para: error });
    }
})


// registation form post
router.post("/registration", async (req,res) => {
    try
    {
        const password = req.body.password;
        const Cpassword = req.body.Cpassword;

        if (password === Cpassword)
        {
            const usedpostdata = new UserData({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                number: req.body.number,
                address: req.body.address,
                password: password,
                Cpassword: Cpassword
                
            });

            const token = await usedpostdata.ganerateAuthtoken();
            console.log(token);

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true
            });

            await usedpostdata.save();
            res.status(201).render("index");

        } else
        {
            res.status(404).render('Error', { para: "Invalid Password" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).render('Error', { para: error });
    }
})

// login page post and setup

router.post("/login", async (req, res) => {
   try {
       const email = req.body.email;
       const password = req.body.password;
       const userEmail = await UserData.findOne({ email: email });
    //    console.log(`this user password is ${userEmail.password}`);
       const isMatch = await bcrypt.compare(password, userEmail.password);
       const token = await userEmail.ganerateAuthtoken();
    //    console.log(token);
       res.cookie("jwt", token, {
           expires: new Date(Date.now() + 2000000),
           httpOnly: true,
        //    secure : true  //https er moddhe used korte hobe!
       });

       isMatch ? res.status(201).render("index") : res.status(501).render('Error', { para: "Invalid Password" });
   } catch (error) {
       console.log(error);
       res.status(501).render('Error' , { para: "Invalid Password" })
   }
})


// get register api

router.get("/register-api", async (req, res) => {
    try
    {
        const getuserdata = await UserData.find({});
        res.status(201).send(getuserdata)
        
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
})

// router post
module.exports = router;

