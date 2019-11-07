import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

const App = props => {
  const authCoontext = useContext(AuthContext);
  return authCoontext.isAuth ? <Ingredients /> : <Auth />;
};

export default App;
