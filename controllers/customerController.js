
const Customer = require("../models/Customer");
const User = require("../models/User");
const { addAddress } = require("../utils/addressService");
const { sendMail } = require("../utils/emailService");


const create = async (req, res) => {

    const currentUser = req.verifiedUser;

    const ownerId = currentUser._id;

    if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.phoneNumber 
    ) {
        return res.status(400).send({
        message: "Fields cannot be empty!",
        });
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      country,
      postal,
      addressType
    } = req.body;

    await Customer.findOne({ businessEmail: email }).then(async (customer) => {
        if (customer) {
            return res.status(400).json({
                message: "Customer already exist for Owner",
            });
        }

        const customer = new Customer({
            ownerId,
            firstName,
            lastName,
            email,
            phoneNumber,
        });

        let createdCustomer;

        try {
            createdCustomer = await customer.save();
        } catch(err) {
            console.log("Error while Adding Customer --> " + err.message);
            return res.status(500).send({
              message: "Some error occurred while Adding Customer",
            });
        }

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

            // email sending not an abosulte requirement, should not pop error on FE if failed

            /* return res.status(500).send({
            message: "Some error occurred while sending Email",
            }); */
        }

        // creating address
        const body = {
            ownerId: createdCustomer._id, 
            address,
            city,
            country,
            postal,
            addressType,
        };

        const addressResponse = await addAddress(body);

        switch (addressResponse.status) {
            case 200:
                break;
            case 409:
                return res.status(addressResponse.status).send({
                    message: addressResponse.message,
                });
            case 500:
                return res.status(addressResponse.status).send({
                    message: addressResponse.message,
                });
            default:
                break;
        }

        // update return data to include address
        const finalResponse = { ...addressResponse.data, ...createdCustomer };


        // sending final response

        return res.status(200).send({
            message: "Customer added Successfully",
            data: finalResponse,
        });
        
    });
};

module.exports = {
  create,
};