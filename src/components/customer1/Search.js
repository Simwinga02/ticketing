import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <form>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Case By ID"
                variant="outlined"
              />

              <Button
                color="primary"
                halfWidth
                size="medium"
                type="submit"
                variant="contained"
              >
                Search
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CustomerListToolbar;
