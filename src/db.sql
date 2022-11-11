drop table if exists ref_codes;

CREATE TABLE `ref_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wallet` varchar(255) NOT NULL,
  `ref_code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


drop table if exists ref_bets;

CREATE TABLE `ref_bets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wallet` varchar(255) NOT NULL,
  `match_id` varchar(255) NOT NULL,
  `guess_type` varchar(255) NOT NULL,
  `bet_amount` varchar(255) NOT NULL,
  `bet_time` varchar(255) NOT NULL,
  `ref_code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci