export async function GET(req) {


  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")



  // get the values

  // that were sent across to us.

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

 


  // database call goes here

  // at the end of the process we need to send something back.

  return Response.json({ "data":"ok" })

}