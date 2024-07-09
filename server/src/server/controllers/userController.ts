import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { Request, Response } from "express";

// Configure DynamoDB Client
const ddbClient = new DynamoDBClient({ region: "your-region" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// Function to add a new user
export const addUser = async (req: Request, res: Response) => {
  const { id, username, email, password } = req.body;
  if (!id || !username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newUser = {
    id,
    username,
    email,
    password,
  };

  try {
    const params = {
      TableName: "Users",
      Item: newUser,
    };
    await ddbDocClient.send(new PutCommand(params));
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Could not add user" });
  }
};

// Function to get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const params = {
      TableName: "Users",
      Key: { id },
    };
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    if (!Item) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(Item);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
};

// Function to get a user by Username
export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const params = {
      TableName: "Users",
      Key: { username },
    };
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    if (!Item) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(Item);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
};
