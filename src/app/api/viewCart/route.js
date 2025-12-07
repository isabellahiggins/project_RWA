export async function GET(req){
    console.log("On the viewCart api page");

    const { MongoClient } = require('mongodb');

    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);
    const dbName = 'app'; // database name

    await client.connect();
    const db = client.db(dbName);

    const collection = db.collection('shopping_cart'); // collection name

    const sessionCollection = db.collection('sessions');
    const sessionUserData = await sessionCollection.find({}).limit(1).toArray();
    const usernameFromSession = sessionUserData[0].username;

    //get users cart items
    const itemsInCart = await collection.find({username: usernameFromSession}).toArray();
    console.log('Items in cart =>', itemsInCart);

    return Response.json(itemsInCart);
}