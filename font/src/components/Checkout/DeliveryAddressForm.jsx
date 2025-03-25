import { useEffect, useState } from 'react';
import { Button, Grid, TextField, Box, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import AddressCard from './AddressCard';
import "./Checkout.css"
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, getAddress } from '../../State/Order/Action';
import { useNavigate } from 'react-router-dom';

const DeliveryAddressForm = () => {
  const {address} = useSelector(store => store.order)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    dispatch(getAddress())
  }, [dispatch])


  const handleSubmit = (e) => {
    e.preventDefault();
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
    console.log('Submitting new address:', newAddress);
    dispatch(addAddress(newAddress));
  };

  const handleAddressSelection = (event) => {
    const selectedId = event.target.value;
    console.log("Current addresses:", address.data?.find(a => a.id==selectedId));
    console.log('Selected address ID:', selectedId);
    setSelectedAddressId(selectedId);
  };

  const handleDeliverHere = () => {
    if (selectedAddressId) {
      const selectedAddress = address?.data?.find(addr => addr.id == selectedAddressId);
      if (selectedAddress) {
        console.log('Proceeding with address:', selectedAddress);
        navigate('/checkout?step=3');
      }
    } else {
      alert('Vui lòng chọn địa chỉ giao hàng');
    }
  };

  return (
    <div>
      <Grid container spacing={4}>
        {/* Saved Addresses Column */}
        <Grid item xs={12} lg={5} className="summary rounded-md shadow-md h-[55.5vh] overflow-y-scroll">
          <div className="lg:px-16 relative">
            {address?.data && address.data.length > 0 ? (
              <RadioGroup 
                value={selectedAddressId || ''}
                onChange={handleAddressSelection}
              >
                {address.data.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    value={item.id}
                    control={<Radio />}
                    label={
                      <AddressCard 
                        address={item} 
                        isSelected={selectedAddressId === item.id}
                      />
                    }
                  />
                ))}
              </RadioGroup>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Chưa có địa chỉ nào được lưu</p>
              </div>
            )}

            <Button
              onClick={handleDeliverHere}
              sx={{ 
                mt: 2, 
                bgcolor: 'RGB(145 85 253)', 
                '&:hover': { bgcolor: 'RGB(124 58 237)' },
                width: '100%'
              }}
              size="large"
              variant="contained"
              // disabled={!selectedAddressId}
            >
              Delivery Here
            </Button>
          </div>
        </Grid>

        {/* Add New Address Column */}
        <Grid item xs={12} lg={7}>
          <Box className="border rounded-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="Họ"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Tên"
                    fullWidth
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Địa chỉ"
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
                    label="Thành phố"
                    fullWidth
                    autoComplete="address-level2"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="Tỉnh/Thành phố"
                    fullWidth
                    autoComplete="address-level1"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Mã bưu điện"
                    fullWidth
                    autoComplete="postal-code"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Số điện thoại"
                    fullWidth
                    autoComplete="tel"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    sx={{ 
                      mt: 2, 
                      bgcolor: 'RGB(145 85 253)', 
                      '&:hover': { bgcolor: 'RGB(124 58 237)' },
                      width: '100%'
                    }}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Thêm địa chỉ mới
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