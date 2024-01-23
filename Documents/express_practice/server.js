const express = require("express"); //I am using the server module.
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(errorHandler);

//anonymous function passed as parameter in get funtion.
app.use("/api/contacts", require("./routes/contactsRoutes"));

app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () =>{
    console.log(`server running on port ${port}`);
 });