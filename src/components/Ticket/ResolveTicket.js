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

export default function ResolveTicket({ ticketId }) {
  const navigate = useNavigate();

  const schema = Yup.object({
    status: Yup.string().default('').required()
  }).required();

  return (
    <Card>
      <Typography gutterBottom variant="h1" component="h2" color="black" p={3}>
        Resolve Ticket
      </Typography>
      <Container maxWidth="md">
        <Formik
          initialValues={schema.cast()}
          onSubmit={async (values) => {
            console.log(values);
            const { status } = await authAxios.put(
              `/tickets/${ticketId}`,
              values
            );
            if (status === 200) {
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
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Blocked">Blocked</MenuItem>
                    <MenuItem value="InProgress">InProgress</MenuItem>
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
