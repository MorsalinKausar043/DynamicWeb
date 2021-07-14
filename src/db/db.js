const mongoose = require('mongoose');
const port = 27017;
const mongodb = `mongodb://localhost:${port}/NodeJsBook`;

mongoose.connect(mongodb, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`mongoose server is ${port}`)).
    catch((error) => console.log(error));