const pool = require('../utils/pool');

module.exports = class Quiz {
  id;
  title;
  description;
  questions;
  correctAnswers;
  incorrectAnswer1;
  incorrectAnswer2;
  incorrectAnswer3;


  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.questions = row.questions;
    this.correctAnswers = row.correct_answers;
    this.incorrectAnswer1 = row.incorrect_answer1;
    this.incorrectAnswer2 = row.incorrect_answer2;
    this.incorrectAnswer3 = row.incorrect_answer3;
  }

  static async insert(quiz) {
    const { rows } = await pool.query(`
    INSERT INTO quizzes (title,
              description,
              questions,
              correct_answers,
              incorrect_answer1,
              incorrect_answer2,
              incorrect_answer3)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
    [quiz.title, quiz.description, quiz.questions, quiz.correctAnswers, quiz.incorrectAnswer1, quiz.incorrectAnswer2, quiz.incorrectAnswer3]
    );

    return new Quiz(rows[0]);
  }

  static async getAllQuizzes() {
    const { rows } = await pool.query(
      'SELECT * FROM quizzes',
    );

    return rows.map(quiz => new Quiz(quiz));
  }

  static async getQuizById(quizId) {
    const { rows } = await pool.query(`
      SELECT * FROM quizzes
      WHERE id = $1
    `, [quizId]);

    if(!rows[0]) return null;
    else return new Quiz(rows[0]);
  }

  static async deleteQuiz(quizId) {
    const { rows } = await pool.query(
      'DELETE FROM quizzes WHERE id=$1 RETURNING *',
      [quizId]
    );

    if(!rows[0]) return null;
    else return new Quiz(rows[0]);
  }
};
