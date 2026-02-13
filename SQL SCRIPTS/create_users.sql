USE nankinpress_db;

    CREATE TABLE users (
    user_id int,
    user_name varchar(31),
    user_username varchar(15),
    user_password varchar(31),
    user_mail varchar(31)
    );

    CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        user_id int NOT NULL,
        review_name varchar(100),
        review_type varchar(15),
        review_genre varchar(15),
        review_content text
    )