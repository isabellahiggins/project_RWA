export async function GET(req, res){
    console.log("On checkout API");

    //connect to DB
    const { MongoClient } = require('mongodb');
    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);
    const dbName = 'app';

    await client.connect();
    const db = client.db(dbName);

    //collections in DB
    const shoppingCartCollection = db.collection('shopping_cart');
    const sessionCollection = db.collection('sessions');
    const ordersCollection = db.collection('orders');

    //get user from session
    const sessionUserData = await sessionCollection.find({}).limit(1).toArray();
    const usernameFromSession = sessionUserData[0].username;
    console.log("User: " + usernameFromSession + "checking out.");

    //get the items in the cart
    const itemsInCart = await shoppingCartCollection.find({username:usernameFromSession}).toArray();

    if(itemsInCart.length == 0){
        console.log("Cart empty.");
        return Response.json({success: false, message: "Empty cart."});
    }

    console.log("Items in user's cart: " + itemsInCart);

    //get items from cart and find total price
    let totalPrice = 0;
    for(let i = 0; i < itemsInCart.length; i++){
        totalPrice += itemsInCart[i].price;
    }

    //create order and add to orders collection in DB
    const order = {
        username: usernameFromSession,
        items: itemsInCart,
        totalPrice: totalPrice,
        date: new Date()
    }
    //add it to coll
    await ordersCollection.insertOne(order);

    //clear cart by deleting all documents when
    await shoppingCartCollection.deleteMany({ username: usernameFromSession });

    console.log("Checkout complete. Order created.");
    return Response.json({ success: true, message: "Order placed successfully!!"});

}