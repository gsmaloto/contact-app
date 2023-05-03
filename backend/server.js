const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// express app
const app = express();
const conntactRoutes = require("./routes/contacts");
const userRoutes = require("./routes/user");

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/contacts", conntactRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port ", process.env.PORT);
    });
  })
  .catch((error) => console.log("DB ERROR: ", error.message));
