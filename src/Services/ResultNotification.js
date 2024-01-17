import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ result, onClose }) => {
    return (
        <Snackbar open={!!result} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
            <Alert severity="info" onClose={onClose} sx={{ width: '100%' }}>
                {result}
            </Alert>
        </Snackbar>
    );
};

export default Notification;