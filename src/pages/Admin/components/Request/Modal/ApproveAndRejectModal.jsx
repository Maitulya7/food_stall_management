import React from 'react';
import { Button, Modal, Typography } from '@mui/material';

const ApproveModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="approve-modal-title"
      aria-describedby="approve-modal-description"
    >
      <div>
        <Typography id="approve-modal-title" variant="h6" component="h2">
          Are you sure you want to approve this vendor?
        </Typography>
        <div>
          <Button onClick={onConfirm} variant="contained" color="primary">
            Approve
          </Button>
          <Button onClick={onClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const RejectModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="reject-modal-title"
      aria-describedby="reject-modal-description"
    >
      <div>
        <Typography id="reject-modal-title" variant="h6" component="h2">
          Are you sure you want to reject this vendor?
        </Typography>
        <div>
          <Button onClick={onConfirm} variant="contained" color="primary">
            Reject
          </Button>
          <Button onClick={onClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { ApproveModal, RejectModal };
