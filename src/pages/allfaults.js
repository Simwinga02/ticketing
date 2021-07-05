import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { core } from 'src/utils/axios';
import { useEffect, useState } from 'react';

const Complaints = () => {
  const [loading, IsLoading] = useState(false);
  const [datas, setData] = useState([]);

  const fetchCrimes = async () => {
    IsLoading(true);
    const { data } = await core.get('/tickets');
    setData(data);
    IsLoading(false);
  };

  useEffect(() => {
    fetchCrimes();
  }, []);

  const ListData = datas.map((data) => (
    <tr key={data.id}>
      <td>{data.id}</td>
      <td>{data.Issue}</td>
      <td>{data.customerName}</td>
      <td>{data.customerEmail}</td>
      <td>{data.customerOrg}</td>
      <td>{data.customerPhone}</td>
      <td>{data.assignedTo}</td>
      <td>{data.status}</td>
      <td>{data.Discription}</td>
    </tr>
  ));
  console.log(ListData, loading);

  // if (loading) {
  //   return <h1>loading.....</h1>;
  // }
  return (
    <>
      <Helmet>
        <title>Faults || Fibrecom</title>
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
              <h2>Veiw Faults in the System</h2>

              <table className="table mt-5 text-center">
                <thead Class="thread-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Issue </th>
                    <th scope="col">Customer Name </th>
                    <th scope="col">Customer Email</th>
                    <th scope="col">Customer Organization</th>
                    <th scope="col">Customer Phone#</th>
                    <th scope="col">Assigned To</th>
                    <th scope="col">Status</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody id={datas.id}>{ListData}</tbody>
              </table>
            </fragment>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Complaints;
