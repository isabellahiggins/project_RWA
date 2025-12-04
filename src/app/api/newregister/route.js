import {MongoClient} from 'mongodb';

export async function GET(req) {

  // Make a note we are on the api. This goes to the console.
  console.log("in the api page")

  // get the values that were sent across to us.
  const { searchParams } = new URL(req.url)

  const email = searchParams.get('email')
  const confirmEmail = searchParams.get('confirmEmail')
  const pass = searchParams.get('pass')
  const confirmPass = searchParams.get('confirmPass')
  const tel = searchParams.get('telephoneNumber')
  const address = searchParams.get('address')


  console.log("Sent email" + email);
  console.log("Sent confirmEmail" + confirmEmail);
  console.log("Sent confirmPass" + confirmPass);
  console.log("Sent pass" + pass);
  console.log("Sent telephoneNumber" + tel);
  console.log("Sent address" + address);


if(email !== confirmEmail){
  return Response.json({ success: false, message: "Incorrect Email" });
}

if(pass != confirmPass){
  return Response.json({ success: false, message: "Incorrect Password" });
}

//if user enters an email already used
  const url = "mongodb://root:example@localhost:27017/";
  const client = new MongoClient(url);
  await client.connect();
  const dbName = "app";
  const db = client.db(dbName);
  const collection = db.collection("login");

  const userExists = await collection.findOne({ username: email });

  if(userExists){
    return Response.json({ success: false, message: "Email already registered" });
  }

  //Create new user
  const newUser = {
    username: email,
    pass: pass,
    acctype: "customer",
    telephone: tel,
    address: address
  };

  const insertResult = await collection.insertOne(newUser);
  console.log("New user created");

  //database call goes here at the end of the process we need to send something back.
  return Response.json({ success: true, message: "Registration completed successfuly" });
}