DROP TABLE IF EXISTS `sellers`;
DROP TABLE IF EXISTS `buyers`;

CREATE TABLE `sellers` (
	`idsellers` int(11) NOT NULL AUTO_INCREMENT, 
    `pair` varchar(20) NOT NULL,
    `amount` float NOT NULL,
	`location` varchar(40) NOT NULL,
	`contact` varchar (51) NOT NULL,
    `password` varchar (20) NOT NULL,
    PRIMARY KEY (`idsellers`)
);
CREATE TABLE `buyers` (
	`idbuyers` int(11) NOT NULL AUTO_INCREMENT, 
    `pair` varchar(20) NOT NULL,
    `amount` float NOT NULL,
	`location` varchar(40) NOT NULL,
	`contact` varchar (51) NOT NULL,
    `password` varchar (20) NOT NULL,
    PRIMARY KEY (`idbuyers`)
);

INSERT INTO `sellers` (pair, amount, location, contact, password)
VALUES ('ETHtoEUR', 1, 'Mannheim', 'php', '123');

INSERT INTO `buyers` (pair, amount, location, contact, password)
VALUES ('EURtoETH', 1000, 'Mannheim', 'phpbuyer', '123');

GRANT ALL PRIVILEGES ON *.* TO 'profi'@'%';
