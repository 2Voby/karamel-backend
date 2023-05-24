const User = require("./models/User");
const Role = require("./models/Role");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const KaramelData = require("./models/KaramelData");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, {});
};

class authController {
  async login(req, res) {
    try {
      console.log(req.body);
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(403)
          .json({ message: `Користувача ${username} не існує` });
      }
      if (password != user.password) {
        return res.status(403).json({ message: `Введено невірний пароль` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }
  async editKaramelData(req, res) {
    try {
      const clearData = await KaramelData.deleteMany();
      const karamelData = new KaramelData(req.body);
      karamelData.save();
      res.json(karamelData);
    } catch (e) {
      console.log(e);
    }
  }

  async getKaramelData(req, res) {
    try {
      const karamelData = await KaramelData.find();
      res.json(karamelData);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
