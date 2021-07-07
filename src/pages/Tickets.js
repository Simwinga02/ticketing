/* eslint-disable import/no-named-as-default-member */
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
// eslint-disable-next-line import/no-named-as-default
import TicketResultList from 'src/components/Ticket/TicketResultList';
import authAxios from 'src/utils/axios';
import { AuthContext } from 'src/utils/context/auth';
import { userType } from 'src/utils/Constants';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchTickets = async () => {
    if (user.userType === userType.Technician) {
      const { data } = await authAxios.get(`/tickets?AssignedTo=${user.id}`);
      setTickets(data);
    } else {
      const { data } = await authAxios.get('/tickets');
      setTickets(data);
    }
  };
  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tickets | FiberCom</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          {/* <CustomerListToolbar /> */}
          <Box sx={{ pt: 3 }}>
            {/* <CustomerListResults customers={customers} /> */}
            <TicketResultList customers={tickets} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Tickets;
