const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require("./db/db");
const { urlencoded } = require('express');
const port = process.env.PORT || 8000;

// middleware path link setup
const StaticPath = path.join(__dirname, "../public");
const TemplatePath = path.join(__dirname, "../templates/views");
const PartialsPath = path.join(__dirname, "../templates/partials");

// middleware
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(urlencoded({ extended: false }));
app.use(express.static(StaticPath));
app.set("view engine", "hbs");
app.set("views", TemplatePath);
hbs.registerPartials(PartialsPath);

app.get('/', (req, res) => {
    res.status(201).render("index");
})

app.listen(port , () => console.log(`express server is ${port}`))