require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userRouter = require("./src/routes/users")
app.use("/users", userRouter)

app.listen(3000);