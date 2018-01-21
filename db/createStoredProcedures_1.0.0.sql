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
