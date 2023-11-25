
const Customer = require("../models/Customer");
const User = require("../models/User");
const { sendMail } = require("../utils/emailService");


const create = async (req, res) => {

    const currentUser = req.verifiedUser;

    const ownerId = currentUser._id;

    if (
        !req.body.fullName ||
        !req.body.businessName ||
        !req.body.businessEmail ||
        !req.body.businessNumber 
    ) {
        return res.status(400).send({
        message: "Fields cannot be empty!",
        });
    }

    const { fullName, businessName, businessEmail, businessNumber, businessAddress } = req.body;

    await Customer.findOne({ businessEmail: email }).then((customer) => {
        if (customer) {
            return res.status(400).json({
            message: "Customer already exist for Owner",
            });
        }

        let customer = new Customer({
            ownerId,
            fullName,
            businessName,
            businessEmail,
            businessNumber,
            businessAddress,
        });

        customer
          .save()
          .then(async (customer) => {
            // send email
            const emailOptions = {
              to: currentUser.email,
              subject: "You added a new Customer to your Profile",
              reason: "Customer",
            };

            try {
              await sendMail(emailOptions);
            } catch (err) {
              console.log("Error while sending email --> " + err.message);
              return res.status(500).send({
                message: "Some error occurred while sending Email",
              });
            }

            return res.status(200).send({
              message: "Customer added Successfully",
              data: customer,
            });
          })
          .catch((err) => {
            console.log("Error while Adding Customer --> " + err.message);
            return res.status(500).send({
              message: "Some error occurred while Adding Customer",
            });
          });
    });
};

module.exports = {
  create,
};