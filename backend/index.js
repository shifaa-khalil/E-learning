require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./configs/db.config");
require("./models/user.model");
require("./models/class.model");
require("./models/enrollment.model");
require("./models/file.model");
require("./models/droprequest.model");

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const adminRouter = require("./routes/admin.routes");
app.use("/admin", adminRouter);

const studentRouter = require("./routes/student.routes");
app.use("/student", studentRouter);

app.listen(process.env.PORT, async (err) => {
  if (err) console.error(err);
  console.log("Server is running on port ", process.env.PORT);
  await connectDB();
});
