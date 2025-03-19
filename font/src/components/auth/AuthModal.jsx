import { Modal, Box } from '@mui/material';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  maxWidth: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
  borderRadius: '8px',
  outline: 'none'
};

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const isSignUp = location.pathname === '/sign-up';

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
    >
      <Box sx={style}>
        {isSignUp ? <RegisterForm handleClose={handleClose} /> : <LoginForm handleClose={handleClose} />}
      </Box>
    </Modal>
  );
}

AuthModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};