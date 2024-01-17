import React, { useState, useEffect } from 'react';
import { Stats, Circle, Loader } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Typography, Button, Grid, Card, CircularProgress } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import Notification from './ResultNotification';
import DonutChart from './DonutChart';

import BarChart from './BarChart';
import { Suspense } from 'react';
import GameScene from './GameScene';

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [isUserLosing, setIsUserLosing] = useState(false);
  const [isComputerLosing, setIsComputerLosing] = useState(false);
  // const [playerChoices, setPlayerChoices] = useState([]);
  // const [computerChoices, setComputerChoices] = useState([]);
  const [userchoiceCounts, setUserChoiceCounts] = useState({});
  const [computerchoiceCounts, setComputerChoiceCounts] = useState({});



  
  const handleChoice = (choice) => {
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    setComputerChoice(computerChoice);
    setUserChoice(choice);
  

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
    // Check the result and set losing states accordingly
    if (result === 'You win!') {
        setIsComputerLosing(true);
    } else if (result === 'Computer wins!') {
        setIsUserLosing(true);
    } else {
        setIsUserLosing(false);
        setIsComputerLosing(false);
    }
}, [result]);
  

 useEffect(() => {
    // Log user and computer choices
    // console.log('User Choices:', playerChoices);
    // console.log('Computer Choices:', computerChoices);
    console.log('User Choice Counts:', userchoiceCounts);
    console.log('Computer Choice Counts:', computerchoiceCounts);

  }, [ userchoiceCounts, computerchoiceCounts]);
  
 

  const canvasStyle = { background: '#282c34' };
  const UiStyle = { background: '#1B1B33' , color:'white' , padding:'20px' };

  return (
<div className='flex flex-row'>
    <div style={canvasStyle} class="flex flex-col w-4/5">
 
 <div className="flex-1 flex flex-row justify-center bg-slate-400 h-500  p-4">
 
 <Suspense fallback={<Loader />}>{userChoice && computerChoice && ( <>
                <GameScene userChoice={userChoice} computerChoice={computerChoice} isUserLosing={isUserLosing} isComputerLosing={isComputerLosing} />
                <Notification result={result}  />
              </> ) }
              </Suspense>

        
      </div>

 
 {/* <div className="flex-1 flex flex-row  p-4  m-auto"> */}
        <Card style={UiStyle}>    
          
            <Grid item xs={12} spacing={2}>
              {['rock', 'paper', 'scissors'].map((choice) => (
                <Button key={choice} variant="outlined" onClick={() => handleChoice(choice)}>
                  {choice}
                </Button>
              ))}
            </Grid>
        
        </Card> 
             
     
     
      {/* <BarChart playerChoices={playerChoices} computerChoices={computerChoices} /> */}
            {/* </div> */}
    </div>
    <div className='w-1/5 pt-6'>
            <DonutChart wins={wins} losses={losses} />
      <BarChart userChoiceCounts={userchoiceCounts} computerChoiceCounts={computerchoiceCounts} />
      </div>
    </div>
  );
};

export default Game;