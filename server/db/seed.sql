INSERT INTO users (name, email, password_hash, role) VALUES
  ('Admin', 'admin@test.com', 'temp', 'admin'),
  ('Teacher One', 'teacher@test.com', 'temp', 'teacher'),
  ('Student One', 'student@test.com', 'temp', 'student');

INSERT INTO courses (title, created_by) VALUES ('B.Tech IT', 1);

INSERT INTO enrollments (user_id, course_id) VALUES (3, 1);

INSERT INTO subjects (course_id, title, teacher_id) VALUES (1, 'DBMS', 2);

INSERT INTO topics (subject_id, name) VALUES
  (1, 'Database Fundamentals'),         -- pages 1-5
  (1, 'ER Model'),                      -- pages 6-9
  (1, 'Relational Model and Keys'),     -- pages 10-13
  (1, 'SQL'),                           -- pages 14-21
  (1, 'Normalization'),                 -- pages 22-23
  (1, 'Transactions and Recovery'),     -- pages 24-26
  (1, 'Indexing'),                      -- pages 27-28
  (1, 'NoSQL Databases'),               -- pages 29-31
  (1, 'Database Models'),               -- pages 32-33
  (1, 'Clustering and Partitioning'),   -- pages 34-35
  (1, 'Scaling a Database'),            -- pages 36-47
  (1, 'CAP Theorem and Replication');   -- pages 48-49