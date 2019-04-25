const express = require("express");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const User = require("./../../modules/USER");
const tokenName = require("./../../config/keys");
router.get("/test", (req, res) => {
  res.json({ msg: "suc" });
});
/**
 * 注册
 */
router.post("/register", (req, res) => {
  console.log(req.body);
  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "该账户已经被注册" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        passworld: req.body.passworld
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.passworld, salt, (err, hash) => {
          if (err) throw err;
          newUser.passworld = hash;
          newUser.save(function(err, user) {
            if (err) throw err;
            console.log(user);
            res.json(user);
          });
        });
      });
    }
  });
  // res.end('ok')
});

/**
 * 登录
 */
router.post("/login", (req, res) => {
  const { name, passworld } = req.body;
  User.findOne({ name }, (err, user) => {
    if (!user) {
      return res.status(404).json({ msg: "用户不存在" });
    } else {
      bcrypt.compare(passworld, user.passworld).then(isMatch => {
        if (isMatch) {
          const rule = {
            id: user.id,
            name: user.name
          };
          jwt.sign(
            rule,
            tokenName.secret,
            { expiresIn: 60 * 60 * 60 * 24 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                status: 200,
                msg: "登录成功",
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ msg: "密码错误..." });
        }
      });
    }
  });
});

/**
 * 信息接口
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      status: 200,
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
