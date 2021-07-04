<br>

# SQL Notes

---

<br>

---

## MySQL - The Basics - _[Fireship](https://youtu.be/Cz3WcZLRaWc)_

---

<br>

### Install SQL on Mac

---

<br>

- Install using homebrew or download installer

- To access a new mySQL install. you must log in with your username/password. default: `root`. add `-p` if you used a password.

<br>

```sql
> mysql -u yourusername -p
-- '-p' will prompt for password
> Enter password: ********
```

<br>

### `CREATE` a database

---

```sql
CREATE DATABASE yourdatabase
```

- verify database

```sql
SHOW DATABASES
```

<br>

🌈 - '_the more you know_'

<br>

🌈 - Install `SQLTools` plugin to help sql developement creation and management.

<br>

🌈 - a sql statement ends with a semicolon `;`

<br>

### Add a table to our new database

---

```sql
CREATE TABLE Users;
```

<br>

- uppercase words are SQL _`keywords`_ usually highlighted in purple, are technically not case-sensitive, but are done so by convention.

<br>

🌈 - create a comment using a double dash `--`

<br>

🌈 - with `SQLtools` add `-- @block` to a comment to be able to create block that will allow you to run statements individually 'so we don't have to run to a bunch of different files.'

<br>

### Create a column:

---

```sql
Column(
  identifiers | DATA-TYPE (required) | CONSTRAINTS (optional).
)
```

example:

```sql
-- @block
CREATE TABLE Users(
  id INT PRIMARY KEY AUTO_INCREMENT, -- a comment
  email VARCHAR(255) NOT NULL UNIQUE,
  bio TEXT,
  country VARCHAR(2)
)

```

- `id, email, bio,` - Column Identifiers.
- `INT` - _Data-Type_ - Integer, whole number.
- `PRIMARY KEY` - _Constraint_: each entry should be a unique identifier and !null.
- `AUTO_INCREMENT` - _Constraint_: automatically create a unique id for you. e.g. 1,2,3...
- `VARCHAR(255)` - _Constraint_: A character string that takes an integer argument to determine the max-length of that string. 255 is the largest possible integer that an 8-bit number can represent.
- `NOT NULL` - _Constraint_: requires a value.
- `UNIQUE` - _Constraint_: must be unique
- `TEXT` - _Data-Type_: Accepts a much larger string than VARCHAR(255), doesn't require a length argument.

<br>

🌈 - with SQLtools and the `--@block` we have the ability to execute this query we just made by pressing the play button. If you open up the plugin you can see the **`Schema`** it made from our table.

<br>

### `INSERT` - Create new records/rows.

---

```sql
-- @block
INSERT INTO Users (email, bio, country)
Values (
  'user@email.com',
  'something about me',
  'USA' -- throws error from our VARCHAR constraint
); -- semicolon!
```

- because we added `AUTO_INCREMENT` we do not need to specify a new id for this entry, mysql will auto create one.

- `INSERT` multiple rows separated by commas,

```sql
-- @block
INSERT INTO Users (email, bio, country)
Values
('user@email.com', 'something about me', 'US'),
('foo@bar.com', 'what?', 'US'),
('bonjour@france.com', 'huhhuhhuh', 'FR');
```

<br>

### `SELECT` - read data

---

- select everything from a table.

```sql
SELECT * FROM Users;
```

- select columns from a table. Ordered by id, Limit results

```sql
SELECT email, id FROM Users;
ORDER BY id ASC -- ascending
LIMIT 2;
```

```sql
SELECT email, id FROM Users;

WHERE country = 'US'
AND id > 1 -- ids greater than #1
AND email LIKE 'user%' -- and where emails start with 'user'

ORDER BY id ASC -- ascending
LIMIT 20;
```

<br>

- `LIKE` is a basic search feature, queries like these can become very slow.

<br>

- Use an `INDEX` to perform faster queries. slower writes and additional memory.

Create an `INDEX` of user emails:

```sql
-- @block
CREATE INDEX some_index ON Users(email);
```

<br>

### Create a RELATIONSHIP

---

- sql is a relational database. e.g. 1-to-1 or 1-to-many

we will set the primary key for this table, which is our Room's ID, then we make a row that we title 'owner_id' and set it as the 'Foreign Key', which will point to, or REFERENCE the ID row in the Users table.

```sql
-- @block
CREATE TABLE Rooms(
  id INT AUTO_INCREMENT, -- Room ID - 'Primary Key'
  street VARCHAR(255),
  owner_id INT NOT NULL, -- 'Foreign Key' - Owner ID
  PRIMARY KEY (id), -- Set Primary Key
  FOREIGN KEY (owner_id) REFERENCES Users(id) -- set Foreign Key name and point it to another piece of data.
)
```

🌈 - The database will not delete any related data Referenced as a 'FOREIGN KEY' in another table.

Setting Relational Data

```sql
INSERT INTO Rooms (owner_id, street)
VALUES
  (1, 'san diego sailboat'),
  (1, 'nantucket cottage'),
  (1, 'vail cabin'),
  (1, 'sf cardboard box');
```

### JOIN - relational query

query users who own rooms

![Type of SQL JOINs](https://learnsql.com/blog/learn-and-practice-sql-joins/2.png 'LearnSQL.com')

INNER JOIN - Rooms data combined with Users Data, only where a Room has a corresponding Users id.

LEFT JOIN - Returns all Users and corresponding Rooms data whether or not they have rooms data. If User doesn't have rooms data it will return null for that field.

RIGHT JOIN - Returns all Rooms and corresponding Users data, whether or not the rooms have an owner/users id.

OUTER JOIN - not supported in mySQL

```sql
-- @block
SELECT * FROM Users
INNER JOIN Rooms
ON Rooms.owner_id = Users.id;
```

🌈 - If there are naming conflicts when joining tables, SQL will automatically rename them. or rename them yourself using the `AS` keyword.

```sql
-- @block
SELECT
  Users.id AS user_id,
  Rooms.id AS room_id,
  email,
  street
FROM Users
INNER JOIN Rooms ON Rooms.owner_id = Users.id;
```

<br>

> "how do you model a User booking a room from another User"

Create a Bookings Table - have a check in time, guest id, and room id and set Primary and Foreign Keys.

```sql
-- @block
CREATE TABLE Bookings(
  id INT AUTO_INCREMENT,
  guest_id INT NOT NULL,
  room_id INT NOT NULL,
  check_in DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (guest_id) REFERENCES Users(id),
  FOREIGN KEY (room_id) REFERENCES Rooms(id)
)
```

Multiple foreign keys allows us to create more complex relationships.

```sql
-- @block Rooms a user has booked
SELECT
  guest_id,
  street
  check_in
FROM Bookings
INNER JOIN Rooms ON Rooms.owner_id = guest_id;
```

```sql
-- @block Guests who have stayed in a room.
SELECT
  room_id,
  guest_id,
  email
  bio
FROM Bookings
INNER JOIN Users ON Users.id = guest_id;
WHERE room_id = 2;
```
