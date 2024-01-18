import React, { useState } from 'react';
import { Card, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const Controls = ({ UiStyle, handleChoice }) => {
    const [selectedChoice, setSelectedChoice] = useState(null);


    const handleClick = (choice) => {
        setSelectedChoice(choice);
        handleChoice(choice);
    };

    return (
        <Card style={UiStyle}>
            <Grid item xs={12} className="space-x-4">
                {['rock', 'paper', 'scissors'].map((choice) => (
                    <Button
                        key={choice}
                        style={{ fontSize: '63px' }}
                        variant={selectedChoice === choice ? 'contained' : 'outlined'}
                        onClick={() => handleClick(choice)}
                    >
                        {choice === 'rock' ? '✊' : choice === 'paper' ? '✋' : '✌️'}
                    </Button>
                ))}
            </Grid>
        </Card>
    );
};

Controls.propTypes = {
    UiStyle: PropTypes.object.isRequired,
    handleChoice: PropTypes.func.isRequired,
    onToggleMute: PropTypes.func.isRequired,
};

export default Controls;
