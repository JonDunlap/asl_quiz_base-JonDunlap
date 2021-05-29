/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Header from './header';
import Login from './login';
import QuizList from './quiz/list';
import Landing from './quiz/landing';
import QuizDetail from './quiz/detail';
import QuizForm from './forms/quiz';
import QuestionDetail from './question/detail';
import QuestionForm from './forms/question';
import ChoiceForm from './forms/choice';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <Route path='/' component={Header} />
          <main className={styles.main__container}>
            <Route path='/' exact component={Landing} />
            <Route
              path='(/login|/github/callback|/github/token)'
              exact
              component={Login}
            />
            <Route path='/admin/quizzes' exact component={QuizList} />
            <Switch>
              <Route path='/admin/quizzes/new' exact component={QuizForm} />
              <Route
                path='/admin/quizzes/edit/:id'
                exact
                component={QuizForm}
              />
              <Route path='/admin/quizzes/:id' exact component={QuizDetail} />
            </Switch>
            <Switch>
              <Route
                path='/admin/questions/new'
                exact
                component={QuestionForm}
              />
              <Route
                path='/admin/questions/edit/:id'
                exact
                component={QuestionForm}
              />
              <Route
                path='/admin/questions/:id'
                exact
                component={QuestionDetail}
              />
            </Switch>
            <Switch>
              <Route path='/admin/choices/new' exact component={ChoiceForm} />
              <Route
                path='/admin/choices/edit/:id'
                exact
                component={ChoiceForm}
              />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
