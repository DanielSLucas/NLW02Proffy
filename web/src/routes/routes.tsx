import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Route from './Route';

import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SignUpSuccess from '../pages/SignUpSuccess';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';;

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signup-success" exact component={SignUpSuccess} />
      
      <Route path="/landing" exact component={Landing} isPrivate/>
      <Route path="/study" component={TeacherList} isPrivate/>
      <Route path="/give-classes" component={TeacherForm} isPrivate/>
    </BrowserRouter>
  );
}

export default Routes;