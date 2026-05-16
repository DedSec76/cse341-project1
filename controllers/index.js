const ObjectId = require('mongodb').ObjectId;
const connectDB = require('../database/connect');

const controller = {};

controller.getAllData = async (req, res) => {
  try {
    const db = await connectDB();

    const result = await db.collection('contacts').find().toArray();

    if(!result) {
      return res.status(404).send({ message: 'Nothings was found' })
    }

    res.setHeader('Content-type', 'application/json');
    res.status(200).json(result);

  } catch (error) {
    return res.status(500).send({
      message: error.message || 'An error occurred while Get all the data'
    })
  }
};

controller.getData = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.contact_id);
    const db = await connectDB();

    const result = await db.collection('contacts').findOne({ _id: contactId });

    if(!result) {
      return res.status(404).send({message: 'Contact not found'});
    }
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(result);
    
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'An error occurred while Get the data'
    })
  }
};

controller.createData = async(req, res) => {
  try { 

    if(!req.body.firstName?.trim() || !req.body.lastName?.trim() || !req.body.email?.trim()) {
      return res.status(400).send({ 
        message: 'firstName, lastName or Email are required' 
      })
    }

    const db = await connectDB();

    const result = await db.collection('contacts').insertOne(req.body);

    return res.status(201).send({
      id: result.insertedId,
      message: 'Contact created successfully' 
    });

  } catch(error) {
    return res.status(500).send({
      message: error.message || 'Some error occurred while creating contact'
    })
  }
}

controller.updateData = async(req, res) => {
  try {

    const body = req.body
    const contactId = new ObjectId(req.params.contact_id)

    if(Object.keys(body).length === 0) {
      return res.status(400).send({message: 'Data to update can not be empty!'})
    }

    const db = await connectDB()
    const result = await db.collection('contacts').updateOne({ _id: contactId }, { $set: body })

    if(result.matchedCount === 0) {
      return res.status(404).send({message: 'Contact not found'})
    }

    return res.status(200).send({ message: `Contact with id ${contactId} was updated successfully. `})

  } catch (error) {
    return res.status(500).send({
      message: `Error updating contact with contact_id= ${contactId}`
    })
  }
}

controller.deleteData = async(req, res) => {  
  try {
    const contactId = new ObjectId(req.params.contact_id);

    const db = await connectDB()

    const result = await db.collection('contacts').deleteOne({_id: contactId})

    if(result.deletedCount === 0) {
      return res.status(404).send({message: 'Contact not found'})
    }

    return res.status(200).send({
      id: contactId,
      message: 'Contact deleted successfully'
    })

  } catch (error) {
    return res.status(501).send({
      message: error.message || 'An occurred error to delete contact'
    })
  }
}

module.exports = controller;
