import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  try{
    const body = JSON.parse(event.body);
    const now = new Date();
    const auction = {
      id: uuidv4(),
      title: body.title,
      status: 'Open',
      createdAt: now.toISOString()
    };
    await dynamodb.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction
    }).promise(); //converts the callback to promise
    return {
      statusCode: 201,
      body: JSON.stringify(auction),
    };
  } catch(error){
    return console.log('Error:', error);
  }
}

export const handler = createAuction;

/** The event parameter contains data about the event that triggered the aws lambda function and the context parameter provides information about the execution environment and the aws lambda function */