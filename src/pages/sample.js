import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, Address, Age, Full_name, Fullname_witness, Nationality, Occurance_location, OffenseDetail, Offense_name, OfficerID, Phone_number, StatusID, Stolen_property, Witness_statement, crime_type, name };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];

const response = [
  {   
    Address: crimes.Address,
    Age: crimes.Age,
    Full_name: crimes.Full_name,
    Fullname_witness: crimes.Fullname_witness,
    Nationality: crimes.Nationality,
    Occurance_location: crimes.Occurance_location,
    OffenseDetail: crimes.OffenseDetail,
    Offense_name: crimes.Offense_name,
    OfficerID: crimes.OfficerID,
    Phone_number: crimes.Phone_number,
    StatusID: crimes.StatusID,
    Stolen_property: crimes.Stolen_property,
    Witness_statement: crimes.Witness_statement,
    crime_type: crimes.crime_type,
    id: crimes.id,
    name: crimes.name
  }
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Dessert (100g serving)</CustomTableCell>
            <CustomTableCell align="right">Calories</CustomTableCell>
            <CustomTableCell align="right">Fat (g)</CustomTableCell>
            <CustomTableCell align="right">Carbs (g)</CustomTableCell>
            <CustomTableCell align="right">Protein (g)</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">{row.calories}</CustomTableCell>
              <CustomTableCell align="right">{row.fat}</CustomTableCell>
              <CustomTableCell align="right">{row.carbs}</CustomTableCell>
              <CustomTableCell align="right">{row.protein}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);




// {
//   palette: {
//     primary: green,#4caf50
//     secondary: orange,#ff9100
//   },
// }



<Container maxWidth="sm">
<Formik
  initialValues={schema.cast()}
  validationSchema={schema}
  onSubmit={async (values) => {
    const { data } = await core.get(`/users/${id}`, {
      search: values.search
    });

    if (status === 200) {
      setSession(data);
      localStorage.setItem('token', data.jwt);
      data.userType === 'officer'
        ? navigate('/app/complaints', { replace: true })
        : navigate('/admin/account', { replace: true });
    }
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
      <TextField
        error={Boolean(touched.search && errors.search)}
        fullWidth
        helperText={touched.search && errors.search}
        label="Search By Name"
        margin="normal"
        name="search"
        onBlur={handleBlur}
        onChange={handleChange}
        type="search"
        value={values.search}
        variant="outlined"
      />
      <Box sx={{ py: 2 }}>
        <Button
          color="primary"
          disabled={isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
        Search
        </Button>
      </Box>
    </form>
  )}
</Formik>
<Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <fragment>
              <h2>All the Crimes</h2>

              <table className="table mt-5 text-center">
                <thead Class="thread-dark">
                  <tr>
                    <th scope="col">Address</th>
                    <th scope="col">Age</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Full Name Witness</th>
                    <th scope="col">Nationality</th>
                    <th scope="col">Occurrance Location</th>
                    <th scope="col">Offense Details</th>
                    <th scope="col">offense Name</th>
                    <th scope="col">Officer Id</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Stolen Propert</th>
                    <th scope="col">Witness Statment </th>
                  </tr>
                </thead>
                <tbody id={crimes.id}>{ListData}</tbody>
              </table>
            </fragment>
          </Box>
        </Container>






</Container>