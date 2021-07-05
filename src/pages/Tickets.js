import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
// eslint-disable-next-line import/no-named-as-default
import TicketResultList from 'src/components/Ticket/TicketResultList';
import authAxios from 'src/utils/axios';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const fetchTickets = async () => {
    const { data } = await authAxios.get('/tickets');
    setTickets(data);
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
