const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { createJwtToken } = require("../config/generateToken");


const login = (req, res) => {
  const { login, password } = req.body;

  User.findOne({ $or: [{ email: login }, { phoneNumber: login }] })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User does not exist. Please signup.",
        });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(
            "Error while comparing password with bcrypt --> " + err.message
          );
          return res.status(400).json({
            message: "Error while comparing password with bcrypt",
          });
        }

        if (result) {
          if (user.isActive === false) {
            return res.status(403).json({
              message: "User is not active, activate via email or phone",
            });
          }

          const createFor = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
          };

          const token = createJwtToken(createFor);
          console.log("token from login --> ", token);

          return res.status(200).json({
            message: "User Login Successful",
            data: {
              access_token: token,
              // user: user,
            },
          });
        } else {
          return res.status(401).json({
            message: "Password does not match",
          });
        }
      });
    })
    .catch((err) => {
      console.log("Error while logging in user --> " + err.message);
      return res.status(500).send({
        message: "Some error occurred while logging in user",
      });
    });
};

const activate = (req, res) => {
  const { otp, email } = req.body;

  User.findOneAndUpdate({ email, otp }, { isActive: true })
    .then((user) => {
        
      return res.status(200).json({
        message: "User Activation Successful",
        data: {
          user
        },
      });
    })
    .catch((err) => {
      console.log("Error while activating User --> " + err.message);
      return res.status(404).send({
        message: "Unable to Activate User, Try Again",
      });
    });
};

module.exports = { login, activate };
