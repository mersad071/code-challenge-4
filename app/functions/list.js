const { listItemsModel } = require('../schema/item');
const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();

const handler = async event => {
  try {
    const { limit, nextToken } = event.arguments.input;
    await listItemsModel.validateAsync(event.arguments.input);
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      KeyConditionExpression: "#PK = :PK",
      ExpressionAttributeValues: {
        ":PK": `item`,
      },
      ExpressionAttributeNames: {
        "#PK": "PK",
      },
      Limit: limit ?? 5,
      ExclusiveStartKey: nextToken,
      ScanIndexForward: false,
      ConsistentRead: false,
      Select: "ALL_ATTRIBUTES",
    }
    const { Items, LastEvaluatedKey } = await ddb.query(params).promise();
    
    return { Items, nextToken: LastEvaluatedKey ? Buffer.from(JSON.stringify(LastEvaluatedKey)).toString('base64') : null };
  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = { handler }