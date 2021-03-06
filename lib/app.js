const express = require('express');
const Quiz = require('./models/Quiz');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/quizzes', async(req, res, next) => {
  try {
    const createdQuiz = await Quiz.insert(req.body);
    res.send(createdQuiz);
  }
  catch(error) {
    next(error);
  }
});

app.get('/api/quizzes', async(req, res, next) => {
  try {
    const response = await Quiz.getAllQuizzes();
    res.send(response);
  }
  catch(error) {
    next(error);
  }
});

app.get('/api/quizzes/:id', async(req, res, next) => {
  try {
    const response = await Quiz.getQuizById(req.params.id);
    res.send(response);
  }
  catch(error) {
    next(error);
  }
});

app.delete('/api/quizzes/:id', async(req, res, next) => {
  try {
    const response = await Quiz.deleteQuiz(req.params.id);
    res.send(response);
  }
  catch(error) {
    next(error);
  }
})

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

