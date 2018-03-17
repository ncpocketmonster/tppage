show databases;
use tt;
CREATE TABLE IF NOT EXISTS `login`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `username`      VARCHAR(100) NOT NULL,
   `password`      VARCHAR(600) NOT NULL,
   `salt`          VARCHAR(100) NOT NULL,
   `authority`     VARCHAR(100) NOT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;