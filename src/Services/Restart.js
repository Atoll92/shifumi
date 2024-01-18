import React from 'react';
import { Button } from '@mui/material';

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

export default RestartButton;