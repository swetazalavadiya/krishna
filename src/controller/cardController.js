const cardModel = require("../models/cardModel")
const constomerModel = require("../models/customerModel")

exports.createCard = async (req, res) => {
    try {
        let customerID = req.params.customerID
        let data = req.body

        const costomer = await constomerModel.findOne({ customerID }, { firstName: 1, lastName: 1, _v: 0, _Id: 0 })
        if (!costomer) return res.status(404).send({ status: false, msg: "customer is not present" })

        const priviousData = await cardModel.find({}, { cardNumber: 1, _id: 0, _v: 0 }).sort({ cardNumber: -1 }).limit(1);
        if (!priviousData) (
            data.cardNumber = C001
        )
        const card = priviousData[0].cardNumber.split()
        const number = card[card.length - 1] + 1

        data.cardNumber = C00, number
        data.customerID = customerID
        data.customerName = costomer.firstName + " " + costomer.lastName

        return res.status(500).send({ status: true, msg: "created successfully", data: data })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


exports.getAllCart = async (_, res) => {

    const get = await cardModel.find({}).populate("customerID")

    if (!get) return res.status(404).send({ status: false, msg: "data not found" })

    return res.status(200).send({ status: true, msg: get })
}