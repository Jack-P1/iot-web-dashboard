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
  `reading` TEXT,
  `branchId` integer,
  FOREIGN KEY(branchId) REFERENCES branch(id)
);

CREATE TABLE `permission` (
  `id` integer PRIMARY KEY,
  `permission` TEXT,
  `roleId` integer,
  FOREIGN KEY(roleId) REFERENCES role(id)
);

INSERT INTO company (name)
VALUES ('Eco Ltd');

INSERT INTO role (roleName)
VALUES ('user'),
       ('admin');

INSERT INTO user (username, email, password, roleId, companyId)
VALUES ('Bob', 'bob@bob.co.uk', 'secret', (SELECT id FROM role WHERE roleName = 'admin'), (SELECT id from company WHERE name = 'Eco Ltd')),
       ('Dave', 'dave@test.co.uk', 'password123', (SELECT id FROM role WHERE roleName = 'user'), (SELECT id from company WHERE name = 'Eco Ltd'));

INSERT INTO branch (name, location, companyId)
VALUES ('Eco Bristol', 'Bristol', (SELECT id from company WHERE name = 'Eco Ltd'));

INSERT INTO item (name, reading, branchId)
VALUES ('testPico', 0, (SELECT id from branch WHERE name = 'Eco Bristol'));

-- TODO permissions test data
