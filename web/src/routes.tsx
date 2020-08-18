import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignUpSuccess from './pages/SignUpSuccess';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';;



function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signup-success" exact component={SignUpSuccess} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;