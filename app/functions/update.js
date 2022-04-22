const { updateItemModel } = require('../schema/item');
const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();

const handler = async event => {
  try {
    const { id, name } = event.arguments.input;
    if (!id || !name) throw 'id and name are required';

    const now = new Date().toISOString();
    const Item = {
      id,
      name,
      updatedAt: now
    }
    await updateItemModel.validateAsync(Item);

    const { Attributes } = await ddb.update({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        PK: `item`,
        SK: `item#${id}`,
      },
      UpdateExpression: "set #name = :name, #updatedAt = :updatedAt",
      ConditionExpression: "attribute_exists(id)",
      ExpressionAttributeValues: {
        ":name": name,
        ":updatedAt": now,
      },
      ExpressionAttributeNames: {
        "#name": "name",          
        "#updatedAt": "updatedAt",
      },
      ReturnValues: "ALL_NEW",
    }).promise();

    return Attributes;
    
  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = { handler }