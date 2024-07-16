import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import AWS from "aws-sdk";
import DynamoDB, { PutItemInput, ScanInput } from "aws-sdk/clients/dynamodb";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../.env' });

// Ensure AWS region is defined in the environment variables
const region = process.env.AWS_REGION;
if (!region) {
  throw new Error('AWS_REGION is not set in environment variables.');
}

// Configure DynamoDB Client
const db = new AWS.DynamoDB.DocumentClient({ region });
const tableName = "Users";

// User model functions interacting with DynamoDB
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// User model functions interacting with DynamoDB
const getUserById = async (id: string) => {
  const getParams: DynamoDB.DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: { id },
  };
  const getResult = await db.get(getParams).promise();
  // DynamoDB will return an empty object if it can't find the item
  if (!getResult.Item) {
    return null;
  }
  return getResult.Item;
};

const getUserByUsername = async (username: string) => {

  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: 'username-index',  // The GSI name
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
        ':username': username
    }
};

  const getResult = await db.query(params).promise();
  // DynamoDB will return an empty object if it can't find the item
  if (!getResult.Items) {
    return null;
  }
  console.log('getResult', getResult)

  return getResult.Items[0];
};

// const getUserByGoogleId = async (googleId: string) => {
//   const params = {
//     TableName: tableName,
//     Key: { googleId },
//   };
//   const { Item } = await ddbDocClient.send(new GetCommand(params));
//   return Item;
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const saveUser = async (user: any) => {
//   const params = {
//     TableName: tableName,
//     Item: user,
//   };
//   await ddbDocClient.send(new PutCommand(params));
// };

// Passport Local Strategy for login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // Add your password validation logic here




      // if (!user.password) {
      //   return done(null, false);
      // }
      // if (await bcrypt.compare(password, user.password)) {
      //   return done(null, user);
      // } 





      return done(null, false, { message: 'Incorrect password.' });
    } catch (error) {
      return done(error);
    }
  })
);

// Passport Google OAuth Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await getUserByGoogleId(profile.id);
//         if (!user) {
//           // Create a new user if not found
//           user = {
//             id: `google-${profile.id}`,
//             googleId: profile.id,
//             username: profile.displayName,
//             email: profile.emails?.[0].value,
//             provider: 'google',
//           };
//           await saveUser(user);
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// Serialize user to store in session
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
