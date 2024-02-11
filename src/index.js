const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const Joi = require("joi");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const validate = require("./middleware/validate");
const authenticationMiddleware = require("./middleware/authentication");
const User = require("./models/User");

dotenv.config();
const app = express();

const { PORT, DB_CONNECTION } = process.env;
mongoose.set("strictQuery", true);
mongoose.connect(DB_CONNECTION).then(() => console.log("Mongoose Connected!"));

app.use(express.json());
app.use(cors());

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );

app.use("*", (req, _, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

app.get("/health", (_, res) => res.send("Ok"));

const createNewUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  job: Joi.string().required(),
  avatar: Joi.string().uri().optional(),
});
app.post(
  "/api/:key/admin/:cohort/user",
  validate(createNewUser),
  async (req, res) => {
    const { key } = req.params;
    if (key !== process.env.API_KEY) {
      return res.status(401).send("Unauthorized");
    }

    const user = await User.create({
      ...req.body,
      cohort: req.params.cohort,
    });
    return res.json(user);
  }
);

app.use(authenticationMiddleware);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/order", orderRoutes);

app.use((err, _, res, next) => {
  console.error("Error: ", err);
  res.status(500).send(err);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
