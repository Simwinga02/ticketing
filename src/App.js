import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { AuthContext } from './utils/context/auth';
import { core } from './utils/axios';

axios.defaults.baseURL = 'http://localhost:1337';

const App = () => {
  const [isInitialised, setInitialised] = useState(false);
  const [session, setSession] = useState({
    setSession: (newSession) => {
      setSession({ ...session, newSession });
    }
  });

  const initializer = async () => {
    try {
      const { data } = await core.get('/users/me');
      setSession({
        ...session,
        user: data
      });
    } catch (error) {
      console.error(error);
    }
    setInitialised(true);
  };

  useEffect(() => {
    initializer();
  }, []);

  const routing = useRoutes(routes());
  console.log('the user', session?.user?.userType);
  if (!isInitialised) {
    return <h1>loading....</h1>;
  }
  return (
    <AuthContext.Provider value={session}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
