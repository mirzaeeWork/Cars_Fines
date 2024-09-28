// DeleteConfirmationModal.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #6738be',
  boxShadow: -8,
  p: 4,
};

const DeleteConfirmationModal = ({ open, handleClose, confirmDelete,message }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'right' }}>
          {message}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" sx={{ fontSize: '18px',border:'1px solid #6738be',color:'#6738be'}} onClick={handleClose}>
            خیر
          </Button>
          <Button variant="contained" sx={{ fontSize: '18px', backgroundColor: '#6738be',}}  onClick={confirmDelete}>
            بله
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
