CREATE TABLE `company` (
  `id` integer PRIMARY KEY,
  `name` TEXT
);

CREATE TABLE `role` (
  `id` integer PRIMARY KEY,
  `roleName` TEXT
);

CREATE TABLE `user` (
  `id` integer PRIMARY KEY,
  `username` TEXT,
  `email` TEXT,
  `password` TEXT,
  `roleId` integer,
  `companyId` integer,
  FOREIGN KEY(companyId) REFERENCES company(id),
  FOREIGN KEY(roleId) REFERENCES role(id)
);

CREATE TABLE `branch` (
  `id` integer PRIMARY KEY,
  `name` TEXT,
  `location` TEXT,
  `companyId` TEXT,
  FOREIGN KEY(companyId) REFERENCES company(id)
);

CREATE TABLE `item` (
  `id` integer PRIMARY KEY,
  `name` TEXT,
  `branchId` integer,
  FOREIGN KEY(branchId) REFERENCES branch(id)
);

CREATE TABLE `permission` (
  `id` integer PRIMARY KEY,
  `permission` TEXT,
  `roleId` integer,
  FOREIGN KEY(roleId) REFERENCES role(id)
);

CREATE TABLE `mqtt_group` (
  `id` integer PRIMARY KEY,
  `groupKey` varchar(255),
  `branchId` integer,
  FOREIGN KEY(branchId) REFERENCES branch(id)
);

CREATE TABLE `mqtt_topic` (
  `id` integer PRIMARY KEY,
  `topic` varchar(255),
  `qos` integer,
  `last_payload` text,
  `last_updated` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `itemId` integer,
  FOREIGN KEY(itemId) REFERENCES item(id)
);

CREATE TABLE `reading` (
  `id` integer PRIMARY KEY,
  `itemId` integer,
  `reading_value` TEXT,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY(itemId) REFERENCES item(id)
);

INSERT INTO company (name)
VALUES ('Eco Ltd'),
       ('Company Two');

INSERT INTO role (roleName)
VALUES ('user'),
       ('admin');

INSERT INTO user (username, email, password, roleId, companyId)
VALUES ('Bob', 'bob@bob.co.uk', 'secret', (SELECT id FROM role WHERE roleName = 'admin'), (SELECT id from company WHERE name = 'Company Two')),
       ('Dave', 'dave@test.co.uk', 'password123', (SELECT id FROM role WHERE roleName = 'user'), (SELECT id from company WHERE name = 'Eco Ltd')),
       ('test', 'test@test.com', '$2b$10$AWFvYN2eo4r14amPHZA1Suvtnr9kC2W.7Ldm9HtPzdwWfjwIp4wUa', (SELECT id FROM role WHERE roleName = 'admin'), (SELECT id from company WHERE name = 'Eco Ltd'));


INSERT INTO branch (name, location, companyId)
VALUES ('Eco Bristol', 'Gloucester Road', (SELECT id from company WHERE name = 'Eco Ltd')),
       ('Eco Bath', 'Bath', (SELECT id from company WHERE name = 'Eco Ltd')),
       ('Company Two Ltd', 'Bristol', (SELECT id from company WHERE name = 'Company Two'));

INSERT INTO item (name, branchId)
VALUES ('testPico', (SELECT id from branch WHERE name = 'Eco Bristol')),
       ('test-pico-7', (SELECT id from branch WHERE name = 'Eco Bristol'));

INSERT INTO mqtt_group (groupKey, branchId)
VALUES ('eco-bristol', (SELECT id from branch WHERE name = 'Eco Bristol'));

INSERT INTO mqtt_topic (topic, qos, last_payload, itemId) 
VALUES ('test-pico-7', 0, '', (SELECT id FROM item WHERE name = 'test-pico-7'))
