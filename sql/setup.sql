DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  questions TEXT NOT NULL,
  correct_answers TEXT NOT NULL,
  incorrect_answer1 TEXT NOT NULL,
  incorrect_answer2 TEXT NOT NULL,
  incorrect_answer3 TEXT NOT NULL
  );