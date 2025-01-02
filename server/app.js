require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
app.use("/users", userRouter)
app.use("/", authRouter)

app.listen(PORT);