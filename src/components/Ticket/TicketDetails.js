/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import authAxios from 'src/utils/axios';
import {
  Card,
  Typography,
  CardContent,
  Grid,
  Container,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { TicketPriority } from 'src/utils/Constants';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function TicketDetails({ ticketId }) {
  const [ticket, setTicket] = useState();
  const [technician, setTechnician] = useState([]);
  const fetchTicket = async () => {
    const { data } = await authAxios.get(`/tickets/${ticketId}`);
    setTicket(data);
  };

  const fetchTechnicians = async () => {
    const { data } = await authAxios.get('/users');
    setTechnician(data);
    console.log('heeeeeeel', JSON.stringify(data));
  };

  const schema = Yup.object({
    AssignedTo: Yup.string().default('').required()
  }).required();

  useEffect(() => {
    fetchTicket();
    fetchTechnicians();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <Card>
              <Typography gutterBottom variant="h1" component="h2">
                Ticket Information
              </Typography>
              <CardContent>
                <Typography variant="body2" color="black" component="p">
                  Ticket Status:
                  {ticket?.status}
                </Typography>
                <Typography variant="body2" color="black" component="p">
                  Organization Name:
                  {ticket?.orgId.orgName}
                </Typography>
                <Typography variant="body2" color="black" component="p">
                  Organization Address:
                  {ticket?.orgId.Address}
                </Typography>
                <Typography variant="body2" color="black" component="p">
                  Organization Contant:
                  {ticket?.orgId.Phone}
                  {ticket?.orgId.email}
                </Typography>
                <Typography variant="body2" color="black" component="p">
                  Ticket Priority:
                  {TicketPriority[ticket?.Priority]}
                </Typography>
                <Typography variant="body2" color="black" component="p">
                  Ticket Category:
                  {ticket?.category.name}
                </Typography>
                <Typography variant="body2" color="black" component="p">
                  Ticket Ref#:
                  {ticket?.Ref}
                </Typography>
                <Typography variant="body2" color="black" component="p">
                  Ticket discription:
                  {ticket?.description}
                </Typography>
                <Typography variant="body2" color="black" component="p">
                  Assigned TO:
                  {ticket?.AssignedTo?.First_Name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} md={3} xs={12}>
            <Card>
              <Typography gutterBottom variant="h1" component="h2">
                Ticket Assignment
                <Container maxWidth="md">
                  <Formik
                    initialValues={schema.cast()}
                    onSubmit={async (values) => {
                      console.log(values);
                      const { status } = await authAxios.post('/tickets', {
                        ...values,
                        // Ref: refNumber.toString(),
                        status: 'Pending'
                      });
                      //   if (status === 200) {
                      //     navigate('/app/tickets', { replace: true });
                      //   }
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
                              {technician.map((category) => (
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
                            Create Ticket
                          </Button>
                        </Box>
                      </form>
                    )}
                  </Formik>
                </Container>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
