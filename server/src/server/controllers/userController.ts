import { Request, Response } from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  PutCommandInput,
  GetCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const tableName = "Users";

// Configure DynamoDB Client
const db = DynamoDBDocumentClient.from(new DynamoDBClient());

// Function to add a new user
export const addUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newId = uuidv4();
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) {
          throw err;
        }

        const newUser = {
          id: newId,
          username,
          hashedPassword,
        };

        const params: PutCommandInput = {
          TableName: tableName,
          Item: newUser,
        };

        await db.send(new PutCommand(params));
      });
    });
    res.status(201).json({ message: "User added successfully: ", newId });


  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Could not add user" });
  }
};

// Function to get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const params: GetCommandInput = {
      TableName: tableName,
      Key: { id },
    };

    const { Item } = await db.send(new GetCommand(params));
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
    const params: GetCommandInput = {
      TableName: tableName,
      Key: { username },
    };

    const { Item } = await db.send(new GetCommand(params));
    if (!Item) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(Item);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
};
