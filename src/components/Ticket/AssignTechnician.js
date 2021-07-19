/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import authAxios from 'src/utils/axios';
import {
  Card,
  Typography,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { userType } from 'src/utils/Constants';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function AssignTechnician({ ticketId }) {
  const navigate = useNavigate();
  const [technicians, setTechnician] = useState([]);
  const fetchTechnicians = async () => {
    const { data } = await authAxios.get(
      `/users?userType=${userType.Technician}`
    );
    setTechnician(data);
  };

  const schema = Yup.object({
    AssignedTo: Yup.string().default('').required()
  }).required();

  useEffect(() => {
    fetchTechnicians();
  }, []);

  return (
    <Card>
      <Typography gutterBottom variant="h1" component="h2" color="black" p={3}>
        Ticket Assignment
      </Typography>
      <Container maxWidth="md">
        <Formik
          initialValues={schema.cast()}
          onSubmit={async (values) => {
            const user = technicians.find(tech => tech.id === values.AssignedTo)
            const { status } = await authAxios.put(
              `/tickets/${ticketId}`,
              values
            );
            if (status === 200) {
              await authAxios.post(`https://africaistalkingbulksmsapi.azurewebsites.net/api/BulkSms?code=${process.env.REACT_APP_API_CODE}`, {
                key: process.env.REACT_APP_API_KEY,
                username: process.env.REACT_APP_USERNAME,
                to: user.Phone,
                message: ' A ticket has been assigned to you. Please log into the portal'
              })
              navigate('/manager/tickets', { replace: true });
            }
          }}
        >
          {({ handleChange, handleSubmit, isSubmitting, values }) => (
            <form onSubmit={handleSubmit}>
              <Box mt={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Technician
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={values.AssignedTo}
                    name="AssignedTo"
                    onChange={handleChange}
                    label="Technician"
                  >
                    {technicians.map((category) => (
                      <MenuItem value={category.id}>
                        {category.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Card>
  );
}
