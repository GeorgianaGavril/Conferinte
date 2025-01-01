require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userRouter = require("./src/routes/users")
const authRouter = require("./src/routes/auth")
app.use("/users", userRouter)
app.use("/", authRouter)

app.listen(PORT);