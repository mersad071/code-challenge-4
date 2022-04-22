const { deleteItemModel } = require('../schema/item');
const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();

const handler = async event => {
  try {
    const { id } = event.arguments.input;

    await deleteItemModel.validateAsync({ id });
    
    const { Item } = await ddb.get({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        PK: `item`,
        SK: `item#${id}`,
      },
    }).promise();

    return Item;
    
  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = { handler }