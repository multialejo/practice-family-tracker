CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL
);

INSERT INTO users (name, color)
VALUES ('Wido', 'yellow'), ('Jack', 'red'),('Alejo', 'green');


-- One to One --
-- Para ampliar la informacion de una "tabla principal" --

INSERT INTO student (first_name, last_name)
VALUES ('Angela', 'Yu');
INSERT INTO contact_detail (id, tel, address)
VALUES (1, '+123456789', '123 App Brewery Road');


-- Many to Many --

CREATE TABLE visited_countries (
  user_id INTEGER REFERENCES users(id),
  country_id INTEGER REFERENCES countries(id),
  PRIMARY KEY (user_id, country_id)
);

-- Data --

INSERT INTO visited_countries (user_id, country_id ) VALUES (1, 12), (1, 20);
INSERT INTO visited_countries (user_id ,country_id) VALUES (2, 23), (2, 25);
INSERT INTO visited_countries (user_id ,country_id) VALUES (3, 16), (3, 22);


-- Join --

SELECT country_code, country_name, name, color
FROM visited_countries 
JOIN countries ON countries.id = visited_countries.country_id
JOIN users ON users.id = visited_countries.user_id;

SELECT country_code
FROM visited_countries 
JOIN countries ON countries.id = visited_countries.country_id
WHERE user_id = 2;


JOIN users ON users.id = visited_countries.user_id;


-- ALIAS --

SELECT student.id AS id, first_name, last_name, title
FROM enrollment 
JOIN student ON student.id = enrollment.student_id
JOIN class ON class.id = enrollment.class_id;


SELECT s.id AS id, first_name, last_name, title
FROM enrollment AS e
JOIN student AS s ON s.id = e.student_id
JOIN class AS c ON c.id = e.class_id;


SELECT s.id AS id, first_name, last_name, title
FROM enrollment e
JOIN student s ON s.id = e.student_id
JOIN class c ON c.id = e.class_id;


-- EXERCISE SOLUTION AND SETUP --

DROP TABLE IF EXISTS visited_countries, users;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(15) UNIQUE NOT NULL,
color VARCHAR(15)
);

CREATE TABLE visited_countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) NOT NULL,
user_id INTEGER REFERENCES users(id)
);

INSERT INTO users (name, color)
VALUES ('Angela', 'teal'), ('Jack', 'powderblue');

INSERT INTO visited_countries (country_code, user_id)
VALUES ('FR', 1), ('GB', 1), ('CA', 2), ('FR', 2 );

SELECT *
FROM visited_countries
JOIN users
ON users.id = user_id;