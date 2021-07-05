import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { core } from 'src/utils/axios';
import { useEffect, useState } from 'react';

const AccountDetails = () => {
  const [loading, IsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchMe = async () => {
    IsLoading(true);
    const { data } = await core.get('/users/me');

    setUsers(data);
    IsLoading(false);
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const ListData = [
    <tr key={users.id}>
      <td>{users.id}</td>
      <td>{users.username}</td>
      <td>{users.email}</td>
      <td>{users.First_Name}</td>
      <td>{users.Last_Name}</td>
      <td>{users.Man_Number}</td>
      <td>{users.userType}</td>
    </tr>
  ];

  console.log(ListData);

  if (loading) {
    return <h1>loading.....</h1>;
  }
  return (
    <>
      <Helmet>
        <title>Profile || Fibrecom</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <fragment>
              <h2>My Profile</h2>

              <table className="table mt-5 text-center">
                <thead>
                  <tr>
                    <th>User ID </th>
                    <th>User Name </th>

                    <th>Email </th>

                    <th>First Name</th>

                    <th>Last Name</th>

                    <th>Employee Number</th>

                    <th>User Type</th>
                  </tr>
                </thead>
                <tbody id={users.id}>{ListData}</tbody>
              </table>
            </fragment>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AccountDetails;
