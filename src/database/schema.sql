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

-- TODO: INSERT TEST DATA
-- INSERT INTO user (name, email, password)
-- VALUES ('Bob', 'bob@bob.co.uk', 'secret'),
--        ('Dave', 'dave@test.co.uk', 'password123');

