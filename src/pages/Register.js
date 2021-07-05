import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography
} from '@material-ui/core';
import { AuthContext } from 'src/utils/context/auth';
import { useContext } from 'react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);
  const schema = Yup.object()
    .shape({
      First_Name: Yup.string().default('').required('First name is required'),
      Last_Name: Yup.string().required('Last name is required'),
      Man_Number: Yup.string().default('').required('Employee ID is required'),
      password: Yup.string().default('').required('password is required'),
      userType: Yup.string().default('').required('UserType is required'),
      username: Yup.string().default('').required('Phone Number is required'),
      email: Yup.string()
        .email('Must be Employee email')
        .max(255)
        .required('Employee email is required')
    })
    .required();
  return (
    <>
      <Helmet>
        <title>Register | Fibrecom</title>
      </Helmet>
      <Box
        md={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="md">
          <Formik
            initialValues={schema.cast()}
            onSubmit={async (values) => {
              console.log(values);
              const { data, status } = await axios.post(
                '/auth/local/register',
                {
                  First_Name: values.First_Name,
                  Last_Name: values.Last_Name,
                  Man_Number: values.Man_Number,
                  password: values.password,
                  confirmed: 'true',
                  userType: values.userType,
                  username: values.username,
                  role: 'Authenticated',
                  email: values.email
                }
              );
              if (status === 200) {
                setSession(data);
                localStorage.setItem('token', data.jwt);
                navigate('/admin/register', { replace: true });
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
                  <Typography color="textPrimary" variant="h2">
                    Create new Employee account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    create account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.First_Name && errors.First_Name)}
                  fullWidth
                  helperText={touched.First_Name && errors.First_Name}
                  label="Enter First Name"
                  margin="normal"
                  name="First_Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.First_Name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Last_Name && errors.Last_Name)}
                  fullWidth
                  helperText={touched.Last_Name && errors.Last_Name}
                  label="Enter Last_Name"
                  margin="normal"
                  name="Last_Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Last_Name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Man_Number && errors.Man_Number)}
                  fullWidth
                  helperText={touched.Man_Number && errors.Man_Number}
                  label="Enter Employee ID"
                  margin="normal"
                  name="Man_Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.Man_Number}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Enter password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.userType && errors.userType)}
                  fullWidth
                  helperText={touched.userType && errors.userType}
                  label="Enter userType  admin/helpdesk"
                  margin="normal"
                  name="userType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.userType}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Enter email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Enter Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />

                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Create an Account
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

export default Register;
