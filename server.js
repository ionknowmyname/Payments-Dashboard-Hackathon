const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const user = require("./routes/user");
const auth = require("./routes/auth");
const address = require("./routes/address");
const customer = require("./routes/customer");
const invoice = require("./routes/invoice");

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
app.use("/api/v1/address", address);
app.use("/api/v1/customer", customer);
app.use("/api/v1/invoice", invoice);

const PORT = process.env.PORT; // || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
