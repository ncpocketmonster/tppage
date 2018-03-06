use tt;
CREATE TABLE IF NOT EXISTS `think_article`(
   `aid` INT UNSIGNED AUTO_INCREMENT,
   `title`  VARCHAR(100) NOT NULL,
   `author` VARCHAR(100) NOT NULL,
   `keyword` VARCHAR(100) NOT NULL,
   `article_type` VARCHAR(100) NOT NULL,
   `content` VARCHAR(10000) NOT NULL,
   `create_time` DATETIME,
   `update_time` DATETIME,
   PRIMARY KEY ( `aid` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;