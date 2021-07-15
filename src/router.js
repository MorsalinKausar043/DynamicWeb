const express = require('express');
const router = new express.Router();

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



// router post
module.exports = router;