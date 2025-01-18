require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const reviewRouter = require("./routes/review");
const articleRouter = require("./routes/article");
//const conferenceRouter = require("./routes/conference");
app.use("/users", userRouter);
app.use("/article", articleRouter);
//app.use("/conference", conferenceRouter);
app.use("/", authRouter);
app.use("/reviews", reviewRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
