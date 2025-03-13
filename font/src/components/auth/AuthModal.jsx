import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
  };

const AuthModal = ({handleClose, open}) => {
  return (
    <div>
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                
                <RegisterForm />

            </Box>
        </Modal>
    </div>
  )
}
AuthModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AuthModal
