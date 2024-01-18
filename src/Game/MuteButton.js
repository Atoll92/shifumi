import React from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PropTypes from 'prop-types';

const MuteButton = ({ isMuted, onToggleMute }) => {
    return (
        <IconButton style={{ margin: 'auto' }} className="m-auto inline-flex" color="inherit" onClick={onToggleMute}>
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
    );
};

MuteButton.propTypes = {
    isMuted: PropTypes.bool.isRequired,
    onToggleMute: PropTypes.func.isRequired,
};

export default MuteButton;
