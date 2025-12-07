export async function GET(req, res){

    console.log("In remove from cart from api page");

    const { MongoClient, ObjectId } = require('mongodb');
    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);
    const dbName = 'app'; // database name

    await client.connect();
    const db = client.db(dbName);

    const collection = db.collection('shopping_cart'); // collection name

    //get product to delete by getting Id
    const { searchParams } = new URL(req.url)
    const itemId = searchParams.get('itemId')
    console.log("Remove from cart: " + itemId);

    //delete item from cart
    const deleteProduct = await collection.deleteOne({_id: new ObjectId(itemId)});
    
    console.log("Item successfully removed from cart");

    return Response.json({"data": "removed from cart"});
}