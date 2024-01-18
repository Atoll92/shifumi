import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const RestartButton = ({ onRestart }) => {
    const handleClick = () => {
        onRestart();
    };

    return (
        <Button style={{ margin: 'auto' }} variant="outlined" color="primary" onClick={handleClick}>
            Restart Game
        </Button>
    );
};

RestartButton.propTypes = {
    onRestart: PropTypes.func.isRequired,

};


export default RestartButton;