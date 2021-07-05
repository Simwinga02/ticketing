import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
  Card,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { core } from 'src/utils/axios';

import { AuthContext } from 'src/utils/context/auth';
import { useContext, useState, useEffect } from 'react';

const CreateTicketForm = () => {
  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);
  const [orgs, setOrgs] = useState([]);
  const [cats, setCats] = useState([]);
  const refNumber = Math.floor(100000 + Math.random() * 900000);
  const fetchCats = async () => {
    const { data } = await core.get('​/tickets');
    setCats(data);
  };
  const fetchOrgs = async () => {
    const { data } = await core.get('/customers');
    setOrgs(data);
  };

  useEffect(() => {
    fetchCats();
    fetchOrgs();
  }, []);

  const schema = Yup.object().shape({
    category: Yup.string().default('').required('Email is required'),
    orgId: Yup.string().default('').required('Organization/Nil is required'),
    description: Yup.string().default('').required(),
    Priority: Yup.number().default(1).required()
  });

  return (
    <>
      <Card>
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
                  ...values,
                  Ref: refNumber.toString(),
                  status: 'Pending'
                });
                if (status === 200) {
                  navigate('/app/tickets', { replace: true });
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
                    <Typography color="black" variant="h3">
                      REF Number:
                      {refNumber}
                    </Typography>
                  </Box>
                  {/* isuue */}
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Customer
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={values.orgId}
                      name="orgId"
                      onChange={handleChange}
                      label="Organization"
                    >
                      {orgs.map((org) => (
                        <MenuItem value={org.id}>{org.orgName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box mt={3}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={values.category}
                        name="category"
                        onChange={handleChange}
                        label="Age"
                      >
                        <MenuItem value={1}>Cut Fiber</MenuItem>
                        <MenuItem value={2}>Loss of Signal</MenuItem>
                        {/* {cats.map((category) => (
                        <MenuItem value={category.id}>{category.name}</MenuItem>
                      ))} */}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box mt={3}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Priority
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={values.Priority}
                        name="Priority"
                        onChange={handleChange}
                        label="Priority"
                      >
                        <MenuItem value={1}>High</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>Low</MenuItem>
                        {/* {cats.map((category) => (
                        <MenuItem value={category.id}>{category.name}</MenuItem>
                      ))} */}
                      </Select>
                    </FormControl>
                  </Box>
                  {/* Name */}
                  <TextField
                    error={Boolean(touched.description && errors.description)}
                    fullWidth
                    helperText={touched.description && errors.description}
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    label="Description"
                    margin="normal"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
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
                      Create Ticket
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Card>
    </>
  );
};

export default CreateTicketForm;
