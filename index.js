const express = require('express');
require("dotenv").config();

const connectDB = require("./src/config/database");
const app = express();

const port = process.env.PORT || 5100;

connectDB();
app.listen(port, () =>
{
    console.log(`Hello world 2. I'm listening in port ${port}`);
});