/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import authAxios from 'src/utils/axios';
import {
  Card,
  Typography,
  CardContent,
  Grid,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import { TicketPriority, userType } from 'src/utils/Constants';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AssignTechnician from './AssignTechnician';
import { AuthContext } from 'src/utils/context/auth';

export default function TicketDetails({ ticketId }) {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState();
  const [technicians, setTechnician] = useState([]);
  const { user } = useContext(AuthContext);
  const fetchTicket = async () => {
    const { data } = await authAxios.get(`/tickets/${ticketId}`);
    setTicket(data);
  };

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
    fetchTicket();
    fetchTechnicians();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <Card>
              <Typography
                gutterBottom
                variant="h1"
                component="h2"
                color="black"
                p={5}
              >
                Ticket Information
              </Typography>
              <CardContent>
                <div>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Ticket Ref#:
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    margin="normal"
                    disabled
                    value={ticket?.Ref}
                    variant="outlined"
                  />
                </div>
                <div>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Ticket discription:
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    margin="normal"
                    disabled
                    value={ticket?.description}
                    variant="outlined"
                  />
                </div>
                <div>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Ticket Status
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    margin="normal"
                    disabled
                    value={ticket?.status}
                    variant="outlined"
                  />
                </div>

                <div>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Customer Name
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    // label="Customer Name"
                    margin="normal"
                    disabled
                    value={ticket?.orgId.orgName}
                    variant="outlined"
                  />
                </div>
                <div>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Organization Address:
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    margin="normal"
                    disabled
                    value={ticket?.orgId.Address}
                    variant="outlined"
                  />
                </div>
                <div>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Organization Contact:
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    margin="normal"
                    disabled
                    value={`${ticket?.orgId.Phone}, ${ticket?.orgId.email}`}
                    variant="outlined"
                  />
                </div>
                <div>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Ticket Priority:
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    margin="normal"
                    disabled
                    value={TicketPriority[ticket?.Priority]}
                    variant="outlined"
                  />
                </div>
                <div>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Ticket Category:
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    margin="normal"
                    disabled
                    value={ticket?.category.name}
                    variant="outlined"
                  />
                </div>

                <div>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Assigned TO:
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    margin="normal"
                    disabled
                    value={ticket?.AssignedTo?.First_Name}
                    variant="outlined"
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} md={3} xs={12}>
            {user.userType === userType.Manager ||
              (user.userType === userType.Admin && <AssignTechnician />)}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
