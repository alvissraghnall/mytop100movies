CREATE TABLE class.users (
  user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_mail VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);