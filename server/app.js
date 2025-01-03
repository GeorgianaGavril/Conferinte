require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],  
    allowedHeaders: ['Content-Type'], 
};

app.use(cors(corsOptions));  
app.use(express.json());

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
app.use("/users", userRouter);
app.use("/", authRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
