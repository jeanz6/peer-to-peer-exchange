import { Client } from "https://deno.land/x/mysql/mod.ts";
// config
import { DATABASE, TABLE } from "./config.ts";


// TODO: Give db password through environement
const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "profi",
  db: "p2pexchange",
  password: "p2p",
});


/*

-- Buyer table

CREATE TABLE `peer2peer`.`buyers` (
  `idbuyers` INT NOT NULL AUTO_INCREMENT,
  `pair` VARCHAR(45) NOT NULL,
  `amount` FLOAT NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `contact` VARCHAR(50) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `buyerscol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idbuyers`));



-- Seller table

CREATE TABLE `peer2peer`.`sellers` (
  `idsellers` INT NOT NULL AUTO_INCREMENT,
  `pair` VARCHAR(45) NOT NULL,
  `amount` FLOAT NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `contact` VARCHAR(50) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idsellers`));


*/

// run();

export default client;