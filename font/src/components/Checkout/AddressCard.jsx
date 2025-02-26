import { Box, Typography, Grid, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import "./Checkout.css"

const AddressCard = ({ address }) => {
  // Kiểm tra xem address có tồn tại và có dữ liệu không
  if (!address || Object.keys(address).length === 0) {
    return (
      <Box p={3}>
        <Typography variant="body1">No address information available.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} className=" rounded-2xl shadow-md info mt-10">
      <Typography variant="h5" gutterBottom>
        Address Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>First Name:</strong> {address.firstName || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Last Name:</strong> {address.lastName || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Street Address:</strong> {address.streetAddress || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>City:</strong> {address.city || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>State:</strong> {address.state || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Zip Code:</strong> {address.zipCode || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Mobile:</strong> {address.mobile || 'N/A'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
AddressCard.propTypes = {
  address: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    streetAddress: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    mobile: PropTypes.string,
  }),
};

export default AddressCard;