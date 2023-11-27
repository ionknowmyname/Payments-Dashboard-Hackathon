const Invoice = require("../models/Invoice");
const { generateRandomString } = require("../utils/appUtil2");

const create = async (req, res) => {

    const currentUser = req.verifiedUser;

    const ownerId = currentUser._id;

    if (!req.body.amount || !req.body.customerId) {
        return res.status(400).send({
            message: "Fields cannot be empty!",
        });
    }

    const { amount, customerId } = req.body;
    const transactionId = generateRandomString(10);

    const newInvoice = {
        ownerId,
        customerId,
        transactionId,
        date: new Date(),
        amount,
        sttatus: "pending"
    }

    const createdInvoice = await Invoice.create(newInvoice);

    return res.status(200).send({
      message: "Invoice created Successfully",
      data: createdInvoice,
    });
};



module.exports = {
  create,
};
