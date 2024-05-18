const jwt = require("jsonwebtoken");
const findUser = require("../controllers/findUser");
require("dotenv").config();

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const JWT_SECRET_KEY = process.env.JWT_SECRET;
  const EXPIRE_DATE = parseInt(process.env.JWT_COOKIE_EXPIRES_IN);
  const expirationDate = new Date(Date.now() + EXPIRE_DATE);

  try {
    const user = await findUser(username, password);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı veya şifre hatalı");
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
    const cookieOptions = {
      expires: expirationDate,
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }
    res.cookie("jwt", token, cookieOptions);
    return res.json({ token });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "Giriş yapılamadı: " + error.message });
  }
};

module.exports = userLogin;
