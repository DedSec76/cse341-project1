const  ObjectId  = require("mongodb").ObjectId;
const connectDB = require("../database/connect");

const controller = {}

controller.getAllData = async (req, res, next) => {
    const db = await connectDB()

    const result = await db.collection('contacts').find().toArray();

    res.setHeader('Content-type', 'application/json');

    res.status(200).json(result)
}

controller.getData = async (req, res, next) => {
    const contactId = new ObjectId(req.params.contact_id)
    const db = await connectDB()

    const result = await db.collection('contacts').findOne({ _id: contactId })

    res.setHeader('Content-type', 'application/json');
    res.status(200).json(result)
}

module.exports = controller