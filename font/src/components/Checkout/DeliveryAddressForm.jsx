import { useEffect, useState } from 'react';
import { Button, Grid, TextField, Box, RadioGroup, Radio, FormControlLabel} from '@mui/material';
import AddressCard from './AddressCard';
import "./Checkout.css"
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, createOrder, getAddress } from '../../State/Order/Action';

const DeliveryAddressForm = () => {
  const {address} = useSelector(store => store.order)
  const dispatch = useDispatch();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    dispatch(getAddress()).catch(err => {
      console.error("Failed to fetch addresses:", err);
    });
  }, [dispatch])

  useEffect(() => {
    if (address?.data?.length > 0 && !selectedAddressId) {
      const firstAddressId = parseInt(address.data[0].id);
      console.log("Setting default address ID:", firstAddressId);
      setSelectedAddressId(firstAddressId);
    }
  }, [address, selectedAddressId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    
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
    
    try {
      await dispatch(addAddress(newAddress));
      // Reload địa chỉ sau khi thêm thành công
      dispatch(getAddress());
    } catch (error) {
      console.error("Error adding address:", error);
      setErrorMessage("Không thể thêm địa chỉ. Vui lòng thử lại.");
    }
  };

  const handleAddressSelection = (event) => {
    const selectedId = parseInt(event.target.value);
    console.log("Selected address ID:", selectedId);
    console.log("Selected address:", address.data?.find(a => a.id === selectedId));
    setSelectedAddressId(selectedId);
  };

  const handleDeliverHere = async () => {
    if (!selectedAddressId) {
      setErrorMessage('Vui lòng chọn địa chỉ giao hàng');
      return;
    }

    try {
      setIsCreatingOrder(true);
      setErrorMessage(null);
      console.log('Creating order with address ID:', selectedAddressId);
      const selectedAddress = address.data?.find(a => a.id === selectedAddressId);
      console.log('Selected address details for order:', selectedAddress);
      
      await dispatch(createOrder(selectedAddressId));
    } catch (error) {
      console.error("Error creating order:", error);
      setErrorMessage("Không thể tạo đơn hàng. Vui lòng thử lại.");
    } finally {
      setIsCreatingOrder(false);
    }
  };

  return (
    <div>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      
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
                    value={Number(item.id)}
                    control={<Radio />}
                    label={
                      <AddressCard 
                        address={item} 
                        isSelected={selectedAddressId === Number(item.id)}
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
              disabled={!selectedAddressId || isCreatingOrder}
            >
              {isCreatingOrder ? "Đang xử lý..." : "Giao hàng đến địa chỉ này"}
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