const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 8000;

// middleware path link setup
const StaticPath = path.join(__dirname, "../public");

// middleware
app.use(express.static(StaticPath));

app.get('/', (req, res) => {
    res.status(201).send("hello world");
})

app.listen(port , () => console.log(`express server is ${port}`))