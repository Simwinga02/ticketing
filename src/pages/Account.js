import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import authAxios from 'src/utils/axios';

const Accounts = () => {
  const [loading, IsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    IsLoading(true);
    const { data } = await authAxios.get('/users');
    setUsers(data);
    IsLoading(false);
  };
  console.log(users);
  useEffect(() => {
    fetchUsers();
  }, []);

  const ListData = users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.username}</td>

      <td>{user.email}</td>

      <td>{user.First_Name}</td>

      <td>{user.Last_Name}</td>

      <td>{user.Man_Number}</td>

      <td>{user.userType}</td>
    </tr>
  ));
  console.log(ListData);

  if (loading) {
    return <h1>loading.....</h1>;
  }
  return (
    <>
      <Helmet>
        <title>Accounts || Fibrecom</title>
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
              <h2>Employee Accounts</h2>

              <table className="table mt-5 text-center">
                <thead>
                  <tr>
                    <th>User ID </th>
                    <th>User Name </th>

                    <th>Email </th>

                    <th>First Name</th>

                    <th>Last Name</th>

                    <th>Man Number</th>

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

export default Accounts;
