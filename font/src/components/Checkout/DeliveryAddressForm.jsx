import { useState } from 'react';
import { Button, Grid, TextField, Box } from '@mui/material';
import AddressCard from './AddressCard';
import "./Checkout.css"

const DeliveryAddressForm = () => {
  // State để lưu địa chỉ đã nhập
  const [savedAddresses, setSavedAddresses] = useState([
    {
      firstName: 'John',
      lastName: 'Doe',  
      streetAddress: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      mobile: '123-456-7890',
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    const data = new FormData(e.currentTarget);
    const newAddress = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      streetAddress: data.get('address'),
      city: data.get('city'),
      state: data.get('state'),
      zipCode: data.get('zip'),
      mobile: data.get('phoneNumber'),
    };
    console.log('address', newAddress);

    // Thêm địa chỉ mới vào danh sách và cập nhật state
    setSavedAddresses([...savedAddresses, newAddress]);
  };

  return (
    <div>
      <Grid container spacing={4}>
        {/* Cột hiển thị danh sách địa chỉ đã lưu */}
        <Grid item xs={12} lg={5} className="summary rounded-md shadow-md h-[55.5vh] overflow-y-scroll">


          <div className="pr-5 mt-[-2.5rem]">
            {savedAddresses.map((item, index) => (
              <AddressCard key={index} address={item} />
            ))}

            <Button
              sx={{ mt: 2, bgcolor: 'RGB(145 85 253)', '&:hover': { bgcolor: 'blue' } }}
              size="large"
              type="submit" // Thêm type="submit" để form hoạt động
              variant="contained"
            >
              Deliver Here
            </Button>


          </div>
        </Grid>

        {/* Cột chứa form nhập địa chỉ */}
        <Grid item xs={12} lg={7}>
          <Box className="border-zinc-600 rounded-s-md shadow-md p-5 formBorder ">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name" // Điều chỉnh autoComplete cho họ
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="street-address"
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="address-level2"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="address-level1"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip/Postal Code"
                    fullWidth
                    autoComplete="postal-code"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="tel"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{ mt: 2, bgcolor: 'RGB(145 85 253)', '&:hover': { bgcolor: 'blue' } }}
                    size="large"
                    type="submit" // Thêm type="submit" để form hoạt động
                    variant="contained"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;