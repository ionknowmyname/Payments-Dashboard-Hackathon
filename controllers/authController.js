const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { createJwtToken } = require("../config/generateToken");
const { sendMail } = require("../utils/emailService");


const login = async (req, res) => {
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

const activate = async (req, res) => {
  const { otp, email } = req.body;

  const foundUser = await User.findOne({ email, otp }); 
  
  if (!foundUser) { 
    return res.status(404).send({
        message: "Unable to Activate User, Try Again",
    });
  }

  foundUser.isActive = true;

  const updatedUser = foundUser.save();

  return res.status(200).json({
    message: "User Activation Successful",
    data: {
      user: updatedUser,
    },
  });
};

const resendEmail = async (req, res) => {
    const { email } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const emailOptions = {
        to: email,
        subject: "Welcome on Board",
        otp
    };

    try {
        await sendMail(emailOptions);
    } catch(err) {
        console.log("Error while sending email --> " + err.message);
        return res.status(500).send({
            message: "Some error occurred while sending Email",
        });
    }

    return res.status(200).send({
        message: "Email sent Successfully",
    });
};


module.exports = { login, activate, resendEmail };
