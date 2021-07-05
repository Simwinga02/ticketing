import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { core } from 'src/utils/axios';

import { AuthContext } from 'src/utils/context/auth';
import { useContext, useState, useEffect } from 'react';

const Docate = () => {
  const navigate = useNavigate();
  const [loading, IsLoading] = useState(false);
  const { setSession } = useContext(AuthContext);
  const [datas, setData] = useState(false);
  const [isInitialised, setInitialised] = useState(false);

  const schema = Yup.object().shape({
    issue: Yup.string().max(255).required('Issue is required'),
    customerName: Yup.string().max(255).required('Customer FullName is required'),
    customerEmail: Yup.string().max(255).required('Email is required'),
    customerOrg: Yup.string().max(255).required('Organization/Nil is required'),
    customerPhone: Yup.string().max(255).required('Phone Number is required'),
    assignedTo: Yup.string().max(255).required('Assigned To is required'),
    status: Yup.string().max().required('Status is required'),
    description: Yup.string().max(255).required('Description on Duty is required'),
    customerAddress: Yup.string().max(255).required('Customer Address is required')
  });
  const initializer = async () => {
    const { data } = await core.get('/users/me');

    setData(data.Man_Number);
    setInitialised(true);
  };
  useEffect(() => {
    initializer();
  }, []);
  
  if (loading) {
    return <h1>loading.....</h1>;
  }

  return (
    <>
      <Helmet>
        <title>Create Faults | Fibrecom </title>
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
              const { data, status } = await core.post('/tickets', {
                issue: values.issue,
                customerName: values.customerName,
                customerEmail: values.customerEmail,
                customerOrg: values.customerOrg,
                customerPhone: values.customerPhone,
                assignedTo: values.assignedTo,
                status: values.status,
                description: values.description,
                customerAddress: values.customerAddress
              });
              if (status === 200) {
                setSession(data);
                localStorage.setItem('token', data.jwt);
                navigate('/app/complaints', { replace: true });
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
                  <Typography color="black" variant="h1">
                    Create new Ticket
                  </Typography>
                  <Typography color="gray" gutterBottom variant="h3">
                    Fibrecom Limited
                  </Typography>
                </Box>
                {/* isuue */}
                <TextField
                  error={Boolean(touched.issue && errors.issue)}
                  fullWidth
                  helperText={touched.issue && errors.issue}
                  label="Enter Issue"
                  margin="normal"
                  name="issue"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.issue}
                  variant="outlined"
                />
                {/* Name */}
                <TextField
                  error={Boolean(touched.customerName && errors.customerName)}
                  fullWidth
                  helperText={touched.customerName && errors.customerName}
                  label="Enter Customer Name"
                  margin="normal"
                  name="customerName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.customerName}
                  variant="outlined"
                />
                {/* customer email */}
                <TextField
                  error={Boolean(touched.customerEmail && errors.customerEmail)}
                  fullWidth
                  helperText={touched.customerEmail && errors.customerEmail}
                  label="Enter Custoemr Email"
                  margin="normal"
                  name="customerEmail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.customerEmail}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.customerOrg && errors.customerOrg)}
                  fullWidth
                  helperText={touched.customerOrg && errors.customerOrg}
                  label="Customer Organization/Nil"
                  margin="normal"
                  name="customerOrg"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.customerOrg}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.customerPhone && errors.customerPhone)}
                  fullWidth
                  helperText={touched.customerPhone && errors.customerPhone}
                  label="Enter Customer Phone number"
                  margin="normal"
                  name="customerPhone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.customerPhone}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.assignedTo && errors.assignedTo)}
                  fullWidth
                  helperText={touched.assignedTo && errors.assignedTo}
                  label="Enter Assigned to"
                  margin="normal"
                  name="assignedTo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.assignedTo}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.status && errors.status)}
                  fullWidth
                  helperText={touched.status && errors.status}
                  label="Enter Status"
                  margin="normal"
                  name="status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.status}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Enter Status"
                  margin="normal"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.description}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(
                    touched.customerAddress && errors.customerAddress
                  )}
                  fullWidth
                  helperText={touched.customerAddress && errors.customerAddress}
                  label="Enter Customer Address"
                  margin="normal"
                  name="customerAddress"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.customerAddress}
                  variant="outlined"
                />
                {/* Ends here */}

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
                    Create Ticket
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

export default Docate;
