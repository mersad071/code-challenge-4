const { deleteItemModel } = require('../schema/item');
const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();

const handler = async event => {
  try {
    const { id } = event.arguments.input;
    const Item = {
      id
    }
    await deleteItemModel.validateAsync(Item);
    
    const { Attributes } = await ddb.delete({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        PK: `item`,
        SK: `item#${id}`,
      },
      ReturnValues: "ALL_OLD",
    });

    return Attributes;
    
  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = { handler }