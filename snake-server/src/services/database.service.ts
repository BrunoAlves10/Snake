// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: {
  leaderboard?: mongoDB.Collection;
} = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  await db.command({
    collMod: process.env.LEADERBOARD_COLLECTION_NAME,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "score", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: {
            bsonType: "string",
            minLength: 3,
            maxLength: 3,
            description:
              "'name' is required, is a string and must be 3 letters long",
          },
          score: {
            bsonType: "int",
            description: "'score' is required and is an integer",
          },
          createdAt: {
            bsonType: "date",
            description: "'createdAt' is required and is a date",
          },
          updatedAt: {
            bsonType: "date",
            description: "'updatedAt' is optional and is a date",
          },
        },
      },
    },
  });

  const leaderboardCollection: mongoDB.Collection = db.collection(
    process.env.LEADERBOARD_COLLECTION_NAME!
  );

  collections.leaderboard = leaderboardCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${leaderboardCollection.collectionName}`
  );
}
