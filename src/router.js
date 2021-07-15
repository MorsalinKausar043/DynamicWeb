const express = require('express');
const router = new express.Router();
const UserData = require("./models/conn");

// middleware
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.status(201).render("index");
})

router.get('/about', (req, res) => {
    res.status(201).render("about");
})

router.get('/services', (req, res) => {
    res.status(201).render("services");
})

router.get('/login', (req, res) => {
    res.status(201).render("login");
})


router.get('/registration', (req, res) => {
    res.status(201).render("registration");
})

// registation form post
router.post("/registration", async (req, res) => {
    try
    {
        const userdatas = new UserData(req.body);
        await userdatas.save();
        res.status(201).render("index");
        
    } catch (error) {
        console.log(error);
        res.status(404).render('Error', { para: error });
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