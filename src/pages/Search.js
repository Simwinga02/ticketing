import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SearchTicketsToolbar from 'src/components/SearchTicket/searchTicketsToolbar';
import TicketResultList from 'src/components/Ticket/TicketResultList';

export default function Search() {
  const [tickets, setTickets] = useState([]);
  return (
    <>
      <Helmet>
        <title>Search | FiberCom</title>
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
          <SearchTicketsToolbar setTicket={setTickets} />
          <Box sx={{ pt: 3 }}>
            <TicketResultList customers={tickets} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
