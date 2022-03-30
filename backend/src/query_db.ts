import client from "./db_connection.js"


export async function query_buyers() {
    let buyers = await client.query("select pair, amount, location, contact from buyers");
    console.log(typeof(buyers));
    for (let i in buyers) {
        buyers[i].trader_type = 'buyers';
    }
    // return await client.query("select pair, amount, location, contact from buyers");
    return await buyers;
}

export async function query_sellers() {
    let sellers = await client.query("select pair, amount, location, contact from sellers");
    for (let i in sellers) {
        sellers[i].trader_type = 'sellers';
    }
    // return await client.query("select pair, amount, location, contact from sellers");
    return await sellers;
}

export async function add_trader(pair:string, amount:string, location:string,
                    contact:string, kindOfOffer:string, password:string) {
    // TODO: Confirm the value of "kindOfOffer"
    if (kindOfOffer == 'buyer') {
        return await client.execute("INSERT INTO buyers(pair, amount, location, contact, password) values(?, ?, ?, ?, ?)", [
            pair,
            amount,
            location,
            contact,
            password
        ]);
    }
    else if (kindOfOffer == 'seller') {
        return await client.execute("INSERT INTO sellers(pair, amount, location, contact, password) values(?, ?, ?, ?, ?)", [
            pair,
            amount,
            location,
            contact,
            password
        ]);
    } else {
        console.log("No typeOfOffer specified!");
        return 1;
    }
}

export async function check_if_password_exists(password:string) {
    // return await client.query(`select * from sellers`)

    return await client.execute(`
    select password 
		from (select password from sellers
		    union 
		    select password from buyers
	    ) as u
    where u.password = '?'
    `, 
    [
        password
    ])
}

export async function delete_an_offer(password:string, typeOfOffer:string) {
    if (typeOfOffer == 'buyer') {
        return await client.execute(`
        delete from buyers where password = ?
        `, [password]);
    } else if (typeOfOffer == 'seller') {
        return await client.execute(`
        delete from sellers where password = ?
        `, [password]);
    } else {
        console.log("No typeOfOffer specified!");
        return 1;
    }
}
    

// export const buyers = await client.query("select * from buyers");
// export const buyers = await query_buyers();
