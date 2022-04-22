const { createItemModel } = require('../schema/item');
const { randomUUID } = require('crypto');
const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();


const handler = async event => {
  try {
    const { name } = event.arguments.input;
    if (!name) throw 'name is required';
    const now = new Date().toISOString();
    const id = randomUUID();
    const Item = {
      PK: 'item',
      SK: `item#${id}`,
      id,
      name,
      createdAt: now,
      updatedAt: now
    }
    createItemModel.validate(Item);
    
    await ddb.put({
      TableName: process.env.DYNAMODB_TABLE,
      Item
    }).promise();

    return Item;
  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = { handler }