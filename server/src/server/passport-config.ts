import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcrypt';

// Configure DynamoDB Client
const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = "Users";

// User model functions interacting with DynamoDB
const getUserById = async (id: string) => {
  
  const params = {
    TableName: tableName,
    Key: { id },
  };
  const { Item } = await ddbDocClient.send(new GetCommand(params));
  if (!Item) {
    return null;
  }
  return Item;
};

const getUserByUsername = async (username: string) => {
  const params: QueryCommandInput = {
    TableName: tableName,
    IndexName: 'username-index',
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': { S: username }, 
    },
  };
  const { Items } = await ddbDocClient.send(new QueryCommand(params));
  if (!Items || Items.length === 0) {
    return null;
  }
  return Items[0]; // Assuming username is unique, return the first item
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
      if (!user.password["S"]) {
        return done(null, false);
      }
      if (await bcrypt.compare(password, user.password["S"])) {
        return done(null, user);
      } 
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
