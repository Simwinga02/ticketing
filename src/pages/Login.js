import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Logo from '../components/Logo';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AuthContext } from 'src/utils/context/auth';
import { userType } from 'src/utils/Constants';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const schema = Yup.object()
    .shape({
      identifier: Yup.string()
        .email('Must be a valid Fibrecom email')
        .max(255)
        .required('Fibrecom email is required'),
      password: Yup.string().max(255).required('Password is required')
    })
    .required();

  function RouteTo(type) {
    switch (type) {
      case userType.Admin:
        navigate('/admin/tickets', { replace: true });
        break;
      case userType.HelpDesk:
        navigate('/app/tickets', { replace: true });
        break;
      case userType.Manager:
        navigate('/manager/tickets', { replace: true });
        break;
      case userType.Technician:
        navigate('/technician/tickets', { replace: true });
        break;

      default:
        break;
    }
  }

  return (
    <>
      <Helmet>
        <title>Login | Fibrecom</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={schema.cast()}
            validationSchema={schema}
            onSubmit={async (values) => {
              const { data, status } = await axios
                .post('/auth/local', {
                  identifier: values.identifier,
                  password: values.password
                })
                .catch(() => setError(true));
              if (status === 200) {
                setSession(data);
                localStorage.setItem('token', data.jwt);
                RouteTo(data.user.userType);
                window.location.reload();
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="Black" variant="h1">
                    <Logo />
                  </Typography>
                  <Typography color="Gray" variant="h3">
                    Fibrecom Limited
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Enter Details to sign up
                  </Typography>
                </Box>
                {error && (
                  <Box>
                    <Typography color="red">
                      Invalid Username or password
                    </Typography>
                  </Box>
                )}

                <TextField
                  error={Boolean(touched.identifier && errors.identifier)}
                  fullWidth
                  helperText={touched.identifier && errors.identifier}
                  label="Enter Fibrecom email"
                  margin="normal"
                  name="identifier"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values?.identifier}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Enter Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isSubmitting ? 'Loading' : 'Sign In'}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
