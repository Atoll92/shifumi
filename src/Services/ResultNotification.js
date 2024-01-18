import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const Notification = ({ result, onClose }) => {
  const isSurvivorLevelI = result === 'survivor level I';
  const isSurvivorLevelII = result === 'survivor level II';

  return (
    <Snackbar open={!!result} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
      <Alert severity={isSurvivorLevelI  ? 'success' : 'info'} onClose={onClose} sx={{ width: '100%' }}>
        {/* {/* {isSurvivorLevelI ? '2 consecutive wins!' : result} */}
        {isSurvivorLevelII ? '3 consecutive wins!' : result}
      </Alert>
    </Snackbar>
  );
};
Notification.propTypes = {
    result: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
 
  };

export default Notification;