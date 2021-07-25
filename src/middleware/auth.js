const jwt = require("jsonwebtoken");
const UserData = require("../models/conn");

const auth = async (req, res, next) => {
    try
    {
        const token = req.cookies.jwt;
        const UserDataAuth = await jwt.verify(token, process.env.SECRET_KEY);
        // console.log(UserDataAuth);
        const userMatch = await UserData.findOne({ _id: UserDataAuth._id });
        // console.log(userMatch.fname);

        next();
        
    } catch (error) {
        res.status(501).render("error", { para: error });
    }
}


// export Auth 
module.exports = auth;