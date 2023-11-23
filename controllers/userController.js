
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendMail } = require("../utils/emailService");


const create = async (req, res) => {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.phoneNumber ||
      !req.body.password
    ) {
      return res.status(400).send({
        message: "Fields cannot be empty!",
      });
    }

    const { firstName, lastName, email, age, phoneNumber, password } = req.body;

    await User.findOne({ email: email }).then((user) => {
        if (user) {
            return res.status(400).json({
                message: "User already exist",
            });
        }

        bcrypt.hash(password, 10, (err, hashedPass) => {
            if (err) {
                console.log("Error while hashing password --> " + err);
                return res.status(401).json({
                    message: "Error while hashing password",
                });
            }

            const otp = Math.floor(1000+ Math.random() * 9000).toString();

            let user = new User({
                firstName,
                lastName,
                email,
                age,
                phoneNumber,
                password: hashedPass,
                otp,
            });

            user.save()
                .then(async (user) => {

                    // send email
                    const emailOptions = {
                      to: user.email,
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
                        message: "User Created Successfully",
                        data: user,
                    });
                })
                .catch((err) => {
                    console.log("Error while creating user --> " + err.message);
                    return res.status(500).send({
                        message: "Some error occurred while creating User",
                    });
                });
        });
    });
};





const leaderboard = async (req, res) => {

    let leaderboard = [];

    try {
        leaderboard = await User.find({}, 'username email totalScore timesPlayed')
            .sort({ totalScore: -1 }) // Sort in descending order based on totalScore
            .limit(10);

        res.status(200).json({  
            message: "Leaderboard retrieved successfully",
            data: {
                leaderboard
            },
        });

    } catch (err) {
        console.log("Error while fetching leaderboard --> " + err.message);

        res.status(500).send({
            message: "Some error occurred while fetching leaderboard",
        });
    }
};



module.exports = {
    create,
    leaderboard
};
