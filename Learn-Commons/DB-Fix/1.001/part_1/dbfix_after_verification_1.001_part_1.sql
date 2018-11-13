

-- 2018-11-13

-- LearnUI DB-Fix after verification 

-- below to add, of before verfication start 
SELECT 'DB-Fix After Verification 1.001 Part 1; Start';

-- Note: postgresql command prompt to run execute 
-- to list databases  
\l

-- to change connect database 
\c open_learning 

-- to list tables 
\dt

-- describe `user_master` table 
\d+ user_master

-- below count total rows inserted 
SELECT 'Count total rows available in `user_master`: '||count(*) AS count 
FROM user_master;


-- describe `lu_student_details` table 
\d+ lu_student_details

-- describe `lu_student_details_history` table 
\d+ lu_student_details_history

-- trigger function, to display 
\df+ trg_fn_lu_student_details_history

-- below verification to add, of trigger available, mapping table name, to gets 
SELECT pt.tgrelid, pt.tgname AS trigger_name, 
  pc.oid, pc.relname AS mapping_table_name 
FROM pg_trigger pt 
INNER JOIN pg_class pc ON pc.oid = pt.tgrelid 
  AND pt.tgname = 'lu_student_details_trigger';
  
-- below to add, of After verfication complete 
SELECT 'DB-Fix After Verification 1.001 Part 1; Complete';
