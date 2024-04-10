import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

export const collections: { ingredients ?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DATABASE_URI);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const ingredientsCollection: mongoDB.Collection = db.collection(process.env.INGREDIENTS_COLLECTION_NAME);

    collections.ingredients = ingredientsCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${ingredientsCollection.collectionName}`);
}
