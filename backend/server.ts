import { opine, serveStatic, json } from "https://deno.land/x/opine@2.1.2/mod.ts";
import { opineCors } from "https://deno.land/x/cors/mod.ts";
import { query_buyers } from "./src/query_db.ts"
import { query_sellers } from "./src/query_db.ts"
import { add_trader } from "./src/query_db.ts"
import {  check_if_password_exists } from "./src/query_db.ts"
import { delete_an_offer } from "./src/query_db.ts"

import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.1.0/mod.ts"

// TODO: Tidy up imports


//let std_listener = std::net::TcpListener::bind(&addr)
//    .expect(&format!("Can't bind to {}", addr));


const app = opine();
const pathToAssets = `${Deno.cwd()}/public`
const pathToIndexHTML = `${pathToAssets}/index.html`

app.use(serveStatic(pathToAssets))
app.use(opineCors())

app.use(json()); // for parsing application/json

app.get("/", function (req, res) {
    res.sendFile(pathToIndexHTML);
});


// TODO
async function handle_password_check() {   
    check_if_password_exists("WMVzKVQNhf").then((result:any) => {
        console.log("result= " + result["rows"]); 
    });

    // console.log(result)
}



app.post("/addUser", function (req, res) {
    // console.log(req.body);
    // console.log(req.body.pair);
    // console.log(req.body.amount);

    let pair = req.body.pair;
    let amount = req.body.amount;
    let location = req.body.location;
    let contact = req.body.contact;
    let kindOfOffer = req.body.kindOfOffer;
    // let seller = req.body.seller;
    // let offer = req.body.offer;
    console.log(pair, amount, location, contact, kindOfOffer);


    // TODO: Check if values are given
    /*
    if (
          (req.parsedBody.hasOwnProperty("user") == false) ||
          (req.parsedBody.hasOwnProperty("amount") == false) ||
          (req.parsedBody.hasOwnProperty("location") == false) ||
          (req.parsedBody.hasOwnProperty("contact") == false) ||
          (req.parsedBody.hasOwnProperty("kindOfOffer") == false)
    ) {
      res.setStatus(400);
      res.send("Missing Parameter");
    }
    */

    let password = "";
    
    password = cryptoRandomString({length: 10, type: 'url-safe'});

    // TODO: Add password check
    // Ignore it for now

    add_trader(pair.pair, amount, location.location, contact.contact, kindOfOffer, password);

    res.setStatus(200);
    res.send("OK");

});

app.get("/deleteUser/:typeOfOffer/:password", function (req, res) {
    let typeOfOffer = req.params.typeOfOffer;
    let password = req.params.password;

    // TODO: Check if values are given

    // Try to remove entry of password
    delete_an_offer(password, typeOfOffer);

    res.setStatus(200);
    res.send("OK: If the given offer existed it will be deleted now.");
});

app.post("/queryUsers", async function (req, res) {
    // TODO: Query both types of users
    let buyers = await query_buyers();
    let sellers = await query_sellers();
    
    let all_traders = buyers.concat(sellers);
    res.json(all_traders);
})


//const port = 3000

if (Deno.args[0] === '443') {

    // const cert = await Deno.readTextFile(`/etc/letsencrypt/live/openforce.de/fullchain.pem`)
    // const key = await Deno.readTextFile(`/etc/letsencrypt/live/openforce.de/privkey.pem`)

    const options = {
        port: Number(Deno.args[0]),
        certFile: "root/fullchain.pem",
        keyFile: "root/privkey.pem"
    }


    app.listen(options, () => console.log(`server has started on http://localhost:${Deno.args[0]} 🚀`))

} else {

    // mongodbConnectionString = `mongodb://${mongoUser}:${mongoPW}@localhost:27017`
    app.listen(Number(Deno.args[0]), () => console.log(`server has started on http://localhost:${Deno.args[0]} 🚀`))

}


//app.listen(
//    port,
//    () => console.log(`server has started on http://localhost:${port} 🚀`),
//);