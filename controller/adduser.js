const bcrypt = require("bcryptjs");
const User = require("../models/user");
const uid = require("short-unique-id")

const addUser = async (req, res) => {
  try {
    const body = req.body;
    if (body.username && body.password && body.email && body.threshold) {
      const encPassword = await bcrypt.hash(body.password, 10);
      await User.findByPk(body.email).then((data) => {
        if (!data) {
          const id = new uid({length: 7});
          const userKey = `${body.username}_${id()}`.replace(/\s+/g, "").toLowerCase();
          const counterKey = 0;
          User.create({
            username: body.username,
            password: encPassword,
            email: body.email,
            threshold: Number(body.threshold),
            key: userKey,
            counter: counterKey
          }).then(async (resp) => {
            if (resp.dataValues && resp.dataValues.id) {
                return res.status(200).send({
                  status: "success",
                  message: "user added successfully",
                  data: {
                    key: resp.dataValues.key,
                    username: resp.dataValues.username
                  }
                });
            } else {
              return res.status(400).send({
                status: 'failure',
                message: 'Error in creating user'
              })
            }
          });
        } else {
          return res.status(404).send({
            status: "failure",
            message: "user already exists",
          });
        }
      });
    } else {
      return res.status(400).send({
        status: "failure",
        message: "mandatory fields are missing",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

module.exports = addUser;
