import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const RestartButton = ({ onRestart }) => {
  const handleClick = () => {
    onRestart();
  };

  return (
    <Button className='w-auto inline-block m-auto' variant="text" color="primary" onClick={handleClick}>
      Restart Game
    </Button>
  );
};

RestartButton.propTypes = {
    onRestart: PropTypes.func.isRequired,
 
  };


export default RestartButton;