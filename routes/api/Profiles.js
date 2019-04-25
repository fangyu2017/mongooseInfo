const express = require("express");

const passport = require("passport");
const router = express.Router();
const Profile = require("../../modules/PROFILE");

/**
 *  $router api/profiles/test
 */
router.get("/test", (req, res) => {
  res.send("ok");
});
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profiles = {
      ...req.body
    };
    new Profile(profiles)
      .save()
      .then(profile => {
        res.json(profile);
      })
      .catch(err => console.log(err));
  }
);

/**
 * 获取所有数据
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then(profile => {
        // console.log(profile);
        if (!profile) {
          return res.json({ msg: "查询成功", profiles: [], status: 200 });
        } else {
          const data = {
            status: 200,
            msg: "查询成功",
            profiles: profile
          };
          res.json(data);
        }
      })
      .catch(err => console.log(err));
  }
);
/**
 * 修改数据  /profiles/edit/:id
 */
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("params", req.params);
    const profiles = {
      ...req.body
    };
    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profiles },
      { new: true }
    ).then(profile => {
      // console.log(profile);
      const data = {
        status: 200,
        msg: "更新数据成功",
        profile: profile
      };
      res.json(data);
    });
  }
);

/**
 * 删除数据  /profiles/delete/:id
 */
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
      .then(res => {
        if (!res) {
          return res.json({ status: 404, msg: "该条数据不存在!!!" });
        } else {
          const data = {
            msg: "数据删除成功",
            status: 200,
            profile: res
          };
          return res.json(data);
        }
      })
      .catch(err => {
        console.log("err------------", err);
        return res.json({ msg: "删除失败", status: 304 });
      });
  }
);
module.exports = router;
