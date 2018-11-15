

-- 2018-11-16

-- below to add, DB-Fix runs 
SELECT 'DB-Fix 1.001 Part 2; Start';

 -- build adds, the table to INSERT respective module, version, DATETIME 
CREATE TABLE build_upgrade_master (
  id SERIAL PRIMARY KEY,
  module_name character varying(30) NOT NULL,
  version_number character varying(20) NOT NULL,
  upgraded_on timestamp without time zone NOT NULL
);

-- below to add, DB-Fix runs 
SELECT 'DB-Fix 1.001 Part 2; Complete';
