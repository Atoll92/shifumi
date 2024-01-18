// GameCard.js
import React from 'react';
import { Card, Button, Grid } from '@mui/material';

const Controls = ({ UiStyle, handleChoice }) => {
  return (
    <Card style={UiStyle}>
      <Grid item xs={12} className="space-x-4" >
        {['rock', 'paper', 'scissors'].map((choice) => (
          <Button style={{ fontSize: '63px' }} key={choice} variant="outlined" onClick={() => handleChoice(choice)}>
            {choice === 'rock' ? '✊' : choice === 'paper' ? '✋' : '✌️'}
          </Button>
        ))}
      </Grid>
    </Card>
  );
};

export default Controls;
