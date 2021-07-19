import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import * as Yup from 'yup';
import { Search as SearchIcon } from 'react-feather';
import { Formik } from 'formik';
import authAxios from 'src/utils/axios';

const SearchTicketsToolbar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { setTicket } = props;
  const schema = Yup.object({
    ref: Yup.string().required().default('')
  }).required();
  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      />
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 900 }}>
              <Formik
                validationSchema={schema}
                initialValues={schema.cast()}
                onSubmit={async (values) => {
                  const { data } = await authAxios.get(
                    `/tickets?Ref=${values.ref}`
                  );
                  setTicket(data);
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="row">
                      <TextField
                        fullWidth
                        error={Boolean(touched.ref && errors.ref)}
                        helperText={touched.ref && errors.ref}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="ref"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon fontSize="small" color="action">
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          )
                        }}
                        placeholder="Search With Reference Number"
                        variant="outlined"
                      />
                      <Box ml={3}>
                        <Button
                          color="primary"
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                        >
                          Search
                        </Button>
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default SearchTicketsToolbar;
