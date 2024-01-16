import React, { useState, useEffect } from 'react';
import { Stats, Circle } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Typography, Button, Grid, Card } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import UserCanvas from './UserCanvas';
import ComputerCanvas from './ComputerCanvas';

import BubbleChart from './BarChart';
import DonutChart from './DonutChart';
import { color } from 'd3';
import { blue } from '@mui/material/colors';
import BarChart from './BarChart';

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  // const [playerChoices, setPlayerChoices] = useState([]);
  // const [computerChoices, setComputerChoices] = useState([]);
  const [userchoiceCounts, setUserChoiceCounts] = useState({});
  const [computerchoiceCounts, setComputerChoiceCounts] = useState({});

  
  const rock = useLoader(GLTFLoader, '/models/rock.glb');
  const paper = useLoader(GLTFLoader, '/models/paper-bag.glb');
  const scissors = useLoader(GLTFLoader, '/models/scissors.glb');
  const userCanvasRef = useRef();
  const computerCanvasRef = useRef();

  
  const handleChoice = (choice) => {
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    setComputerChoice(computerChoice);
    setUserChoice(choice);
  
    // Update choices with counts
    // setPlayerChoices((prevPlayerChoices) => {
    //   // Use the functional form to ensure the latest state
    //   return [...prevPlayerChoices, { choice, count: 1 }];
    // });
  
    // setComputerChoices((prevComputerChoices) => {
    //   // Use the functional form to ensure the latest state
    //   return [...prevComputerChoices, { choice: computerChoice, count: 1 }];
    // });
  
    setUserChoiceCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      updatedCounts[choice] = (updatedCounts[choice] || 0) + 1;
      // updatedCounts[computerChoice] = (updatedCounts[computerChoice] || 0) + 1;
      return updatedCounts;
    });
    setComputerChoiceCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      // updatedCounts[choice] = (updatedCounts[choice] || 0) + 1;
      updatedCounts[computerChoice] = (updatedCounts[computerChoice] || 0) + 1;
      return updatedCounts;
    });

    if (choice === computerChoice) {
      setResult("It's a tie!");
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('You win!');
      setWins((prevWins) => prevWins + 1);
    } else {
      setResult('Computer wins!');
      setLosses((prevLosses) => prevLosses + 1);
    }
  };
  
  

 useEffect(() => {
    // Log user and computer choices
    // console.log('User Choices:', playerChoices);
    // console.log('Computer Choices:', computerChoices);
    console.log('User Choice Counts:', userchoiceCounts);
    console.log('Computer Choice Counts:', computerchoiceCounts);

  }, [ userchoiceCounts, computerchoiceCounts]);
  
  
  // Helper function to count choices
 // Helper function to count player choices
// const countPlayerChoices = (choices) => {
//   const counts = choices.reduce((acc, choice) => {
//     const key = choice.choice || choice; // Handle objects and strings
//     acc[key] = (acc[key] || 0) + 1;
//     return acc;
//   }, {});
//   return Object.entries(counts).map(([choice, count]) => ({ choice, count }));
// };

// // Helper function to count computer choices
// const countComputerChoices = (choices) => {
//   const counts = choices.reduce((acc, choice) => {
//     const key = choice.choice || choice; // Handle objects and strings
//     acc[key] = (acc[key] || 0) + 1;
//     return acc;
//   }, {});
//   return Object.entries(counts).map(([choice, count]) => ({ choice, count }));
// };

  
 

  const canvasStyle = { background: '#282c34' };
  const UiStyle = { background: '#1B1B33' , color:'white' , padding:'20px' };

  return (

    <div style={canvasStyle} class="flex flex-col">
 
 <div className="flex-1 flex flex-row m-auto justify-center  p-4">
 <div className="flex-1 flex flex-row m-auto justify-center  p-4">          {/* User's Canvas */}
          {userChoice && <UserCanvas userChoice={userChoice}  />}
        </div>

        <div className="flex-1 flex flex-row m-auto justify-center  p-4">          {/* Computer's Canvas */}
          {computerChoice && (
            <ComputerCanvas computerChoice={computerChoice} />
          )}
        </div>
      </div>

 
 <div className="flex-1 flex flex-row  p-4  m-auto">
        <Card style={UiStyle}>    
          <Grid  container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Your choice: {userChoice}
              </Typography>
              <Typography variant="body1">
                Computer's choice: {computerChoice}
              </Typography>
              <Typography variant="body1">{result}</Typography>
            </Grid>
            <Grid item xs={12}>
              {['rock', 'paper', 'scissors'].map((choice) => (
                <Button key={choice} variant="contained" onClick={() => handleChoice(choice)}>
                  {choice}
                </Button>
              ))}
            </Grid>
          </Grid>
        </Card> 

      <DonutChart wins={wins} losses={losses} />
      <BarChart userChoiceCounts={userchoiceCounts} computerChoiceCounts={computerchoiceCounts} />
      {/* <BarChart playerChoices={playerChoices} computerChoices={computerChoices} /> */}
            </div>
    </div>
  );
};

export default Game;