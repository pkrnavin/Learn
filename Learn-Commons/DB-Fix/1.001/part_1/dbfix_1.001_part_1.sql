

-- 2018-11-13

-- LearnUI DB-Fix to adds; TODO: verfification to add 

-- 2018-09-04

-- below query, to run, in DATABASE, of build adds 

-- to create DATABASE 
CREATE DATABASE open_learning;


-- 2018-09-11

-- user master table 
CREATE TABLE user_master (
  user_id SERIAL PRIMARY KEY,
  user_name varchar(100) NOT NULL,
  full_name varchar(100) NOT NULL,
  password varchar(30) NOT NULL,
  created_by integer NOT NULL,
  created_on timestamp without time zone NOT NULL,
  modified_by integer,
  modified_on timestamp without time zone
);
-- unique index column `user_name` 
CREATE UNIQUE INDEX idx_user_master_user_name ON user_master (user_name);

-- INSERT VALUES 
INSERT INTO user_master (user_name, full_name, password, created_by, created_on) 
VALUES ('admin', 'Admin', 'admin', 1, now()), 
('pkrnavin', 'Navin Bhaskaran', 'smith', 1, now()), 
('navinb', 'Navin Bhaskaran', 'welcome', 1, now());


DESCRIBE user_master;

SELECT * 
FROM user_master;


-- 2018-10-16

-- TODO: to verify 
-- student details, CREATE TABLE to adds, 
CREATE TABLE lu_student_details (
  student_id SERIAL PRIMARY KEY,
  user_id integer NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  father_name varchar(100) NOT NULL,
  mother_name varchar(100) NOT NULL,
  address varchar(300) NOT NULL,
  email_id varchar(100) NOT NULL,
  email_verified_on timestamp without time zone,
  phone_number varchar(30) NOT NULL,
  nationality varchar(100) NOT NULL,
  date_of_birth timestamp without time zone NOT NULL,
  transport varchar(30) NOT NULL CHECK (transport IN ('INSTITUTE_VEHICLE', 'SELF')),
  interests varchar(100) NOT NULL,
  created_by integer NOT NULL,
  created_on timestamp without time zone NOT NULL,
  modified_by integer,
  modified_on timestamp without time zone
);
-- index column `user_id`
CREATE INDEX idx_lu_student_details_user_id ON lu_student_details (user_id);


-- 2018-11-04

/* history table, below to add; 
 * `Appedo` database sql in full file path `D:\Learn\from Office\from Softsmith\LaptopAdds\AppedoOpenSource\db_backup.sql`, below to adds tried 
*/
-- to CREATE TABLE LIKE `lu_student_details` without CONSTRAINTS, the following thinks PRIMARY KEY, FOREIGN KEY, INDEX for history table
CREATE TABLE lu_student_details_history AS 
SELECT '' AS operation, null::timestamp without time zone AS done_on, * 
FROM lu_student_details
WHERE 1 = 0;

-- trigger function to add 
CREATE FUNCTION trg_fn_lu_student_details_history() RETURNS trigger 
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        -- the new modified record values, to insert for the operation  
	    INSERT INTO lu_student_details_history SELECT TG_OP, now(), NEW.*;
		RETURN NEW;
	ELSIF (TG_OP = 'DELETE') THEN
	    -- old record values, to insert for the operation 
	    INSERT INTO lu_student_details_history SELECT TG_OP, now(), OLD.*;
		RETURN OLD;
	END IF;
END;
$$;

-- trigger to create to add 
CREATE TRIGGER lu_student_details_trigger 
  AFTER INSERT OR DELETE OR UPDATE ON lu_student_details 
  FOR EACH ROW 
  EXECUTE PROCEDURE trg_fn_lu_student_details_history();

