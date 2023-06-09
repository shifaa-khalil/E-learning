const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.status(409).json({ message: "Email already exists" });

  const saltRounds = 9; // Number of salt rounds to use
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  if (role) user.role = role;
  const user = new User({ name, email, password: hashedPassword, role });

  await user.save();

  const { password: newUserPassword, ...newUser } = user.toJSON();
  res.status(201).json(newUser);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "Invalid Credentials" });

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched)
    return res.status(404).json({ message: "Invalid Credentials" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY
  );

  res.json({ token });
};
