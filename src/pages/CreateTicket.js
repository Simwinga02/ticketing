import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CreateTicketForm from './createTicketForm';

export default function CreateTicket() {
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
            <CreateTicketForm />
          </Box>
        </Container>
      </Box>
    </>
  );
}
