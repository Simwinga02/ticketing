import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useParams } from 'react-router';
import TicketDetails from 'src/components/Ticket/TicketDetails';

export default function ViewTicket() {
  const { id } = useParams();

  console.log('this is the ID', id);
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
            <TicketDetails ticketId={id} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
