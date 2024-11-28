const express = require('express');
const { connection } = require('./config/db');
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute")
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

//Database connection
connection();


//Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute)


console.log(process.env.PORT);
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`runnig at port ${PORT}`);
})