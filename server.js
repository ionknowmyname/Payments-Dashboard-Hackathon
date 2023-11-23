const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const user = require("./routes/user");
const auth = require("./routes/auth");

const { connectDB } = require("./dbConnection");

const { authenticate } = require("./config/authentication");

const app = express();

dotenv.config();

connectDB();

app.use(authenticate);

/* if (process.env.NODE_ENV === "development") {
    app.use(
        cors({
            origin: `${process.env.FRONT_URL}`
        })
    );
} */

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);

const PORT = process.env.PORT; // || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
