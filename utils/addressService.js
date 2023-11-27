const Address = require("../models/Address");


const addAddress = async (body) => {

    const addresses = await Address.find({ ownerId: body.ownerId });

    // a  customer can only have 1 address, an app user can have only 2, 
    // 1 for contact, and 1 to display on Invoice.

    if(addresses.length > 0 & body.addressType == "customer") {
        return {
            status: 409,
            message: "Customer already has an address"
        }
    }

    if ((addresses.length == 2) ) {
      return {
        status: 500,
        message: "User has used up all address slots",
      };
    }

    // still one more logic to check between contact & invoice,
    // for now just override if exists

    const toUpdate = {
        address: body.address,
        city: body.city,
        country: body.country,
        postal: body.postal,
        addressType: body.addressType
    }

    const response = await Address.findOneAndUpdate(
        { ownerId: body.ownerId },
        { toUpdate },
        { new: true, upsert: true }
    );

    return {
      status: 200,
      message: "Created address successfully",
      data: response
    };

};

module.exports = { addAddress };
