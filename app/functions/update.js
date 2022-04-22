const { updateItemModel } = require('../schema/item');
const { randomUUID } = require('crypto');
const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB.DocumentClient();


const handler = async event => {
  try {
   

    return true;
    
  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = { handler }