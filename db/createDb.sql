CREATE DATABASE IF NOT EXISTS TestDb; USE TestDb;
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
/*
	The restriction table is used to identify dietary restrictions.
	The following values will be used for different dietary classficiations.
		vegetarian - 0001 (1)
		vegan - 0010 (2)
		gluten_free - 0100 (4)
*/

INSERT INTO DietaryRestrictions (classification, value)
VALUES ('Vegetarian', 1), ('Vegan', 2), ('Gluten Free', 4);
INSERT INTO State (abbrev, name) VALUES 
	( 'AL', 'ALABAMA' ),
	( 'AK', 'ALASKA' ),
	( 'AZ', 'ARIZONA' ),
	( 'AR', 'ARKANSAS' ),
	( 'CA', 'CALIFORNIA' ),
	( 'CO', 'COLORADO' ),
	( 'CT', 'CONNECTICUT' ),
	( 'DE', 'DELAWARE' ),
	( 'FL', 'FLORIDA' ),
	( 'GA', 'GEORGIA' ),
	( 'HI', 'HAWAII' ),
	( 'ID', 'IDAHO' ),
	( 'IL', 'ILLINOIS' ),
	( 'IN', 'INDIANA' ),
	( 'IA', 'IOWA' ),
	( 'KS', 'KANSAS' ),
	( 'KY', 'KENTUCKY' ),
	( 'LA', 'LOUISIANA' ),
	( 'ME', 'MAINE' ),
	( 'MD', 'MARYLAND' ),
	( 'MA', 'MASSACHUSETTS' ),
	( 'MI', 'MICHIGAN' ),
	( 'MN', 'MINNESOTA' ),
	( 'MS', 'MISSISSIPPI' ),
	( 'MO', 'MISSOURI' ),
	( 'MT', 'MONTANA' ),
	( 'NE', 'NEBRASKA' ),
	( 'NV', 'NEVADA' ),
	( 'NH', 'NEW HAMPSHIRE' ),
	( 'NJ', 'NEW JERSEY' ),
	( 'NM', 'NEW MEXICO' ),
	( 'NY', 'NEW YORK' ),
	( 'NC', 'NORTH CAROLINA' ),
	( 'ND', 'NORTH DAKOTA' ),
	( 'OH', 'OHIO' ),
	( 'OK', 'OKLAHOMA' ),
	( 'OR', 'OREGON' ),
	( 'PA', 'PENNSYLVANIA' ),
	( 'RI', 'RHODE ISLAND' ),
	( 'SC', 'SOUTH CAROLINA' ),
	( 'SD', 'SOUTH DAKOTA' ),
	( 'TN', 'TENNESSEE' ),
	( 'TX', 'TEXAS' ),
	( 'UT', 'UTAH' ),
	( 'VT', 'VERMONT' ),
	( 'VA', 'VIRGINIA' ),
	( 'WA', 'WASHINGTON' ),
	( 'WV', 'WEST VIRGINIA' ),
	( 'WI', 'WISCONSIN' );
DELIMITER //

CREATE PROCEDURE AddGuestByPartyId(
    IN newPartyId int,
    IN firstName varchar(255),
    IN lastName varchar(255)
)

BEGIN
    DECLARE newDietId int;

    INSERT INTO Diet (under18, notes, restriction_mask) VALUES (DEFAULT, DEFAULT, DEFAULT);
    set newDietId=LAST_INSERT_ID();

    INSERT INTO Guest (first_name, last_name, diet_id, party_id) VALUES (firstName, lastName, newDietId, newPartyId);
END//

CREATE PROCEDURE AddGuestByPartyKey(
  IN partyKey char(8),
  IN firstName varchar(255),
  IN lastName varchar(255)
)

BEGIN
    DECLARE newPartyId int;

    set newPartyId = (select party_id from Party where party_key=partyKey);

    CALL AddGuestByPartyId(newPartyId, firstName, lastName);
END//


CREATE PROCEDURE AddParty (
  IN lastName    varchar(255),
  IN firstName   varchar(255),
  IN addressOne     varchar(512),
  IN addressTwo     varchar(512),
  IN addressCity         varchar(25),
  IN stateAbbrev char(2),
  IN addressZip          bigint,
  IN partyEmail        varchar(255),
  IN partyPhone        varchar(10),
  IN guestNumber int
)

BEGIN
  DECLARE stateId int;
  DECLARE newUUID char(8);
  DECLARE newPartyId int;

  select stateAbbrev;

  select * from State;

  select state_id into stateId from State where abbrev=stateAbbrev;

  set newUUID=substring(UUID(), 1, 8);

  while ((select count(*) from Party where party_key=newUUID) > 0) do
    set newUUID=substring(UUID(), 1, 8);
  end while;

  insert into Party
    (party_key, name, address1, address2, city, state_id, guest_number, zip, email, phone)
    values
    (newUUID, lastName, addressOne, addressTwo, addressCity, stateId, guestNumber, addressZip, partyEmail, partyPhone);
  set newPartyId=LAST_INSERT_ID();

  CALL AddGuestByPartyId(newPartyId, firstName, lastName);
END//
DELIMITER ;
CALL AddParty (
  "Opdahl", "Jon", "634 Westgate St", "Apt 53", "Iowa City", "IA", 52246, "jopdahl12@gmail.com", NULL, 1
);
