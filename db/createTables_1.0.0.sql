CREATE TABLE State (
	state_id			int 					AUTO_INCREMENT PRIMARY KEY,
	abbrev				char(2)				NOT NULL UNIQUE,
	name 					varchar(20)		NOT NULL UNIQUE
);

CREATE TABLE Party (
	party_id			int						AUTO_INCREMENT PRIMARY KEY,
	party_key			char(8)				NOT NULL UNIQUE,
	name 					varchar(255)	NOT NULL,
	address1			varchar(512)	NOT NULL,
	address2			varchar(512)	DEFAULT NULL,
	city					varchar(25)		NOT NULL,
	state_id			int						NOT NULL,
	guest_number	int						NOT NULL DEFAULT 1,
	RSVPed				boolean				NOT NULL DEFAULT FALSE,
	attending			boolean 			DEFAULT NULL,
	zip						bigint 				NOT NULL,
	email					varchar(255)	DEFAULT NULL,
	phone					varchar(10)		DEFAULT NULL,
	CONSTRAINT FOREIGN KEY (state_id) REFERENCES State(state_id)
);

CREATE TABLE DietaryRestrictions (
	classification 	varchar(25) NOT NULL,
	value 					int 				NOT NULL,
	PRIMARY KEY (value)
);

CREATE TABLE Diet (
	diet_id				int 					AUTO_INCREMENT PRIMARY KEY,
	under18 			boolean 			DEFAULT FALSE,
	notes 				varchar(512)	DEFAULT NULL,
	restriction_mask	int 			DEFAULT NULL,
	CONSTRAINT FOREIGN KEY (restriction_mask) REFERENCES DietaryRestrictions(value)
);

CREATE TABLE Guest (
	guest_id			int						AUTO_INCREMENT PRIMARY KEY,
	first_name		varchar(255)	NOT NULL,
	last_name			varchar(255)	NOT NULL,
	diet_id				int 					NOT NULL,
	party_id			int						NOT NULL,
	CONSTRAINT FOREIGN KEY (party_id) REFERENCES Party(party_id),
	CONSTRAINT FOREIGN KEY (diet_id) REFERENCES Diet(diet_id)
	ON DELETE CASCADE
);

CREATE TABLE Version (
	current 		varchar(16) 	NOT NULL,
	updated 		DateTime 			NOT NULL
);

INSERT INTO Version (current, updated) VALUES ("1.0.0", NOW());
