const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { genrateToken } = require("../Utils/tokenGenrator");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!User) {
      user = newUser({ email, name, isGoogleUser: true });
      await user.save();
    }

    const authToken = genrateToken(user._id);
    res.status(200).json({ user, token: authToken });
  } catch (error) {
    res.status(400).json({ error: "Gooogle Login Failed" });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await user.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = genrateToken(user._id);
  res.status(200).json({ user, token });
};

exports.register = async (req, res) => {
  const { name, eamil, password } = req.body;

  try {
    const user = new User({ name, eamil, password });
    await user.save();
    const token = genrateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: "User registration Failed" });
  }
};
