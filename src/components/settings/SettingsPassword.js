import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import authAxios from 'src/utils/axios';
import * as Yup from 'yup';
import { Formik } from 'formik';

const SettingsPassword = () => {
  const navigate = useNavigate();
  const [initialised, setInitialised] = useState(false);
  
  const [session, setSession] = useState({
    setSession: (newSession) => {
      setSession({ ...session, newSession });
    }
  });
  const [id, setID] = useState(false);
  const [datas, setData] = useState([]);
  const initializer = async () => {
    const { data } = await authAxios.get('/users/me');

    setSession({
      ...session,
      user: data
    });
    setID(data.id);
    setData(data);
    setInitialised(true);
  };
  
  const schema = Yup.object()
    .shape({
      password: Yup.string().max(255).required('Password is required')
    })
    .required();

  useEffect(() => {
    initializer();
  }, []);

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={schema.cast()}
        validationSchema={schema}
        onSubmit={async (values) => {
          const { data } = await authAxios.put(`/users/${id}`, {
            password: values.password
          });

          if (status === 200) {
            setSession(data);
            localStorage.setItem('token', data.jwt);
            data.userType === 'officer'
              ? navigate('/app/complaints', { replace: true })
              : navigate('/admin/account', { replace: true });
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
              <Typography color="Gray" variant="h3">
                Change your account Password
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Set a New Password
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Enter New Password"
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
                Sign In
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default SettingsPassword;
