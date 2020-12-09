CREATE DATABASE expressTutorials;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--expresstutorials=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--random_user create

INSERT INTO users (user_name, user_email, user_password) VALUES ('shiv', 's20@gmail.com', 'pass');